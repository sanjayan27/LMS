import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../component/educator/Navbar";
import Sidebar from "../../component/educator/Sidebar";
import Footer from "../../component/educator/Footer";
import { Dashboard } from "./Dashboard";

export const Educator = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4  bg-gray-200 max-h-[100vh] overflow-scroll [&::-webkit-scrollbar]:hidden scrollbar-hide">
          
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div>
  );
};
