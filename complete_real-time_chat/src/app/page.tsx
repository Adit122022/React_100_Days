"use client"
import { client } from "@/lib/client"
import { useMutation } from "@tanstack/react-query"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"

const ANIMALS = ["Cat", "Dog", "Mouse", "Rabbit", "Turtle", "Hamster", "Parrot", "Penguin", "Panda", "Pig"]

const STORAGE_KEY = "cat_username"

const generatedUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]
  return `anonymous-${word}-${nanoid(5)}`
}

export default function Home() {


  const [username, setUsername] = useState("")

  useEffect(() => {
    const main = async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUsername(stored);
        return
      }
      const generated = generatedUsername()
      localStorage.setItem(STORAGE_KEY, generated)
      setUsername(generated)
    }
    main()
  }, [])

  const { mutate: createRoom } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post()
    }
  })
  return <main className="flex min-h-screen flex-col items-center justify-center p-4">
    <div className="w-full max-w-md space-y-8">
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
          <button onClick={() => createRoom()} className="w-full rounded-md bg-zinc-800 px-4 py-2 text-sm text-zinc-400 font-bold hover:bg-zinc-700 cursor-pointer disabled:bg-zinc-700 disabled:text-zinc-500">
            Create Chat
          </button>
        </div>
      </div>
    </div>
  </main>

}
