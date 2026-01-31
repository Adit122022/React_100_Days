import { redis } from "@/lib/redis";
import { Elysia } from "elysia";
import { nanoid } from "nanoid";
import { authMiddleare } from "./auth";
import z, { date } from "zod";
import { Message, realtime } from "@/lib/realtime";

const ROOM_TTL_SECONDS = 60 * 10;

export const rooms = new Elysia({ prefix: "/room" })
  .post("/create", async () => {
    //  creating random id
    const roomId = nanoid();
    // redis stores hash set or meta data of room creation
    await redis.hset(`meta:${roomId}`, {
      connected: [],
      createdAt: Date.now(),
    });

    //     auto delete room after a specific time

    await redis.expire(`meta:${roomId}`, ROOM_TTL_SECONDS);

    return { roomId };
  })
  .use(authMiddleare)
  .get(
    "/",
    async ({ auth }) => {
      const ttl = await redis.ttl(`meta:${auth.roomId}`);
      return { ttl: ttl > 0 ? ttl : 0 };
    },
    {
      query: z.object({
        roomId: z.string(),
      }),
    },
  )
  .delete(
    "/",
    async ({ auth }) => {
      await realtime
        .channel(auth.roomId)
        .emit("chat.destroy", { isDestroyed: true });
      await Promise.all([
        redis.del(auth.roomId),
        redis.del(`meta:${auth.roomId}`),
        redis.del(`message:${auth.roomId}`),
      ]);
      return { success: true };
    },
    { query: z.object({ roomId: z.string() }) },
  );

const messages = new Elysia({ prefix: "/messages" })
  .use(authMiddleare)
  .post(
    "/",
    async ({ body, auth }) => {
      const { sender, text } = body;
      const { roomId, token } = auth;
      const roomExits = await redis.exists(`meta:${roomId}`);
      if (!roomExits) {
        throw new Error("Room does not exists !");
      }

      const messages: Message = {
        id: nanoid(),
        sender,
        text,
        roomId,
        timestamp: Date.now(),
      };
      //  add message to history
      await redis.rpush(`message:${roomId}`, { ...messages, token });
      //   realtime
      await realtime.channel(roomId).emit("chat.message", messages);
      //
      const remaining = await redis.ttl(`meta:${roomId}`);
      await redis.expire(`message:${roomId}`, remaining);
      await redis.expire(`history:${roomId}`, remaining);
      await redis.expire(roomId, remaining);
    },
    {
      query: z.object({ roomId: z.string() }),
      body: z.object({
        sender: z.string().max(100),
        text: z.string().max(1000),
      }),
    },
  )
  .get(
    "/",
    async ({ auth }) => {
      const messages = await redis.lrange<Message>(
        `message:${auth.roomId}`,
        0,
        -1,
      );
      return {
        messages: messages.map((m) => ({
          ...m,
          token: m.token === auth.token ? auth.token : undefined,
        })),
      };
    },
    {
      query: z.object({
        roomId: z.string(),
      }),
    },
  );

export const app = new Elysia({ prefix: "/api" }).use(rooms).use(messages);

export const GET = app.fetch;
export const POST = app.fetch;
export const DELETE = app.fetch;
