"use client"
import React, { useEffect, useState } from 'react'
import MacWindow from '../MacWindow'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Github as GithubIcon, MapPin, Link as LinkIcon, Users } from "lucide-react"

const Github = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const datafetcher = async () => {
            const res = await fetch("https://api.github.com/users/adit122022")
            const data = await res.json()
            setUser(data)
            console.log(data)
        }
        datafetcher()
    }, []);

    if (!user) return null;

    return (
        <MacWindow>
            <div className="flex h-full bg-[#1e1e1e] text-white overflow-x-hidden overflow-y-auto">
                {/* Left Sidebar (Profile) */}
                <div className="w-1/3 border-r border-white/10 p-6 flex flex-col items-center gap-4">
                    <Avatar className="w-24 h-24 border-2 border-white/20">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>AS</AvatarFallback>
                    </Avatar>

                    <div className="text-center">
                        <h2 className="text-lg font-bold">{user.name || "Aditya Sharma"}</h2>
                        <p className="text-sm text-white/50">@{user.login}</p>
                    </div>

                    <p className="text-xs text-center text-white/80 px-2 leading-relaxed">
                        {user.bio || "Full-Stack Developer | MERN Enthusiast"}
                    </p>

                    <div className="w-full space-y-2 mt-4 text-[11px] text-white/60">
                        <div className="flex items-center gap-2">
                            <MapPin size={12} /> {user.location || "Rajasthan, India"}
                        </div>
                        <div className="flex items-center gap-2">
                            <LinkIcon size={12} /> <a href={user.blog} className="hover:text-blue-400">Portfolio</a>
                        </div>
                    </div>
                </div>

                {/* Right Content (Stats) */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="flex items-center gap-2 text-white/50 mb-1">
                                <Users size={14} /> <span className="text-[10px] uppercase font-bold tracking-wider">Followers</span>
                            </div>
                            <p className="text-2xl font-bold">{user.followers}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="flex items-center gap-2 text-white/50 mb-1">
                                <GithubIcon size={14} /> <span className="text-[10px] uppercase font-bold tracking-wider">Public Repos</span>
                            </div>
                            <p className="text-2xl font-bold">{user.public_repos}</p>
                        </div>
                    </div>

                    {/* Quick Tags */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-none">MERN Stack</Badge>
                            <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-none">Next.js</Badge>
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-none">TypeScript</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </MacWindow>
    )
}

export default Github; // Yeh line bahut zaroori hai error hatane ke liye!