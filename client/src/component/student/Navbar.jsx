import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/favicon.png";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { navigate, isEducator, getToken, setIsEducator, BACKEND_URL } =
    useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toBecomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }
      const token = await getToken();
      const { data } = await axios.get(
        BACKEND_URL + "/api/educator/update-role",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="flex items-center justify-between bg-white  shadow px-8 py-4 relative">
      {/* Logo & Name */}
      <div
        className=" cursor-pointer flex items-center space-x-3 "
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="Logo" className="h-10 w-10" />
        <span className="font-bold text-xl text-gray-800">StudPlat</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
          Home
        </Link>
        <Link
          to="/courses"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Courses
        </Link>
        <Link
          to="/enrollments"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          My Enrollments
        </Link>
        <button
          onClick={toBecomeEducator}
          className="cursor-pointer text-gray-700 hover:text-blue-600 font-medium"
        >
          {isEducator ? "Educator Dashboard" : "Become Educator"}
        </button>
      </div>

      {/* Desktop Join Us Button */}
      <div className="hidden md:block">
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Join Us
          </button>
        )}
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        className="md:hidden flex items-center cursor-pointer"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg
          className="w-7 h-7 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed cursor-pointer top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 md:hidden`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="Logo" className="h-8 w-8" />
            <span className="font-bold text-xl text-gray-800">LMS</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="
            cursor-pointer"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col space-y-4 px-6 py-6">
          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Join Us
            </button>
          )}
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
            onClick={() => setSidebarOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="text-gray-700 hover:text-blue-600 font-medium"
            onClick={() => setSidebarOpen(false)}
          >
            Courses
          </Link>
          <Link
            to="/enrollments"
            className="text-gray-700 hover:text-blue-600 font-medium"
            onClick={() => setSidebarOpen(false)}
          >
            My Enrollments
          </Link>
          <button
            onClick={toBecomeEducator}
            className=" text-start text-gray-700 hover:text-blue-600 font-medium"
          >
            {isEducator ? "Educator Dashboard" : "Become Educator"}
          </button>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
