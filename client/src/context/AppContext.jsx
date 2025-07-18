import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets.js";
import { dummyTestimonial } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import Loading from "../component/student/Loading.jsx";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [courseData, setCourseData] = useState([]);
  const [userTestimonials, setUserTestimonials] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userEnrolledData, setUserEnrolledData] = useState([]);
  const { user } = useUser();

  const { getToken } = useAuth();

  const fetchAllCourse = async () => {
    try {
      const { data } = await axios.get(BACKEND_URL + "/api/course/all-course");
      if (data.success) {
   
        setCourseData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setUserTestimonials(dummyTestimonial);
  };

  //fetch user data

  const fetchUserData = async () => {
    if (user.publicMetadata.role === "educator") {
      setIsEducator(true);
    }
    try {
      const token = await getToken();

      const { data } = await axios.get(BACKEND_URL + "/api/user/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        
        setUserData(data.userData);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchEnrolledUser = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(
        BACKEND_URL + "/api/user/user-enrolled-courses",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        setUserEnrolledData(data.enrolledCourses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();

  const handleRatings = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let total = 0;
    course.courseRatings.forEach((rating) => {
      total += rating.rating;
    });
    return Math.floor(total / course.courseRatings.length);
  };

  //total course content chapters time
  const calculateChaptertime = (chap) => {
    let total = 0;
    chap.chapterContent.map((lecture) => (total += lecture.lectureDuration));
    return humanizeDuration(total * 60 * 1000, { units: ["h", "m"] });
  };
  const calculateCourseTime = (course) => {
    let total = 0;
    course.courseContent?.map((chapter) =>
      chapter.chapterContent?.map(
        (lecture) => (total += lecture.lectureDuration)
      )
    );
    return humanizeDuration(total * 60 * 1000, { units: ["h", "m"] });
  };
  const calculateTotalNoLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };


  useEffect(() => {
    fetchAllCourse();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchEnrolledUser();
    }
  }, [user]);

  const value = {
    currency,
    courseData,
    navigate,
    handleRatings,
    isEducator,
    setIsEducator,
    userTestimonials,
    calculateChaptertime,
    calculateCourseTime,
    calculateTotalNoLectures,
    userEnrolledData,
    setUserEnrolledData,
    fetchEnrolledUser,
    BACKEND_URL,
    userData,
    setUserData,
    fetchAllCourse,
    getToken,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
