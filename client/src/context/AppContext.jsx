import { createContext, useEffect, useState } from "react";
import {dummyCourses} from "../assets/assets.js";
import {dummyTestimonial} from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration"


export const AppContext = createContext()

export const AppContextProvider = (props)=>{
    const [courseData,  setCourseData] = useState([])
    const [userTestimonials, setUserTestimonials] = useState([])
    const [userEnrolledData, setUserEnrolledData] = useState([])
    const fetchUserData = async()=>{
        setCourseData(dummyCourses)
        setUserTestimonials(dummyTestimonial)
    }
    const fetchEnrolledUser = async()=>{
        setUserEnrolledData(dummyCourses)
    }
    useEffect(() => {
      fetchUserData(),
      fetchEnrolledUser()
    }, [])

    const currency = import.meta.env.VITE_CURRENCY

    const navigate = useNavigate()
    const [isEducator ,setIsEducator] = useState(true)

    const handleRatings = (course) =>{
        if(course.courseRatings.length === 0){
            return 0
        }
        let  total = 0
        course.courseRatings.forEach((rating)=>{
            total += rating.rating
        })
        return total
    }


    //total course content chapters time
    const calculateChaptertime =(chap)=>{
        let total = 0;
        chap.chapterContent.map((lecture)=> total += lecture.lectureDuration)
        return humanizeDuration(total * 60 * 1000, {units: ['h','m']})
    }
    const  calculateCourseTime = (course)=>{
        let total = 0;
        course.courseContent.map((chapter)=> (chapter.chapterContent.map((lecture)=> total+= lecture.lectureDuration)))
        return humanizeDuration((total * 60 * 1000), {units : ["h","m"]})
    }
    const calculateTotalNoLectures= (course)=>{
        let totalLectures = 0;
        course.courseContent.forEach((chapter)=>{
            if(Array.isArray(chapter.chapterContent)){
               totalLectures += chapter.chapterContent.length  
            }
        })
        return totalLectures
    }


    const value ={
        currency,
        courseData,
        navigate,
        handleRatings,
        isEducator,
        setIsEducator,
        userTestimonials,
        calculateChaptertime,
        calculateCourseTime,
        calculateTotalNoLectures,
        userEnrolledData,
         setUserEnrolledData,
         fetchEnrolledUser
       
       
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}