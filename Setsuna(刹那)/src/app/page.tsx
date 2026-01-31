"use client"
import { useUsername } from "@/hooks/use-username";
import { client } from "@/lib/client"
import { useMutation } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import React, { Suspense, useState } from 'react'


const Page = () => {
  return <Suspense>
    <Lobby />
  </Suspense>
}
export default Page
function Lobby() {



  const router = useRouter();

  const [joinRoomId, setJoinRoomId] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState("");

  const searchParams = useSearchParams()

  const wasDestroyed = searchParams.get("destroyed") === "true"
  const error = searchParams.get("error")
  const { username } = useUsername()

  const { mutate: createRoom, isPending } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post()
      if (res.status === 200) {
        router.push(`/room/${res.data?.roomId}`)
      }
    }
  })

  const joinRoom = async () => {
    if (!joinRoomId) return;
    setIsJoining(true);
    setJoinError("");
    try {
      const res = await client.room.get({ query: { roomId: joinRoomId } });
      if (res.data && res.data.ttl > 0) {
        router.push(`/room/${joinRoomId}`);
      } else {
        setJoinError("Room not found or expired");
      }
    } catch (error) {
      setJoinError("Failed to join room");
    } finally {
      setIsJoining(false);
    }
  };
  return <main className="flex min-h-screen flex-col items-center justify-center p-4">
    <div className="w-full max-w-md space-y-8">

      {wasDestroyed &&
        <div className='bg-red-900/50 border border-red-900 p-4 text-center sm:p-4'>
          <p className="text-red-500 text-sm font-bold">Room Destroyed</p>
          <p className="text-zinc-500 text-xs mt-1"> All messages were permanently deleted.</p>
        </div>}
      {error === "room-not-found" &&
        <div className='bg-red-900/50 border border-red-900 p-4 text-center sm:p-4'>
          <p className="text-red-500 text-sm font-bold">Room NOT FOUND</p>
          <p className="text-zinc-500 text-xs mt-1"> This room may have been deleted or expired.</p>
        </div>}
      {error === "room-full" &&
        <div className='bg-red-900/50 border border-red-900 p-4 text-center sm:p-4'>
          <p className="text-red-500 text-sm font-bold">Room FULL</p>
          <p className="text-zinc-500 text-xs mt-1"> This room is at maximum capacity.</p>
        </div>}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-green-500 "> {">"}private_chat</h1>
        <p className="text-zinc-500 text-sm">
          A private, self-destructing chat room.
        </p>
      </div>

      <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="flex items-center text-zinc-500">
              Your Identity
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-zinc-950 border border-zinc-800 text-sm text-zinc-400 font-mono">
                {username}
              </div>
            </div>
          </div>
          <button disabled={isPending} onClick={() => createRoom()} className="w-full rounded-md bg-zinc-800 px-4 py-2 text-sm text-zinc-400 font-bold hover:bg-zinc-700 cursor-pointer disabled:bg-zinc-700 disabled:text-zinc-500 transition-colors">
            {isPending ? "Creating..." : "Create Chat"}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-zinc-500">Or join existing</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-500">
              Enter Room ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={joinRoomId}
                onChange={(e) => setJoinRoomId(e.target.value)}
                placeholder="Paste room ID here..."
                className="flex-1 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-green-500/50 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all"
                onKeyDown={(e) => e.key === "Enter" && joinRoom()}
              />
              <button
                onClick={joinRoom}
                disabled={!joinRoomId || isJoining}
                className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-bold text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isJoining ? "..." : "JOIN"}
              </button>
            </div>
            {joinError && (
              <p className="text-xs text-red-500 animate-pulse">{joinError}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </main>

}

