"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Layout from "../../services/layout";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { useState, FormEvent } from "react";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [name, setName] = useState(session?.user?.name || "");
    const [email, setEmail] = useState(session?.user?.email || "");
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");

    if (status === "loading") {
        // Show loading state while session is being fetched
        return <p>Loading...</p>;
    }

    if (!session) {
        // Redirect or display a message if the user is not authenticated
        return <p>You need to be signed in to view this page.</p>;
    }

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Simulate a backend update
        setTimeout(() => {
            setMessage("Profile updated successfully!");
            setIsEditing(false);
        }, 1000);

        // You can implement real API requests here to update the user's profile in the backend
        // Example:
        // await fetch('/api/profile/update', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ name, email }),
        // });
    };

    return (
        <div>
            <motion.div
                className="bg-white shadow-md rounded-lg p-4 md:p-8 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center space-x-4">
                    {/* Profile Picture */}
                    <motion.div
                        className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {session.user?.image ? (
                            <img
                                src={session.user.image}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <FaUser className="text-gray-500 text-6xl" />
                        )}
                    </motion.div>

                    {/* User Info */}
                    <div>
                        <h2 className="text-2xl font-bold">
                            {session.user?.name || "User"}
                        </h2>
                        <p className="text-gray-600">
                            <FaEnvelope className="inline-block mr-2" />
                            {session.user?.email}
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="bg-white shadow-md rounded-lg p-4 md:p-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <h3 className="text-lg font-semibold mb-2">Profile Details</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Edit your profile details below.
                </p>
                {message && (
                    <p className="text-green-500 text-sm mb-4">{message}</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    {isEditing ? (
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleEditToggle}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={handleEditToggle}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Edit Profile
                        </button>
                    )}
                </form>
            </motion.div>
        </div>
    );
}
