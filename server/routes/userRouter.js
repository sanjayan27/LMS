import express from "express"
import { getUserData, purchaseCourse, userEnrolledCourses } from "../controller/userController.js"

const userRouter = express.Router()

userRouter.get('/data',getUserData)
userRouter.get('/user-enrolled-courses',userEnrolledCourses
)
userRouter.post('/purchase',purchaseCourse)


export default userRouter