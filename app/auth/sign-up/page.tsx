"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, getProviders, ClientSafeProvider } from "next-auth/react";
import { FaGoogle, FaFacebook, FaLinkedin, FaInstagram, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar"; // Import your Navbar component

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [providers, setProviders] = useState<Record<string, ClientSafeProvider>>({});
    const [loading, setLoading] = useState(false); // State to manage loading state
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
        // Updated regex to match the complexity requirements
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
            setError(
                "Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character"
            );
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true); // Set loading state to true when form submission starts

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
                router.push("/auth/sign-in"); // Redirect to sign-in page after successful signup
            }
        } catch (error) {
            setError("Failed to sign up");
            console.error("Signup error:", error);
        } finally {
            setLoading(false); // Reset loading state to false when submission is complete
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
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
            <Navbar />

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
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                            <button
                                type="submit"
                                className={`flex items-center justify-center bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                disabled={loading} // Disable button when loading
                            >
                                {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
                                {loading ? 'Signing Up...' : 'Sign Up'}
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
