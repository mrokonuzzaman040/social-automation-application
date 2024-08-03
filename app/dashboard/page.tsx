"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect to sign-in page if not authenticated
    if (status === "unauthenticated") {
      router.push("/auth/sign-in");
    }
  }, [status, router]);

  if (status === "loading") {
    // Show loading state while session is being fetched
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
        {session && (
          <div>
            <p className="mb-4">
              Hello, <span className="font-semibold">{session.user?.name}</span>!
            </p>
            <p className="mb-4">Email: {session.user?.email}</p>
            {/* Display more user-specific information here */}
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
