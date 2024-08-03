"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Mobile Navbar */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-lg w-full">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <button onClick={toggleSidebar} className="focus:outline-none">
                    {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-30 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:relative w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}
            >
                <div className="flex items-center justify-center h-20 border-b">
                    <a href="/dashboard">
                        <h1 className="text-xl font-bold">Dashboard</h1>
                    </a>
                </div>
                <div className="flex-grow flex flex-col justify-between">
                    <nav className="flex-1 px-4 py-2">
                        <ul>
                            <li className="mb-2">
                                <a
                                    href="/dashboard/profile"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition"
                                >
                                    {/* Example Icon */} <FaBars className="mr-3" /> Profile
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition"
                                >
                                    {/* Example Icon */} <FaBars className="mr-3" /> Analytics
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="#"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition"
                                >
                                    {/* Example Icon */} <FaBars className="mr-3" /> Settings
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="px-4 py-2 border-t">
                        {session && (
                            <button
                                onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
                                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition"
                            >
                                <FaSignOutAlt className="mr-3" /> Sign Out
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex flex-grow p-4 md:p-8 justify-center">
                {children}
            </main>
        </div>
    );
};

export default Layout;
