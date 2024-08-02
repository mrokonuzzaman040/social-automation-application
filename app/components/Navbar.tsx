"use client";
import React from 'react';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between p-6">
            <div className="text-white text-2xl font-bold">
                {/* Replace with your logo or use an image */}
                Logo
            </div>
            <div className="flex items-center space-x-4 text-white">
                <a href="#" className="hover:text-gray-300">Home</a>
                <a href="#" className="hover:text-gray-300">Service</a>
                <a href="#" className="hover:text-gray-300">Price</a>
                <div className="flex items-center space-x-2">
                    <a href="#" className="flex items-center hover:text-gray-300">
                        <FaSignInAlt className="mr-1" /> Sign In
                    </a>
                    <span>|</span>
                    <a href="#" className="flex items-center hover:text-gray-300">
                        <FaUserPlus className="mr-1" /> Sign Up
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
