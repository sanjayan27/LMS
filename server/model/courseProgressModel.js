import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema({
    userId : {type : String, required :true},
    courseId : {type : String, required :true},
    completed : {type : Boolean, default :false},
    lectureCompleted : [],

},{minimize : false})

export const Progress = mongoose.model('COurseProgress',courseProgressSchema)