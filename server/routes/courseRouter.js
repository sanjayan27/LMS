import express from 'express'
import { fetCourseById, getAllCourse } from '../controller/courseContoller.js'


const courseRouter = express.Router()


courseRouter.get('/all-course',getAllCourse)
courseRouter.get('/:id',fetCourseById)

export default courseRouter