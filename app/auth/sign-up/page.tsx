"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn, getProviders, ClientSafeProvider } from "next-auth/react";
import { useEffect } from "react";
import { FaGoogle, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar"; // Import your Navbar component

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [providers, setProviders] = useState<Record<string, ClientSafeProvider>>({});
    const router = useRouter();

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res || {});
        };

        fetchProviders();
    }, []);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        // Password must be at least 8 characters long and contain at least one number and one letter
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    const validateForm = () => {
        if (formData.name.trim().length < 3) {
            setError("Name must be at least 3 characters long");
            return false;
        }
        if (!validateEmail(formData.email)) {
            setError("Invalid email address");
            return false;
        }
        if (!validatePassword(formData.password)) {
            setError("Password must be at least 8 characters long and contain at least one number");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "An error occurred");
            } else {
                setSuccess(data.message);
                setError("");
                router.push("/auth/signin"); // Redirect to sign-in page after successful signup
            }
        } catch (error) {
            setError("Failed to sign up");
            console.error("Signup error:", error);
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
                        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Create an Account</h1>
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Sign Up
                            </button>
                        </form>
                        <div className="flex flex-col items-center mt-8">
                            <p className="mb-4 text-gray-600">Or sign up with</p>
                            <div className="flex space-x-4">
                                {providers &&
                                    Object.values(providers)
                                        .filter((provider) => provider.id !== "credentials") // Filter out the CredentialsProvider
                                        .map((provider) => (
                                            <button
                                                key={provider.name}
                                                onClick={() => signIn(provider.id)}
                                                className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors p-3 rounded-full"
                                                aria-label={`Sign up with ${provider.name}`}
                                            >
                                                {provider.name === "Google" && <FaGoogle className="text-red-500" size={24} />}
                                                {provider.name === "Facebook" && <FaFacebook className="text-blue-600" size={24} />}
                                                {provider.name === "LinkedIn" && <FaLinkedin className="text-blue-700" size={24} />}
                                                {provider.name === "Instagram" && <FaInstagram className="text-pink-500" size={24} />}
                                            </button>
                                        ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
