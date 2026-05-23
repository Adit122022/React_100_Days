"use client"
import { useUsername } from '@/hooks/use-username'
import { client } from '@/lib/client'
import { useRealtime } from '@/lib/realtime-client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useParams, useRouter } from 'next/navigation'
import  { useEffect, useRef, useState } from 'react'

const Page = () => {
    const [copyStatus, setCopyStatus] = useState("COPY")
    const [input, setInput] = useState("")
    const inputRef = useRef<HTMLInputElement>(null);
    const [timeRemaining, setTimeRemainimg] = useState<number | null>(null)
    const params = useParams()
    const roomId = params.roomId as string;

    const router = useRouter()


    const { username } = useUsername()
    // Send Message
    const { mutate: sendMessage, isPending } = useMutation({
        mutationFn: async ({ text }: { text: string }) => {
            await client.messages.post({ sender: username, text }, { query: { roomId } })
            setInput("")
        }
    })

    //  get messages 
    const { data: messages, refetch } = useQuery({
        queryKey: ["messages", roomId],
        queryFn: async () => {
            const response = await client.messages.get({ query: { roomId } })
            return response.data
        }
    })

    //  for realtime reflaction of chat
    useRealtime({
        channels: [roomId],
        events: ["chat.message", "chat.destroy"],
        onData: ({ event }) => {
            if (event === "chat.message") {
                refetch()
            }
            if (event === "chat.destroy") {
                router.push("/?destroyed=true")
            }
        }
    })
    const { mutate: destroyRoom, isPending: isDeletePending } = useMutation({
        mutationFn: async () => {
            await client.room.delete(undefined, { query: { roomId } })
        },
        onSuccess: () => {
            router.push("/?destroyed=true")
        }
    })
    // Copy the room Id
    const copyLink = () => {
        navigator.clipboard.writeText(roomId)
        setCopyStatus("COPIED!")
        setTimeout(() => { setCopyStatus("COPY") }, 2000)
    }

    const { data: ttlData } = useQuery({
        queryKey: ["ttl", roomId],
        queryFn: async () => {
            const response = await client.room.get({ query: { roomId } })
            return response.data
        }
    })
    useEffect(() => {
        if (ttlData?.ttl !== undefined) {
            setTimeRemainimg(ttlData.ttl)
        }
    }, [ttlData])

    useEffect(() => {
        if (timeRemaining === null || timeRemaining <= 0) return
        if (timeRemaining <= 0) {
            router.push("/?destroyed=true")
        }
        const interval = setInterval(() => {
            setTimeRemainimg((prev) => (prev !== null && prev > 0 ? prev - 1 : 0))
        }, 1000)
        return () => clearInterval(interval)
    }, [timeRemaining, router])

    const formateTimeRemaining = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }
    return (
        <main className='flex flex-col h-dvh max-h-dvh overflow-hidden'>


            <header className='border-b border-zinc-800 p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-0 bg-zinc-900/50'>
                <div className="flex items-center justify-between md:justify-start gap-4">
                    <div className="flex flex-col">
                        <span className='text-[10px] sm:text-xs text-zinc-500 uppercase'> Room Id</span>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-green-500 text-sm sm:text-base">
                                {roomId}
                            </span>
                            <button onClick={() => copyLink()} className='text-[10px] bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded text-zinc-400 hover:text-zinc-200 transition-colors'>
                                {copyStatus}
                            </button>
                        </div>
                    </div>

                    <div className="h-8 sm:h-10 w-px bg-zinc-500" />

                    <div className="flex flex-col items-end md:items-start">
                        <span className="text-[10px] sm:text-xs text-zinc-500 uppercase">Self-Destruct</span>
                        <span className={`text-sm sm:text-base font-bold flex items-center gap-2 ${timeRemaining !== null && timeRemaining < 60 ? "text-rose-500" : "text-amber-500"}`}>
                            {timeRemaining !== null ? formateTimeRemaining(timeRemaining) : "--:--"}
                        </span>
                    </div>
                </div>

                <button onClick={() => destroyRoom()} disabled={isDeletePending} className='text-xs bg-zinc-800 hover:bg-red-600 px-3 py-2 sm:py-1.5 rounded text-zinc-400 hover:text-white font-bold transition-all group flex items-center justify-center gap-2 disabled:opacity-50 uppercase w-full md:w-auto mt-0'>
                    <span className='group-hover:animate-pulse'>💣</span>
                    {isDeletePending ? "Destroying ..." : "Destroy now"}
                </button>
            </header>
            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 scrollbar-thin">
                {messages?.messages.length === 0 && (<div className='flex items-center justify-center h-full'> <p className='text-zinc-600 text-sm font-mono text-center px-4'>No messages yet , start the conversation</p></div>)}

                {messages?.messages.map((message, index) => (
                    <div key={index} className={`flex flex-col ${message.sender === username ? "items-end justify-end" : "items-start justify-start"}`}>
                        <div className="flex flex-col max-w-[85%] sm:max-w-[80%] group">
                            <div className="flex items-baseline gap-2 sm:gap-3 mb-1">
                                <span className={`text-xs  ${message.sender === username ? "text-green-500" : "text-blue-500"} font-bold`}>{message.sender === username ? "You" : message.sender}</span>
                                <span className="text-[10px] sm:text-xs text-zinc-500">{format(message.timestamp, "HH:mm:ss")}</span>
                            </div>
                            <p className="text-sm text-zinc-300 leading-relaxed break-all font-semibold">{message.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='p-3 sm:p-4 border-t border-zinc-800 bg-zinc-900/30'>
                <div className="flex gap-2 sm:gap-4">
                    <div className="flex-1 relative group">
                        <span className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-green-500 animate-pulse text-xs sm:text-sm'>
                            {">"}
                        </span>
                        <input ref={inputRef} onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={(e) => {
                            if (e.key === "Enter" && input.trim()) {
                                sendMessage({ text: input })
                                inputRef.current?.focus()

                            }
                        }}
                            placeholder='Type Message ...'
                            autoFocus className='w-full bg-black border border-zinc-800 focus:border-zinc-700 focus:outline-none transition-colors text-zinc-100 placeholder:text-zinc-700 py-2.5 sm:py-3 pl-6 sm:pl-8 pr-4 text-base sm:text-sm rounded-md' type="text" name="" id="" />
                    </div>

                    <button onClick={() => {
                        if (input.trim()) {
                            sendMessage({ text: input })
                            inputRef.current?.focus()

                        }
                    }} disabled={!input.trim() || isPending} className='bg-zinc-800 text-zinc-400 px-4 sm:px-6 text-xs sm:text-sm font-bold hover:text-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-md'>SEND</button>
                </div>
            </div>
        </main>
    )
}

export default Page
