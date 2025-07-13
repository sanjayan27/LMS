import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectMongoDb } from './config/mongoDB.js'
import { clerkWebhooks } from './controller/webhook.js'
dotenv.config()

const app = express()

//mongo db initializing
await connectMongoDb()

//middleware
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send(" Hello Express")
})
app.post('/clerk',clerkWebhooks)



const PORT   =  process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("SERVER IS NOW RUNNING" ,PORT )
})