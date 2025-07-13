import React, { useContext, useEffect, useState } from 'react'
import SearchBoxField from '../../component/student/SearchBoxField'
import CourseCard from '../../component/student/CourseCard'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'

const CoursesList = () => {

  const {courseData , navigate} = useContext(AppContext)
  const {input} = useParams()
  const [filteredCourse,  setFilteredCourse ]= useState([])
  
  
  
  useEffect(()=>{
    if(courseData && courseData.length > 0){
      const tempData = courseData.slice()
      
      input ?
      setFilteredCourse(
        tempData.filter(item => item.courseTitle.toLowerCase().includes(input.toLowerCase())
      ))
      : setFilteredCourse(tempData)
    }
  },[courseData,input])
  
  const handleCloseIcon=()=>{
    input === ""
   navigate("/courses")
  }
  
  return (
    <section className='mt-5'>
      
      <div className='flex flex-col gap-5  sm:flex-row sm:justify-between p-5 '>
        <div>
            <h1 className='text-3xl  font-custom'> Course List</h1>
            <p>
              <button onClick={()=>navigate("/")} className='cursor-pointer text-blue-700'>Home</button> / <button>Course  List</button>
            </p>
        </div>
        <div className = " mx-auto sm:mx-0 w-fit">
          <SearchBoxField data= {input} />
        </div>
        
      </div>
      {
          input && (
            <div  className='inline-flex items-center gap-2 border rounded   mt-6 mb-6 border-gray-600 ms-8  w-fit p-1 capitalize text-gray-600 '>
              <p>{input}</p>
              <img src={assets.cross_icon} alt="" className='w-3 cursor-pointer' onClick={()=>handleCloseIcon()} />
            </div>
          )
        }
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:p-0  my-10'>
          
            {filteredCourse.map((val,i)=>(
              <CourseCard course= {val} key={i}/>
            ))}
          
      </div>
    </section>
  )
}

export default CoursesList


