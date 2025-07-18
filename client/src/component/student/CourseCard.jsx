import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { FaArrowDown } from "react-icons/fa6";
import ReviewsAndRatings from "./ReviewsAndRatings";

const CourseCard = ({ course }) => {
  const { currency, handleRatings } = useContext(AppContext);
  return (
    <section className="flex justify-center ">
      {handleRatings(course) >= 0  && (
        <Link
          to={"/course-details/"+ course._id}
          onClick={() => scrollTo(0, 0)}
          className=" rounded bg-orange-50"
        >
          <img
            src={course.courseThumbnail}
            alt=""
            className="w-80 sm:w-70 h-40 rounded"
          />
          <div className="flex flex-col font-new p-3 gap-1">
            <h3>{course.courseTitle}</h3>
            <p>{course.educator?.name}</p>
            <ReviewsAndRatings course={course}/>
            <div className="flex items-center gap-3">
              <p>
                {currency}
                {(
                  course.coursePrice -
                  (course.discount * course.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <div className="text-green-600 font-bold flex items-center text-sm">
                <FaArrowDown />
                <p>{course.discount}%</p>
              </div>
            </div>
          </div>
        </Link>
      )}
    </section>
  );
};

export default CourseCard;
