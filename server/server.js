import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectMongoDb } from './config/mongoDB.js'
import { clerkWebhooks, webhookPurchaseCurse } from './controller/webhook.js'
import educatorRoutes from './routes/EducatorRouter.js'
import { clerkMiddleware } from '@clerk/express'
import cloudinaryKeys from './config/cloudinary.js'
import courseRouter from './routes/courseRouter.js'
import userRouter from './routes/userRouter.js'

dotenv.config()

const app = express()

//mongo db initializing
await connectMongoDb()
await cloudinaryKeys()

//middleware
app.use(cors())
app.use(clerkMiddleware())

app.use('/api/user',express.json(),userRouter)
app.use('/api/educator',express.json(),educatorRoutes)
app.use('/api/course',express.json(),courseRouter)

app.get('/',(req,res)=>{
    res.send(" Hello Express")
})
app.post('/clerk',express.json(),clerkWebhooks)
app.post('/stripe',express.raw({type :'application/json'}),webhookPurchaseCurse)



const PORT   =  process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("SERVER IS NOW RUNNING" ,PORT )
})