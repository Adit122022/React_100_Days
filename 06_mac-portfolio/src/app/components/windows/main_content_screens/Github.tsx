"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import MacWindow from '../MacWindow'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Github as GithubIcon, MapPin, ExternalLink, Layers, Users, FolderGit2 } from "lucide-react"
import { projects, userDetails, WindowsState } from '@/lib/constatns'



interface GithubProps {
    windowName: keyof WindowsState;
    setWindowsState: Dispatch<SetStateAction<WindowsState>>;
}

const Github = ({ windowName, setWindowsState }: GithubProps) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const datafetcher = async () => {
            try {
                const res = await fetch(`https://api.github.com/users/${userDetails.githubUsername}`)
                const data = await res.json()
                setUser(data)
            } catch (err) {
                console.error("Error fetching data:", err)
            } finally {
                setLoading(false)
            }
        }
        datafetcher()
    }, []);

    if (loading) return null;
    if (!user) return null;

    return (
        <MacWindow
            x={300}
            y={100}
            width="60vw"
            height="65vh"
            onClose={() => setWindowsState((prev) => ({ ...prev, [windowName]: false }))}
        >
            <div className="flex flex-col md:flex-row h-full w-full bg-[#09090b] text-zinc-100 overflow-hidden  scrollbar-none overflow-y-scroll font-sans selection:bg-indigo-500/30">

                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* --- Left Column: Minimalist Sidebar --- */}
                <aside className="w-full md:w-[280px] relative z-10 flex flex-col border-b md:border-b-0 md:border-r border-white/5 bg-black/20 backdrop-blur-xl shrink-0">

                    <div className="p-6 flex flex-col h-full">
                        {/* 1. Clean Avatar (No Shadow/Glow) */}
                        <div className="flex flex-col items-center">
                            <Avatar className="w-24 h-24 border-2 border-white/10 shadow-sm">
                                <AvatarImage src={user.avatar_url} className="object-cover" />
                                <AvatarFallback className="bg-zinc-800 text-zinc-400">AS</AvatarFallback>
                            </Avatar>

                            {/* Name & Handle */}
                            <div className="mt-4 text-center">
                                <h2 className="text-lg font-bold tracking-tight text-white">{user.name || "Aditya Sharma"}</h2>
                                <a href={user.html_url} target="_blank" className="text-xs font-medium text-zinc-500 hover:text-indigo-400 transition-colors">
                                    @{user.login}
                                </a>
                            </div>

                            {/* 2. Compact Stats Row */}
                            <div className="flex items-center gap-3 mt-4 w-full justify-center">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full border border-white/5 text-[10px] text-zinc-300 hover:bg-white/10 transition-colors cursor-default">
                                    <Users size={12} className="text-indigo-400" />
                                    <span className="font-semibold">{user.followers}</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full border border-white/5 text-[10px] text-zinc-300 hover:bg-white/10 transition-colors cursor-default">
                                    <FolderGit2 size={12} className="text-emerald-400" />
                                    <span className="font-semibold">{user.public_repos}</span>
                                </div>
                            </div>

                            {/* 3. Bio Section */}
                            <div className="mt-6 w-full pt-6 border-t border-dashed border-white/10">
                                <p className="text-sm text-center text-zinc-300 leading-relaxed">
                                    "{user.bio || "Full-Stack Developer | MERN Enthusiast"}"
                                </p>
                            </div>
                        </div>

                        {/* Footer Info - Hide on mobile if space helps, or keep. Flex-col h-full puts it at bottom. */}
                        <div className="mt-auto space-y-3 hidden md:block">
                            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
                                <MapPin size={12} className="text-zinc-600" />
                                {user.location || "India"}
                            </div>
                            <a href={user.html_url} target="_blank" className="flex items-center justify-center gap-2 w-full py-2 bg-zinc-100 text-black text-xs font-bold rounded-md hover:bg-white transition-colors">
                                <GithubIcon size={14} /> GitHub Profile
                            </a>
                        </div>
                        {/* Mobile Footer Alternative - maybe simpler? Or just let it scroll?
                             The sidebar is 'h-full' in 'flex flex-col', so on mobile it might take up too much height if we don't limit it.
                             Let's keep it simple for now as requested.
                          */}
                    </div>
                </aside>

                {/* --- Right Column: Projects --- */}
                <div className="flex-1 relative z-10 flex flex-col min-w-0 scrollbar-none overflow-y-scroll bg-gradient-to-br from-transparent to-white/[0.02]">
                    <div className="p-5 border-b border-white/5 flex items-center  justify-between bg-black/20 backdrop-blur-md sticky top-0 z-20">
                        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                            <Layers size={14} className="text-indigo-500" />
                            Projects
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            {projects.length} Total
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 scrollbar-none">
                        <div className="grid grid-cols-1 gap-3">
                            {projects.map((project, index) => (
                                <div key={index} className="group relative bg-[#121214] hover:bg-[#18181b] rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all duration-300 flex overflow-hidden h-32">

                                    {/* Compact Image */}
                                    <div className="w-32 md:w-40 relative overflow-hidden bg-zinc-900 border-r border-white/5 shrink-0">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                        />
                                    </div>

                                    {/* Compact Content */}
                                    <div className="flex-1 p-3 md:p-4 flex flex-col justify-between min-w-0">
                                        <div>
                                            <div className="flex items-center justify-between gap-2">
                                                <h4 className="text-sm font-bold text-zinc-200 group-hover:text-indigo-400 transition-colors truncate">
                                                    {project.title}
                                                </h4>
                                                <div className="flex gap-2 text-zinc-500 shrink-0">
                                                    <a href={project.github} target="_blank" className="hover:text-white transition-colors"><GithubIcon size={14} /></a>
                                                    <a href={project.live} target="_blank" className="hover:text-white transition-colors"><ExternalLink size={14} /></a>
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="flex gap-1.5 mt-2 overflow-hidden flex-wrap">
                                            {project.tech.slice(0, 4).map((t, i) => (
                                                <span key={i} className="text-[9px] px-1.5 py-0.5 bg-white/5 text-zinc-400 rounded border border-white/5 whitespace-nowrap">
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