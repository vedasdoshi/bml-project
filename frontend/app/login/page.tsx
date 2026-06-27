"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. Import the router hook

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // 2. Initialize the router

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the browser from reloading the page

    // 3. For now, since we are handling databases later, we immediately route them!
    router.push("/dashboard"); 
  };

  return (
    <div className="flex min-h-[calc(100vh-73px)] w-full items-center justify-center bg-[#eaddca] p-6 text-[#2b241a] antialiased">
      <div className="w-full max-w-md rounded-3xl border border-[#2b241a]/10 bg-[#e3d5c1] p-8 shadow-sm">
        
        {/* Logo / Title */}
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#526e3d] font-serif font-black text-white text-lg">
            TP
          </div>
          <h2 className="font-serif text-3xl font-black tracking-tight mt-2">Welcome back</h2>
          <p className="font-sans text-sm text-[#6e6353]">Log into your TrendPulse dashboard.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 font-sans text-sm">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#5c5346]">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-[#2b241a]/10 bg-[#f5eade] px-4 py-3 outline-none focus:border-[#526e3d] transition-colors text-[#2b241a]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-[#5c5346]">Password</label>
              <a href="#" className="text-xs text-[#526e3d] hover:underline">Forgot password?</a>
            </div>
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-[#2b241a]/10 bg-[#f5eade] px-4 py-3 outline-none focus:border-[#526e3d] transition-colors text-[#2b241a]"
            />
          </div>

          {/* This button triggers the handleLogin function above */}
          <button 
            type="submit"
            className="mt-2 w-full rounded-full bg-[#526e3d] py-3.5 font-bold text-white hover:bg-[#435b32] transition-colors shadow-sm"
          >
            Log in
          </button>
        </form>

        {/* Route to Sign Up */}
        <p className="mt-6 text-center font-sans text-xs text-[#6e6353]">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold text-[#526e3d] hover:underline">
            Create New Account
          </Link>
        </p>
      </div>
    </div>
  );
} 