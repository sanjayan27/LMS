import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { assets } from "../../assets/assets";

import Logo from "../../assets/favicon.svg";
const Footer = () => {
    return (
        <footer className="w-full bg-transparent border-t border-gray-300 py-4 flex flex-col md:flex-row items-center justify-between px-6">
            {/* Section 1: Name and Logo */}
            <div className="flex items-center gap-2 mb-2 md:mb-0">
                <img src={Logo} alt="" />
                <span className="font-semibold text-lg text-gray-800">StudPlat</span>
            </div>
            {/* Section 2: Copyright */}
            <div className="text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} EduPlatform. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;