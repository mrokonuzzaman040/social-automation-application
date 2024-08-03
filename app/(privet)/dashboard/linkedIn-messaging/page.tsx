// app/linkedIn-messaging/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LinkedInMessagingPage() {
    const [recipientUrn, setRecipientUrn] = useState("");
    const [message, setMessage] = useState("");
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleLinkedInLogin = () => {
        // Redirect to LinkedIn auth endpoint
        router.push("/api/auth/linkedin");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!accessToken) {
            return setError("Please authenticate with LinkedIn first.");
        }

        try {
            const response = await fetch("/api/linkedin/sendMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ accessToken, recipientUrn, message }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send message");
            }

            setSuccess(true);
            setError("");
        } catch (error: any) {
            setSuccess(false);
            setError(error.message);
        }
    };

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4">LinkedIn Auto DM</h1>
                {!accessToken && (
                    <button
                        onClick={handleLinkedInLogin}
                        className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Authenticate with LinkedIn
                    </button>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="recipientUrn" className="block text-gray-700 mb-1">
                            Recipient URN
                        </label>
                        <input
                            type="text"
                            id="recipientUrn"
                            value={recipientUrn}
                            onChange={(e) => setRecipientUrn(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-gray-700 mb-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Send Message
                    </button>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {success && (
                    <p className="text-green-500 mt-4">Message sent successfully!</p>
                )}
            </div>
        </motion.div>
    );
}
