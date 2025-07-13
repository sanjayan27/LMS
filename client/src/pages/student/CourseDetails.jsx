import react, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import ReviewsAndRatings from "../../component/student/ReviewsAndRatings";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import RightSectionCourse from "../../component/student/RightSectionCourse";
import Loading from "../../component/student/Loading";

export const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const {
    courseData,
    handleRatings,
    calculateChaptertime,
    calculateCourseTime,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [toggleData, setToggleData] = useState({});
  const [previewData, setPreviewData] = useState(null);




  const toggleFunction = (index) => {
    setToggleData((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const fetchDataUser = async () => {
    try {
      const findData = await courseData.find((course) => course._id === id);

      setCourse(findData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, [course]);

  return (
    <section className="mt-15 ">
      {course ? (
        <section className="min-h-[100vh] w-full grid grid-cols-1   lg:grid-cols-2">
          <section className=" w-full lg:w-[55vw] order-2 lg:order-1 px-5 flex flex-col gap-8 ">
            <div className="flex flex-col gap-2">
              <h1 className=" font-new text-4xl   font-custom">
                {course.courseTitle}
              </h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: course.courseDescription.slice(0, 200),
                }}
                className="text-gray-600"
              ></p>
              <div>
                <div className=" text-gray-600 flex gap-2 text-sm items-center font-custom2 ">
                  <p>{handleRatings(course)}</p>
                  <p className="flex w-fit">
                    {[...Array(5)].map((_, i) => (
                      <img
                        src={
                          i < Math.floor(handleRatings(course))
                            ? assets.star
                            : assets.star_blank
                        }
                        key={i}
                        alt="str"
                        className="w-3"
                      />
                    ))}
                  </p>
                  <p className="text-blue-700">
                    ({course.courseRatings.length}{" "}
                    {course.courseRatings.length > 1 ? "ratings" : "rating"})
                  </p>
                  <p>
                    {course.enrolledStudents.length}{" "}
                    {course.enrolledStudents.length > 1
                      ? "students"
                      : "student"}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Course by{" "}
                <span className="underline text-blue-600">Sanjay</span>
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold capitalize ">
                course structure
              </h2>
              <div className="flex flex-col gap-2 mt-5">
                {course.courseContent.map((chapter, index) => (
                  <div
                    key={index}
                    className=" rounded w-[75vw]  lg:max-w-[40vw]  bg-white border overflow-hidden border-gray-400"
                  >
                    <div className="flex  justify-between items-center p-4 border-b border-gray-400">
                      <div
                        className="flex items-center gap-2 cursor-pointer select-none"
                        onClick={() => toggleFunction(index)}
                      >
                        <img
                          src={assets.down_arrow_icon}
                          alt=""
                          className={` transition-all duration-300 ${
                            toggleData[index]
                              ? "transform rotate-180"
                              : "transform rotate-0"
                          }`}
                        />
                        <div className="font-nunito ">
                          {chapter.chapterTitle}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm md:text-md text-gray-600">
                          {chapter.chapterContent.length} lectures-
                          {calculateChaptertime(chapter)}
                        </p>
                      </div>
                    </div>
                    <div
                      className={` w-full bg-amber-50  transition-all duration-300 ${
                        toggleData[index] ? "max-h-86" : "max-h-0"
                      }`}
                    >
                      <ul>
                        {chapter.chapterContent.map((lecture, index) => (
                          <li
                            key={index}
                            className="flex  justify-between items-center p-3"
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={assets.play_icon}
                                alt=""
                                className="cursor-pointer"
                              />
                              <p>{lecture.lectureTitle}</p>
                            </div>
                            <div className="flex text-xs md:text-sm font-custom2 gap-2">
                              <div className="text-blue-600 font-semibold capitalize cursor-pointer">
                                {lecture.isPreviewFree && <p   
                                  onClick={()=>setPreviewData({videoId: lecture.lectureUrl.split('/').pop()})}
                                >preview</p>}
                              </div>
                              <div>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      
                    </div>
                  </div>
                ))}
                <div className="mt-10 rich-text">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: course.courseDescription,
                          }}
                          className="text-gray-600"
                        ></p>
                      </div>
              </div>
            </div>
          </section>
          <section className=" flex justify-center order-1 lg:order-2  px-5 md:px-0 mb-12 lg:mb-0 ">
            <RightSectionCourse course={course} previewData={previewData}/>
          </section>
        </section>
      ) : (
        <Loading/>
      )}
    </section>
  );
};
