import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../../component/student/Loading";

export const MyCourses = () => {
  const { currency,BACKEND_URL, getToken , isEducator } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchCourseData = async() => {
    try {
      const token = await getToken()
      const {data} = await axios.get(BACKEND_URL+ '/api/educator/course-data' , { headers : {Authorization :`Bearer ${token}`}})
      data.success && setCourses(data.course)
      
    } catch (error) { 
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if(isEducator){
      fetchCourseData();
    }
  }, [isEducator]);

  return courses ? (
      <section className=" gap-10 h-screen flex  flex-col items-start md:p-8 md:pb-0 p-4 pt-8 pb-0">
        <div>
          <p className="capitalize text-xl font-custom2">my courses</p>
        </div>
        <table className="md:table-auto w-full overflow-scroll  bg-gray-300 rounded">
          <thead className="border-b border-gray-500/20">
            <tr className="text-left ">
              <th className="font-custom2 px-5 py-3">All Courses</th>
              <th className="font-custom2 px-5 py-3">All Earnings</th>
              <th className="font-custom2 px-5 py-3">Students</th>
              <th className="font-custom2 px-5 py-3">Published On</th>
            </tr>
          </thead>
          <tbody>
            {courses &&
              courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-500/20">
                  <td className="px-4 py-3 flex flex-col md:flex-row gap-2 items-center">
                    <img src={course.courseThumbnail} alt="" className="w-15" />
                    <p className="font-semibold">{course.courseTitle}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {currency}
                    {(
                      course.enrolledStudents?.length * course.coursePrice -
                      (course.coursePrice * course.discount) / 100
                    ).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {course.enrolledStudents?.length}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    
  ):<Loading/>
};
