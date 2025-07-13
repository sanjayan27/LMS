import React, { useContext, useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

export const Dashboard = () => {
  const {currency,userEnrolledData} = useContext(AppContext)
  const [latestEnroll,setLatestEnroll] = useState(null)
  const fetchLatestEnrollments = async()=>{
    setLatestEnroll(dummyDashboardData)
  }
  useEffect(()=>{
    fetchLatestEnrollments()
  },[])
  return (
    <section className='flex flex-col gap-10 p-3 w-full'>
      {/* section one */}
      <section className='w-full flex gap-7 flex-col '>
        <h1 className='text-2xl font-new'>Overview</h1>
        {/* <p>{Date.now()}</p> */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center lg:place-items-start'>
          <div className="box w-50 md:w-70 h-25     md:min-h-30 border  rounded-xl flex items-center gap-5 p-3">
            <img src={assets.patients_icon} alt="" className='' />
            <div className='flex flex-col '>
              <p className='font-new font-custom2 text-md  md:text-lg'>Total Enrollements</p>
              <p className='font-custom2'>{dummyDashboardData.enrolledStudentsData.length}</p>
            </div>
          </div>
          <div className="box w-50 md:w-70 h-25     md:min-h-30 border rounded-xl flex items-center gap-5 p-3">

            <img src={assets.appointments_icon} alt="" className='' />
            <div className='flex flex-col '>
              <p className='font-new font-custom2 text-md  md:text-lg'>Total Course</p>
              <p className='font-custom2'>{dummyDashboardData.totalCourses}</p>
            </div>
          </div>
          <div className="box w-50 md:w-70 h-25     md:min-h-30 border rounded-xl flex items-center gap-5 p-3 ">
            <img src={assets.earning_icon} alt="" className='' />
            <div className='flex flex-col '>
              <p className='font-new font-custom2 text-md  md:text-lg'>Total Earnings</p>
              <p className='font-custom2'>{currency} {dummyDashboardData.totalEarnings}</p>
            </div>

          </div>
        </div>
      </section>
      {/* section 2 */}
      <section>
        <div className='md:max-w-[60vw] '>
          <h1 className='text-2xl font-new mb-5'>Latests Enrollments</h1>
          <table className='table-fixed md:table-auto w-full overflow-hidden '>
              <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                <tr>
                  <th className='px-4 py-3'>#</th>
                  <th className=' py-3'>Student Names</th>
                  <th className='px-4 py-3'>Course Title</th>
                </tr>
               
              </thead>
              <tbody>
              
              {
                latestEnroll && latestEnroll.enrolledStudentsData.map((std,i)=>(
                  <tr key={i} className='border-b border-gray-500/20 '>
                    <td className='md:px-4 px-0 py-3  space-x-3'>{i+1}</td>
                  
                    <td className='flex items-center flex-row gap-2 ms-[-30px] md:ms-0 py-5'>
                      <img src={std.student.imageUrl} alt="" className='max-w-6 rounded-full'/>
                      <p>{std.student.name}</p>
                    </td>
                    <td>{std.courseTitle}</td>
                  </tr>

                ))
              }
              </tbody>
          </table>
        </div>
      </section>
    </section>
  )
}
