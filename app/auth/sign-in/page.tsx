"use client"; // This directive is crucial to mark this component as a client component

import { signIn, useSession, getProviders, ClientSafeProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function SignInPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [providers, setProviders] = useState<Record<string, ClientSafeProvider>>({});

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res || {});
        };

        fetchProviders();
    }, []);

    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Sign In</h1>
            <div className="flex flex-col items-center">
                {Object.values(providers).map((provider) => (
                    <div key={provider.name} className="mb-4">
                        <button
                            onClick={() => signIn(provider.id)}
                            className="flex items-center justify-center bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700"
                        >
                            {provider.name === "Google" && <FaGoogle className="mr-2" />}
                            {provider.name === "Facebook" && <FaFacebook className="mr-2" />}
                            {provider.name === "LinkedIn" && <FaLinkedin className="mr-2" />}
                            {provider.name === "Instagram" && <FaInstagram className="mr-2" />}
                            Sign in with {provider.name}
                        </button>
                    </div>
                ))}
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
                    const password = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;
                    signIn("credentials", { redirect: false, email, password });
                }}
                className="flex flex-col items-center mt-4"
            >
                <input type="email" name="email" placeholder="Email" className="p-2 border rounded mb-2" />
                <input type="password" name="password" placeholder="Password" className="p-2 border rounded mb-2" />
                <button type="submit" className="bg-green-600 text-white p-2 rounded">
                    Sign in with Email
                </button>
            </form>
        </div>
    );
}
