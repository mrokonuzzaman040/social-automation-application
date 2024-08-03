"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar"; // Import your Navbar component

export default function VerifyEmail() {
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await fetch("/api/auth/verify-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Email verified successfully!");
                setTimeout(() => {
                    router.push("/auth/signin"); // Redirect to sign-in page after successful verification
                }, 2000);
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError("An error occurred while verifying.");
        }
    };

    return (
        <motion.div
            className="min-h-screen flex flex-col"
            initial={{ background: "linear-gradient(to right, black, purple)" }}
            animate={{
                background: [
                    "linear-gradient(to right, black, purple)",
                    "linear-gradient(to right, purple, black)",
                    "linear-gradient(to right, black, purple)",
                ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
        >
            {/* Navbar */}
            <Navbar /> {/* Use your Navbar component here */}

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center flex-grow">
                {/* Glass effect container */}
                <div className="bg-gradient-to-br from-purple-600 to-lime-500 p-1 rounded-lg">
                    <div className="backdrop-blur-md bg-white/30 shadow-lg rounded-lg p-12 w-full max-w-lg">
                        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Verify Your Email</h1>
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                            <input
                                type="text"
                                name="code"
                                placeholder="Enter Verification Code"
                                className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Verify Email
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
