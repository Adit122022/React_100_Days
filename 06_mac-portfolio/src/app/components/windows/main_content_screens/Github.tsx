"use client"
import React, { useEffect, useState } from 'react'
import MacWindow from '../MacWindow'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Github as GithubIcon, MapPin, ExternalLink, Code2 } from "lucide-react"
import { projects, userDetails } from '@/lib/constatns'



const Github = () => {
    const [user, setUser] = useState<any>(null);



    useEffect(() => {
        const datafetcher = async () => {
            try {
                const res = await fetch(`https://api.github.com/users/${userDetails.githubUsername}`)
                const data = await res.json()
                setUser(data)
                console.log(data)
            } catch (err) {
                console.error("Error fetching data:", err)
            }
        }
        datafetcher()
    }, []);

    if (!user) return null;

    return (
        <MacWindow x={300} y={100} width="50vw" height="60vh">
            <div className="flex h-full bg-[#1e1e1e] text-white overflow-hidden">
                {/* Left Sidebar */}
                <aside className="w-1/3 border-r border-white/10 p-6 flex flex-col items-center gap-4 bg-black/20">
                    <Avatar className="w-24 h-24 border-2 border-white/20">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>AS</AvatarFallback>
                    </Avatar>

                    <div className="text-center">
                        <h2 className="text-lg font-bold">{user.name || "Aditya Sharma"}</h2>
                        <a href={`${user.html_url}`} target="_blank" className="text-sm text-white/50 hover:text-white"><p className="text-sm text-white/50">@{user.login}</p></a>
                    </div>

                    <p className="text-xs text-center text-white/80 leading-relaxed italic">
                        "{user.bio || "Full-Stack Developer | MERN Enthusiast"}"
                    </p>

                    <div className="w-full flex items-center gap-5  mt-4 text-[11px] text-white/60">
                        <div className="flex items-center gap-2">
                            <MapPin size={15} className="text-red-400" /> {user.location || "Kota, Rajasthan"}
                        </div>
                        <div className="flex items-center gap-2">
                            <GithubIcon size={15} className="text-gray-200" />
                            <a href={user.blog || "#"} target="_blank" className="hover:underline">Github</a>
                        </div>
                    </div>

                </aside>

                {/* Right Content */}
                <div className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar">
                    {/* Stats Header */}
                    <div className="flex items-center gap-2">
                        <GithubIcon size={14} />
                        <Badge variant="outline" className='text-white/50 '>
                            <span className="text-sm uppercase font-bold tracking-wider">Followers : </span>
                            <span className='text-sm text-blue-200'>  {user.followers}</span>
                        </Badge>
                        <Badge variant="outline" className='text-white/50'>
                            <span className="text-sm uppercase font-bold tracking-wider">Repos : </span>
                            <span className='text-sm text-blue-200'>{user.public_repos}</span>
                        </Badge>
                    </div>

                    {/* Projects Section */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                            <Code2 size={14} /> Featured Projects
                        </h3>

                        <div className="grid gap-4">
                            {projects.map((project, index) => (
                                <div key={index} className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/10 group hover:border-blue-500/50 transition-all">
                                    <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-bold text-blue-400">{project.title}</h4>
                                            <div className="flex gap-3 text-white/40">
                                                <a href={project.github} target="_blank" className="hover:text-white"><GithubIcon size={14} /></a>
                                                <a href={project.live} target="_blank" className="hover:text-white"><ExternalLink size={14} /></a>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-white/60 line-clamp-2">{project.description}</p>
                                        <div className="flex gap-1 pt-1">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded text-white/40 border border-white/5">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MacWindow>
    )
}

export default Github;