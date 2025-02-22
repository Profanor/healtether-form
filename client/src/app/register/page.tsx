"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { registerUser } from "@/app/api/auth";
import { loginSuccess } from "@/app/redux/slices/authSlice";

export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await registerUser(formData.name, formData.email, formData.password);
      console.log("Register Response:", data);

      dispatch(loginSuccess({ token: data.token, user: data.user }));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Signup</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 shadow-md rounded-lg">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mb-3 text-black" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded mb-3 text-black" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded mb-3 text-black" required />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}
