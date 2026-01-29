import { NextRequest, NextResponse } from "next/server"
import { redis } from "./lib/redis";

export const proxy = async (req:NextRequest )=>{
const pathname = req.nextUrl.pathname;
 const roomMatch = pathname.match(/^\/room\/([^/]+)$/)

 if(!roomMatch) return  NextResponse.redirect(new URL("/", req.url))

const roomId = roomMatch[1]
const meta = await redis.hgetall<{connected:string[], createdAt :number}>(`meta:${roomId}`)

 if(!meta) return  NextResponse.redirect(new URL("/?error=room-not-found", req.url))

    // TODO : TOKEN arbatery tokens from REDIS DATABASES 

//  OVERVIEW : CHECK IF USER IS ALLOWED TO JOIN ROOM
//  IF THEY ARE : LET THEM PASS
//  IF THEY ARE NOT : SEND THEM TO LOBBY
}


export const config ={
    matcher: "/room/:path*",
}