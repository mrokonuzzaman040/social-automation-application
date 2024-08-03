"use client";

import React, { useState } from "react";
import { FaSignInAlt, FaUserPlus, FaBars, FaTimes, FaTachometerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { data: session, status } = useSession();

    // Check if user is authenticated
    const isAuthenticated = status === "authenticated";

    // Toggle drawer
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    // Drawer variants
    const drawerVariants = {
        open: {
            x: 0,
            transition: {
                type: "tween",
                ease: "easeOut",
                duration: 0.4,
            },
        },
        closed: {
            x: "-100%",
            transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.4,
            },
        },
    };

    return (
        <nav className="flex items-center justify-between p-4">
            <div className="text-white text-2xl font-bold">Logo</div>
            <div className="hidden md:flex items-center space-x-6 text-white">
                <a href="/" className="hover:text-indigo-200 transition-colors">
                    Home
                </a>
                <a href="#" className="hover:text-indigo-200 transition-colors">
                    Service
                </a>
                <a href="#" className="hover:text-indigo-200 transition-colors">
                    Price
                </a>
                <div className="flex items-center space-x-3">
                    {isAuthenticated ? (
                        <a
                            href="/dashboard"
                            className="flex items-center hover:text-indigo-200 transition-colors"
                        >
                            <FaTachometerAlt className="mr-1" /> Dashboard
                        </a>
                    ) : (
                        <>
                            <a
                                href="/auth/sign-in"
                                className="flex items-center hover:text-indigo-200 transition-colors"
                            >
                                <FaSignInAlt className="mr-1" /> Sign In
                            </a>
                            <span>|</span>
                            <a
                                href="/auth/sign-up"
                                className="flex items-center hover:text-indigo-200 transition-colors"
                            >
                                <FaUserPlus className="mr-1" /> Sign Up
                            </a>
                        </>
                    )}
                </div>
            </div>
            <FaBars
                className="md:hidden text-2xl text-white cursor-pointer"
                onClick={toggleDrawer}
            />

            <motion.div
                initial="closed"
                animate={isDrawerOpen ? "open" : "closed"}
                variants={drawerVariants}
                className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-700 to-blue-800 shadow-lg md:hidden"
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <div className="text-white text-xl font-bold">Menu</div>
                    <FaTimes
                        className="text-white text-2xl cursor-pointer"
                        onClick={toggleDrawer}
                    />
                </div>
                <ul className="mt-4 space-y-4 pl-6">
                    <li>
                        <a
                            href="/"
                            className="text-white text-lg hover:text-indigo-200 transition-colors"
                            onClick={toggleDrawer}
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-white text-lg hover:text-indigo-200 transition-colors"
                            onClick={toggleDrawer}
                        >
                            Service
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="text-white text-lg hover:text-indigo-200 transition-colors"
                            onClick={toggleDrawer}
                        >
                            Price
                        </a>
                    </li>
                    {isAuthenticated ? (
                        <li>
                            <a
                                href="/dashboard"
                                className="text-white text-lg hover:text-indigo-200 transition-colors"
                                onClick={toggleDrawer}
                            >
                                Dashboard
                            </a>
                        </li>
                    ) : (
                        <>
                            <li>
                                <a
                                    href="/auth/sign-in"
                                    className="text-white text-lg hover:text-indigo-200 transition-colors"
                                    onClick={toggleDrawer}
                                >
                                    Sign In
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/auth/sign-up"
                                    className="text-white text-lg hover:text-indigo-200 transition-colors"
                                    onClick={toggleDrawer}
                                >
                                    Sign Up
                                </a>
                            </li>
                        </>
                    )}
                </ul>
            </motion.div>
        </nav>
    );
};

export default Navbar;
