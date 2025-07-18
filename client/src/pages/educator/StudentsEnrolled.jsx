import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { dummyStudentEnrolled } from '../../assets/assets'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../../component/student/Loading'

 const StudentsEnrolled = () => {

  const {BACKEND_URL , isEducator , getToken} = useContext(AppContext)
  const [stdEnrolled,setStdEnrolled] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchEnrolledData =async()=>{
    try {
      setIsLoading(true)
      const token = await getToken()
      const {data} = await axios.get(BACKEND_URL + '/api/educator/enrolled-students', {headers : {authorization: `Bearer ${token}`}})
      if(data.success){
        setStdEnrolled(data.enrolledStudent.reverse())
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }

  }
  useEffect(()=>{
   if(isEducator){
     fetchEnrolledData()
   }
  },[isEducator])


  return (
    stdEnrolled ? (
      <section className=" gap-10 h-screen flex  flex-col items-start md:p-8 md:pb-0 p-4 pt-8 pb-0">
        <div>
          <p className="capitalize text-xl font-custom2">Students Enrolled</p>
        </div>
        <table className="md:table-auto w-full overflow-scroll  bg-gray-300 rounded">
          <thead className="border-b border-gray-500/20">
            <tr  className="text-left ">
              <th className="font-custom2 px-5 py-1">#</th>
              <th className="font-custom2 px-5 py-3">Student name</th>
              <th className="font-custom2 px-5 py-3">Course Title</th>
              <th className="font-custom2 px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {
              stdEnrolled.map((std,i)=>(
                
                  <tr key={i} className="border-b border-gray-500/20">
                    <td className='px-4 py-3 ' >{i+1}</td>
                  <td className="px-4 py-3 flex gap-2 items-center justify-center text-sm md:text-md mt-2 sm:mt-0 ">
                    <img src={std.student.imageUrl} alt="" className="w-5 rounded-full " />
                    <p className="font-semibold">{std.student.name}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-sm md:text-md">
                    
                    {std.courseTitle}
                  </td>
                  <td className='text-sm md:text-md px-4 py-3'>
                    {new Date(std.purchaseDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            }
          </tbody>
          
    </table>
    </section>
    
  ): <Loading/>)
}


export default StudentsEnrolled