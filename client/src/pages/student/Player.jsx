import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Rating from "../../component/student/Rating";

const Player = () => {
  const { id } = useParams();
  const { userEnrolledData, calculateChaptertime } = useContext(AppContext);
  const [courseData, setCourseData] = useState(null);
  const [toggleData, setToggleData] = useState({});
  const [previewData, setPreviewData] = useState(null);
  const toggleFunction = (index) => {
    setToggleData((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  console.log(previewData);
  const fetchUserPlayer = async () => {
    userEnrolledData.map((course) => {
      if (course._id === id) {
        setCourseData(course);
      }
    });
  };

  useEffect(() => {
    if (userEnrolledData && userEnrolledData.length > 0) {
      const matchedCourse = userEnrolledData.find(
        (course) => course._id === id
      );
      if (matchedCourse) {
        setCourseData(matchedCourse);
      } else {
        setCourseData(null); // Course not found
      }
    }
  }, [userEnrolledData, id]);

  return (
    <section className="grid grid-cols-1 gap-10 lg:gap-0 lg:grid-cols-2 min-h-[60vh] p-10">
      {/* left section */}
      <section className=" w-full order-2 lg:order-1 ">
        <div>
          <h2 className="text-2xl font-semibold capitalize ">
            course structure
          </h2>
          <div className="flex flex-col gap-2 mt-5 ">
            {courseData &&
              courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className=" rounded w-[75vw]  lg:max-w-[40vw]  bg-transparent border overflow-hidden border-gray-400"
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
                      <div className="font-nunito ">{chapter.chapterTitle}</div>
                    </div>
                    <div>
                      <p className="text-sm md:text-md text-gray-600">
                        {chapter.chapterContent.length} lectures-
                        {calculateChaptertime(chapter)}
                      </p>
                    </div>
                  </div>
                  <div
                    className={` w-full bg-transparent transition-all duration-300 ${
                      toggleData[index] ? "max-h-86" : "max-h-0"
                    }`}
                  >
                    <ul>
                      {chapter.chapterContent.map((lecture, i) => (
                        <li
                          key={i}
                          className="flex  justify-between items-center p-3"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={false ? assets.blue_tick_icon : assets.play_icon}
                              alt=""
                              className="cursor-pointer"
                            />
                            <p>{lecture.lectureTitle}</p>
                          </div>
                          <div className="flex text-xs md:text-sm font-custom2 gap-2">
                            <div className="text-blue-600 font-semibold capitalize cursor-pointer">
                              {lecture.lectureUrl && (
                                <p
                                  onClick={() =>
                                    setPreviewData({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture : i + 1
                                    })
                                  }
                                >
                                  Watch
                                </p>
                              )}
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
              <div className="mt-10">
                <div className="flex items-center gap-5">
                  <p className="text-xl font-semibold">Leave your Ratings</p>
                  <Rating/>
                </div>
              </div>
          </div>
        </div>
      </section>
      {/* right section */}
      <section className="lg:order-2 order-1">
        {courseData && (
          <div>
            {previewData ? <div>
              <YouTube
                videoId={previewData.lectureUrl.split('/').pop()}
                opts={{ playerVars: { autoPlay: 1 } }}
                iframeClassName="w-full aspect-video"
              />
              <div className="flex justify-between mt-3">
                <p className="font-new font-semibold text-md">{previewData.chapter}.{previewData.lecture} {previewData.lectureTitle}</p>
                <button className=" font-custom2 text-blue-700 cursor-pointer">{false ? 'Complted' : 'Mark Complete'}</button>
              </div>


            </div>
              
             : (
              <img src={courseData.courseThumbnail} alt="" />
            )}
          </div>
        )}
      </section>
    </section>
  );
};

export default Player;
