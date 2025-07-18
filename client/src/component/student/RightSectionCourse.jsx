import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube"
const RightSectionCourse = ({ course,previewData,enrollCourse,alreadyEnrolled}) => {
  const { currency, handleRatings, calculateTotalNoLectures ,calculateCourseTime} =
    useContext(AppContext);
  

  return (
    <section className=" w-[500px]  px-10">
      <div className="bg-slate-50 shadow-2xl rounded overflow-hidden">
        <div>
          {
            previewData ?
              <YouTube videoId={previewData.videoId}  opts={{playerVars : {autoPlay : 1}}} iframeClassName="w-full aspect-video" />
            :(<img src={course.courseThumbnail} alt="" />)
          }
        </div>
        <div className="flex flex-col gap-1 p-3">
          <div className="font-semibold flex items-center gap-2 ">
            <img src={assets.time_left_clock_icon} alt="" />
            <p className="text-red-600 ">5 Hours only left at this price</p>
          </div>
          <div className="flex items-center  gap-3 ">
            <p className="text-lg">
              {currency}
              {(
                course.coursePrice -
                course.coursePrice * (course.discount / 100)
              ).toFixed(2)}
            </p>
            <p className="line-through text-sm mt-0.3 text-gray-600">
              {currency}
              {course.coursePrice}
            </p>
            <p className="text-green-700 font-custom2">
              {course.discount}% offer
            </p>
          </div>
          <div className="flex gap-2 text-gray-600">
            <div className="flex flex-row items-center gap-1">
              <img src={assets.star} alt="" className="w-4" />
              <p className="font-custom2">{handleRatings(course)}</p>
            </div>
            <div>|</div>
            <div className="flex flex-row items-center gap-1 font-custom2">
              <img src={assets.time_clock_icon} alt="" className="w-4" />
              <p>{calculateCourseTime(course)}</p>
            </div>
            <div>|</div>
            <div className="font-custom2"> 
              {calculateTotalNoLectures(course)}{" "}
              {course.courseContent.length > 1 ? "lessons" : "lesson"}
            </div>
          </div>
        <button onClick={enrollCourse} className="w-full mt-1 cursor-pointer bg-blue-700 rounded text-white p-1">{alreadyEnrolled ? "Already Enrolled": "Enroll now"}</button>
        <div>
          <h1 className="font-semibold text-lg mb-2 mt-2">What's in the course?</h1>
          <ul className="list-disc px-7 text-gray-600">
            <li>Lifetime access with free updates.</li>
            <li>Step-by-step, hands-on project guidance.</li>
            <li>Downloadable resources and source code.</li>
            <li>Quizzes to test your knowledge.</li>
            <li>Certificate of completion.</li>
          </ul>
        </div>
        </div>
      </div>
    </section>
  );
};

export default RightSectionCourse;
