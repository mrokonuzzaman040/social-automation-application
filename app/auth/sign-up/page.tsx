"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Signup() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/api/auth/signup", formData);
            router.push("/auth/signin");
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="p-2 border rounded mb-2"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="p-2 border rounded mb-2"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="p-2 border rounded mb-2"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit" className="bg-green-600 text-white p-2 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
