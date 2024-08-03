// app/linkedIn-messaging/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LinkedInMessagingPage() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [selectedContact, setSelectedContact] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token");
        if (token) {
            setAccessToken(token);
            fetchContacts(token);
        }
    }, []);

    const fetchContacts = async (token: string) => {
        try {
            const response = await fetch(
                `/api/linkedin/connections?accessToken=${token}`
            );
            const data = await response.json();
            if (response.ok) {
                setContacts(data.connections);
            } else {
                throw new Error(data.error);
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleLinkedInLogin = () => {
        router.push("/api/auth/linkedin");
    };

    const handleSendMessage = async () => {
        if (!accessToken || !selectedContact) {
            return setError(
                "Please select a contact and ensure you are authenticated."
            );
        }

        try {
            const response = await fetch("/api/linkedin/sendMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    accessToken,
                    recipientUrn: selectedContact,
                    message,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send message");
            }

            setSuccess(true);
            setError("");
            setMessage("");
        } catch (error: any) {
            setSuccess(false);
            setError(error.message);
        }
    };

    return (
        <motion.div
            className="p-4 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="
                mb-4
                flex
                items-center
                justify-between
                border-b
                border-gray-300
                pb-4
            ">
                <h1 className="text-2xl font-semibold">LinkedIn Messaging</h1>
                <p className="text-gray-500">
                    Send messages to your LinkedIn connections
                </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full flex flex-col md:flex-row h-[80vh]">
                {/* Sidebar */}
                <motion.div
                    className="w-full md:w-1/4 bg-white border-r border-gray-300"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Sidebar Header */}
                    <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                        <h1 className="text-xl font-semibold">Contacts</h1>
                        <div className="relative">
                            <button id="menuButton" className="focus:outline-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-gray-100"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                                </svg>
                            </button>
                            {/* Menu Dropdown */}
                            <div
                                id="menuDropdown"
                                className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden"
                            >
                                <ul className="py-2 px-3">
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                                        >
                                            Option 1
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-800 hover:text-gray-400"
                                        >
                                            Option 2
                                        </a>
                                    </li>
                                    {/* Add more menu options here */}
                                </ul>
                            </div>
                        </div>
                    </header>

                    {/* Contact List */}
                    <div className="overflow-y-auto h-full p-3">
                        {contacts.length > 0 ? (
                            contacts.map((contact: any) => (
                                <div
                                    key={contact.id}
                                    className={`flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md ${selectedContact === contact.id ? "bg-gray-200" : ""
                                        }`}
                                    onClick={() => setSelectedContact(contact.id)}
                                >
                                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                        <img
                                            src={`https://placehold.co/200x/${Math.floor(
                                                Math.random() * 16777215
                                            ).toString(16)}/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato`}
                                            alt="User Avatar"
                                            className="w-12 h-12 rounded-full"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold">
                                            {contact.localizedFirstName} {contact.localizedLastName}
                                        </h2>
                                        <p className="text-gray-600">Click to chat</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                                <p className="text-center text-gray-500 mb-4">
                                    No contacts available. Please connect to LinkedIn.
                                </p>
                                <button
                                    onClick={handleLinkedInLogin}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Connect to LinkedIn
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Main Chat Area */}
                <motion.div
                    className={`flex-1 flex flex-col ${accessToken ? "" : "blur-sm opacity-50 pointer-events-none"
                        }`}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Chat Header */}
                    <header className="bg-white p-4 text-gray-700 border-b border-gray-300">
                        {selectedContact ? (
                            <h1 className="text-xl font-semibold">
                                Chat with{" "}
                                {
                                    contacts.find(
                                        (contact: any) => contact.id === selectedContact
                                    )?.localizedFirstName
                                }
                            </h1>
                        ) : (
                            <h1 className="text-xl font-semibold">Select a contact</h1>
                        )}
                    </header>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {/* Example Messages */}
                        {selectedContact && (
                            <>
                                <div className="flex mb-4 cursor-pointer">
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                        <img
                                            src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                            alt="User Avatar"
                                            className="w-8 h-8 rounded-full"
                                        />
                                    </div>
                                    <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                        <p className="text-gray-700">Hey, how's it going?</p>
                                    </div>
                                </div>

                                <div className="flex justify-end mb-4 cursor-pointer">
                                    <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                                        <p>Hi! I'm good, how about you?</p>
                                    </div>
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                        <img
                                            src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                            alt="My Avatar"
                                            className="w-8 h-8 rounded-full"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Chat Input */}
                    <footer className="bg-white border-t border-gray-300 p-4">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={!selectedContact}
                            />
                            <button
                                className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
                                onClick={handleSendMessage}
                                disabled={!selectedContact || !message.trim()}
                            >
                                Send
                            </button>
                        </div>
                    </footer>
                </motion.div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && (
                <p className="text-green-500 mt-4">Message sent successfully!</p>
            )}
        </motion.div>
    );
}
