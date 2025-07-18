import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import SearchCourse from "./SearchCourse";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";

const Courses = () => {
  const { courseData } = useContext(AppContext);
  return (
    <section className="min-h-[60vh] flex flex-col items-center gap-5 mt-10 w-full ">
      <SearchCourse />
      {courseData  && (
        <div className=" mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-7 sm:gap-5 md:gap-7 lg:gap-4 xl:gap-7 lg:grid-cols-4 ">
          {courseData.slice(0, 4).map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      )}
      <Link
        className="capitalize text-green-700 font-new underline"
        to={"/courses"}
        onClick={() => scrollTo(0, 0)}
      >
        see all course
      </Link>
    </section>
  );
};

export default Courses;
