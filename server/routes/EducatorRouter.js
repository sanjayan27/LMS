import express from 'express'
import { addCourse, educatorDashboardData, findCourse, getEnrolledStudentData, updateRoleToEducator } from '../controller/educatorController.js'
import upload from '../middleware/multer.js'
import protectAuthEducator from '../middleware/authMiddleware.js'
import { fetCourseById } from '../controller/courseContoller.js'

const educatorRoutes = express.Router()

educatorRoutes.get('/update-role' , updateRoleToEducator)
educatorRoutes.post('/add-course' , upload.single('image'), protectAuthEducator , addCourse)
educatorRoutes.get('/course-data',protectAuthEducator,findCourse)
educatorRoutes.get('/dashboard',protectAuthEducator,educatorDashboardData)
educatorRoutes.get('/enrolled-students',protectAuthEducator, getEnrolledStudentData)
export default educatorRoutes