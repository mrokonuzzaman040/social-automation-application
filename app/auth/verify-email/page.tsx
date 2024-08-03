"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";

export default function VerifyEmail() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const codeFromUrl = searchParams.get("code") || "";
    const emailFromUrl = searchParams.get("email") || "";
    const [code, setCode] = useState(Array(6).fill(""));
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Initialize code from URL if present
    useEffect(() => {
        if (codeFromUrl && codeFromUrl.length === 6) {
            setCode(codeFromUrl.split(""));
        }
    }, [codeFromUrl]);

    const handleChange = (index: number, value: string) => {
        if (/^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Automatically focus next input if not the last and input is filled
            if (value && index < 5) {
                const nextInput = document.getElementById(`code-input-${index + 1}`);
                if (nextInput) {
                    (nextInput as HTMLInputElement).focus();
                }
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("Text").trim();

        // Only process if the pasted data is a 6-digit number
        if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
            setCode(pastedData.split(""));
        }
    };

    // Handle form submission
    const stingCode = code.join("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/verify-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: stingCode,
                    email: emailFromUrl,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Email verified successfully!");
                setTimeout(() => {
                    router.push("/auth/sign-in");
                }, 2000);
            } else {
                setError(data.error || "Verification failed");
            }
        } catch (error) {
            setError("An error occurred while verifying.");
        } finally {
            setIsLoading(false);
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
            <Navbar />

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center flex-grow">
                {/* Glass effect container */}
                <div className="bg-gradient-to-br from-purple-600 to-lime-500 p-1 rounded-lg">
                    <div className="backdrop-blur-md bg-white/30 shadow-lg rounded-lg p-12 w-full max-w-lg">
                        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                            Verify Your Email
                        </h1>
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        {message && (
                            <p className="text-green-500 text-center mb-4">{message}</p>
                        )}
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                            <div className="flex justify-center space-x-2">
                                {code.map((digit, index) => (
                                    <motion.input
                                        key={index}
                                        id={`code-input-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150"
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onPaste={handlePaste} // Handle paste event
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        whileFocus={{ scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    />
                                ))}
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {isLoading ? "Verifying..." : "Verify Email"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
