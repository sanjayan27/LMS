import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { BiBookAdd } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { LiaSwatchbookSolid } from "react-icons/lia";

const sidebarItems = [
  { name: "Dashboard", path: "/educator", icon: <IoHomeOutline /> },
  { name: "Add Courses", path: "/educator/add-course", icon: <BiBookAdd />},
  { name: "Students Enrolled", path: "/educator/students-enrolled", icon:<BsPeople />
 },
  { name: "My Courses", path: "/educator/my-course", icon:<LiaSwatchbookSolid /> },
];

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);
  return (
    isEducator && (
      <aside
        className="w-15 bg-transparent min-h-screen py-4 border-e border-black
        md:w-50 sm:px-0"
      >
        <nav>
          <ul className="list-none flex flex-col p-0">
            {sidebarItems.map((item) => (
              <li key={item.name} className="my-4 flex  sm:my-6">
                <NavLink
                  to={item.path}
                  key={item.name}
                  end={item.path === '/educator'}
                  className={({ isActive }) =>
                    `flex items-center justify-start sm:justify-start no-underline px-4 py-2 rounded-s-md  hover:bg-gray-200 hover:border-e-3 border-blue-600 transition-colors gap-2 w-full  text-start  ${
                      isActive ? "bg-gray-200 border-e-3 text-black" : "text-black"
                    }`
                  }
                >
                  <span className="mr-2 text-xl md:mr-0">{item.icon}</span>
                  <span className="hidden md:block text-base lg:text-md">
                    {item.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    )
  );
};

export default Sidebar;
