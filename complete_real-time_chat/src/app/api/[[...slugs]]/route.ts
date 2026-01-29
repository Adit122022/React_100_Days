import { redis } from '@/lib/redis';
import { Elysia } from 'elysia'
import { nanoid } from 'nanoid'

const  ROOM_TTL_SECONDS = 60 * 10

export const rooms =new Elysia({prefix:"/room"})
.post("/create", async()=>{
    //  creating random id
   const roomId = nanoid();
    // redis stores hash set or meta data of room creation
   await redis.hset(`meta:${roomId}`,{
    connected:[],
    createdAt:Date.now(),
   })

//     auto delete room after a specific time

 await redis.expire(`meta:${roomId}`,ROOM_TTL_SECONDS)

 return {roomId}
})

export const app = new Elysia({ prefix: '/api'})
.use(rooms)

export const GET = app.fetch 
export const POST = app.fetch 
