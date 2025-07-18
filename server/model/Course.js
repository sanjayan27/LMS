import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  lectureTitle: {
    type: String,
    required: true,
  },
  lectureId: {
    type: String,
    required: true,
  },
  lectureDuration: {
    type: Number,
    required: true,
  },
  lectureUrl : {
    type : String,
    required : true,


  },
  isPreviewFree : {
    type: Boolean,
    required  : true
  },
  lectureOrder : {
    type : Number,
    required : true
  }
},{_id: false});



const chapterSchema = new mongoose.Schema({
    chapterId : {type : String,
        required : true
    },
    chapterTitle:{
        type : String,
        required : true
    },
    chapterOrder: {
        type : Number,
        required : true
    },
    chapterContent : [lectureSchema],
    
},{_id : false})


const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    coursePrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    courseThumbnail: {
      type: String,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    courseContent: [chapterSchema],
    courseRatings: [
      {
        userId: { type: String },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    educator: { type: String, ref: "User", required: true },
    enrolledStudents: [{
        type: String,
        raf: 'User'
    }]
  },
  { timestamps: true, minimize: false }
);


const Course = mongoose.model('Course',courseSchema)

export default Course


