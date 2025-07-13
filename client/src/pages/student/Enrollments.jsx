import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";

const Enrollments = () => {
  const { userEnrolledData, calculateCourseTime,navigate } = useContext(AppContext);
  const [progressArray, setProgressArray] = useState([
    { lecturesCompleted: 2, totalLectures: 4 },
    { lecturesCompleted: 4, totalLectures: 4 },
    { lecturesCompleted: 3, totalLectures: 4 },
    { lecturesCompleted: 2, totalLectures: 4 },
    { lecturesCompleted: 1, totalLectures: 4 },
    { lecturesCompleted: 4, totalLectures: 4 },
    { lecturesCompleted: 2, totalLectures: 4 },
    { lecturesCompleted: 2, totalLectures: 4 },
    { lecturesCompleted: 3, totalLectures: 4 },
    { lecturesCompleted: 3, totalLectures: 4 },
    { lecturesCompleted: 2, totalLectures: 4 },
    { lecturesCompleted: 2, totalLectures: 4 },
    { lecturesCompleted: 4, totalLectures: 4 },
    { lecturesCompleted: 1, totalLectures: 4 },
  ]);
  return (
    <section className="min-h-[100vh] flex flex-col justify-center items-start pt-10 p-3 w-full">
      <h1 className=" text-xl font-semibold mb-7">My Enrollments</h1>
      <div className="w-full overflow-x-auto lg:flex lg:justify-center">
        <table className="w-[95vw]  min-w-[700px] border  rounded shadow-lg ">
          <thead className="font-custom2">
            <tr className="border-t  ">
              <th className="py-2 px-4 border-b">Course</th>
              <th className="py-2 px-4 border-b">Duration</th>
              <th className="py-2 px-4 border-b">Lectures Completed</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {userEnrolledData.map((course, index) => (
              <tr key={index} className="text-center">
                <td className="py-2  gap-2 px-4 flex items-center border-b">
                  <img
                    src={course.courseThumbnail}
                    alt=""
                    className="w-30 lg:w-50"
                  />
                  <div className="text-start flex flex-col gap-3">
                    <p>{course.courseTitle}</p>
                    <Line strokeWidth={2} percent={
                      course ? progressArray[index].lecturesCompleted * 100 /progressArray[index].totalLectures : 0
                    } className="w-full rounded-full"/>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  {calculateCourseTime(course)}
                </td>
                <td className="py-2 px-4 border-b">
                  {progressArray[index] &&
                    `${progressArray[index].lecturesCompleted} / ${progressArray[index].totalLectures} `}
                </td>
                <td className="py-2 px-4 border-b">
                  <button onClick={()=>navigate("/player/"+course._id)} className="border py-1 px-2 rounded bg-blue-700 text-white cursor-pointer">
                    {progressArray[index] &&
                    progressArray[index].lecturesCompleted /
                      progressArray[index].totalLectures ===
                      1
                      ? "Completed"
                      : "On Going"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Enrollments;
