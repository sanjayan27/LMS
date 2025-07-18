import React from "react";

import Navbar from "./component/student/Navbar";
import { Route, Routes, useMatch } from "react-router-dom";
import Enrollments from "./pages/student/Enrollments";
import Player from "./pages/student/Player";
import Home from "./pages/student/Home";
import { Educator } from "./pages/educator/Educator";
import { AddCourse } from "./pages/educator/AddCourse";
import { MyCourses } from "./pages/educator/MyCourses";
import CoursesList from "./pages/student/CoursesList";
import { CourseDetails } from "./pages/student/CourseDetails";
import { Dashboard } from "./pages/educator/Dashboard";
import Footer from "./component/student/Footer";
import StudentsEnrolled from './pages/educator/StudentsEnrolled';
import "quill/dist/quill.snow.css"
import { SignIn } from "@clerk/clerk-react";
 import { ToastContainer } from 'react-toastify';
import { LoadingEnrollments } from "./pages/student/LoadingEnrollments";
import Loading from "./component/student/Loading";


const App = () => {
  const isEducatorPage = useMatch("/educator/*");
  return (
<div className="min-h-screen bg-gradient-to-r  from-[#c1e0f8] to-white">
      <ToastContainer />
      {!isEducatorPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign-in" element ={<SignIn/>}/>
        <Route path="/courses" element={<CoursesList />} />
        <Route path="/courses/:input" element={<CoursesList />} />
        <Route path="/course-details/:id" element={<CourseDetails />} />
        <Route path="/enrollments" element={<Enrollments />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path = "/loading/:path" element={<Loading/>}/>
        <Route path="/educator" element={<Educator />}>
          <Route path="/educator/" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-course" element={<MyCourses />} />
          <Route path="students-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>
      {!isEducatorPage && <Footer />}
    </div>
  );
};
export default App;
