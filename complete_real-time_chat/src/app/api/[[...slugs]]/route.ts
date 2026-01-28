import { Elysia } from 'elysia'

export const app = new Elysia( { prefix: '/api' })
.get('/user', {user :{name :"Aditya"}} )

export const GET = app.fetch 
export const POST = app.fetch 
