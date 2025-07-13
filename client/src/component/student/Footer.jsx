import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-200 py-10 mt-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1 */}
                <div>
                    <h2 className="font-bold text-lg mb-4">LMS</h2>
                    <p className="text-sm mb-4">
                        Learn anything, anytime, anywhere. Empower your future with our platform.
                    </p>
                    <div className="flex gap-3">
                        <a href="#" aria-label="Facebook" className="hover:text-blue-500"><FaFacebookF /></a>
                        <a href="#" aria-label="Twitter" className="hover:text-blue-400"><FaTwitter /></a>
                        <a href="#" aria-label="Instagram" className="hover:text-pink-500"><FaInstagram /></a>
                    </div>
                </div>
                {/* Column 2 */}
                <div>
                    <h3 className="font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">Courses</a></li>
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                    </ul>
                </div>
                {/* Column 3 */}
                <div>
                    <h3 className="font-semibold mb-3">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">Help Center</a></li>
                        <li><a href="#" className="hover:underline">FAQs</a></li>
                        <li><a href="#" className="hover:underline">Terms of Service</a></li>
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-xs text-gray-500 mt-8">
                &copy; {new Date().getFullYear()} LMS. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;