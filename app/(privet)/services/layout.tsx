"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
    FaSignOutAlt,
    FaUser,
    FaChartLine,
    FaCog,
    FaChevronDown,
    FaBell,
    FaHome,
    FaEnvelope,
    FaComments,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen((prev) => !prev);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar for Services */}
            <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg border-r">
                <div className="flex items-center justify-center h-16 border-b">
                    <h2 className="text-xl font-bold">Services</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <a
                        href="/services/home"
                        className="flex items-center text-gray-700 hover:text-indigo-600 p-2 rounded-md transition"
                    >
                        <FaHome className="mr-3" /> Home Automation
                    </a>
                    <a
                        href="/services/email"
                        className="flex items-center text-gray-700 hover:text-indigo-600 p-2 rounded-md transition"
                    >
                        <FaEnvelope className="mr-3" /> Email Campaigns
                    </a>
                    <a
                        href="/services/chat"
                        className="flex items-center text-gray-700 hover:text-indigo-600 p-2 rounded-md transition"
                    >
                        <FaComments className="mr-3" /> Chat Bots
                    </a>
                    {/* Add more services as needed */}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="bg-white shadow-md">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-6">
                            <a
                                href="/dashboard"
                                className="text-xl font-bold text-indigo-600"
                            >
                                MyApp
                            </a>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-700 hover:text-indigo-600">
                                <FaBell className="inline-block" />
                            </button>
                            <div className="relative">
                                <button
                                    onClick={toggleProfileDropdown}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 focus:outline-none"
                                >
                                    <img
                                        src={session?.user?.image || "https://via.placeholder.com/32"}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <FaChevronDown
                                        className={`${isProfileDropdownOpen ? "transform rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
                                        <a
                                            href="#"
                                            className="flex px-4 py-2 text-gray-700 hover:bg-gray-200 items-center"
                                        >
                                            <FaBell className="mr-2" />
                                            My Account
                                        </a>
                                        <a
                                            href="#"
                                            className="flex px-4 py-2 text-gray-700 hover:bg-gray-200 items-center"
                                        >
                                            <FaCog className="mr-2" />
                                            Settings
                                        </a>
                                        <button
                                            onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
                                            className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-gray-200"
                                        >
                                            <FaSignOutAlt className="mr-2" /> Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-grow p-4 md:p-8 justify-center">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
