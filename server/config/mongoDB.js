import express from 'express'
import mongoose from 'mongoose'

export const connectMongoDb=async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL/"lms")
            console.log('mongodb is connected')

    }catch(err){
        console.log(err)
    }
}