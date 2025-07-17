import express from "express"
import { addUserRating, getCourseProgressData, getUserData, purchaseCourse, updateCourseProgress, userEnrolledCourses } from "../controller/userController.js"

const userRouter = express.Router()

userRouter.get('/data',getUserData)
userRouter.get('/user-enrolled-courses',userEnrolledCourses
)
userRouter.post('/purchase',purchaseCourse)
userRouter.post('/update-course-progress',updateCourseProgress)
userRouter.post('/get-course-progress',getCourseProgressData)
userRouter.post('/add-rating',addUserRating)


export default userRouter