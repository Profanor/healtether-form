"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./hooks/useAuth";

export default function Home() {
  const router = useRouter();
  const { token } = useAuth(); 
  const isAuthenticated = !!token;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Healtether Forms</h1>
      <p className="mb-6 text-gray-600">A fullstack app using Next.js and Redux</p>
      <div className="flex gap-4">
        {!isAuthenticated && (
          <>
            <button onClick={() => router.push("/register")} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Register
            </button>
            <button onClick={() => router.push("/login")} className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Login
            </button>
          </>
        )}
        {isAuthenticated && (
          <button onClick={() => router.push("/dashboard")} className="bg-green-500 text-white px-4 py-2 rounded-md">
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
}
