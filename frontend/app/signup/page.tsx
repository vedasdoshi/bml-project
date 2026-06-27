"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. Import the router hook

export default function SignUp() {
  const router = useRouter(); // 2. Initialize the router
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Signing up with:", { businessName, email, password });

    try {
      // 3. Save to localStorage under the exact key your dashboard reads
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const newUser = {
        name: businessName, // Matches the key extraction rule on your workspace page
        email: email,
        createdAt: new Date().toISOString()
      };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // 4. Send them directly to the dashboard
      router.push("/dashboard");

    } catch (error) {
      console.error("Navigation setup failure:", error);
      // Fallback redirect if localStorage blocks happen
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#eaddca] p-6 text-[#2b241a] antialiased">
      <div className="w-full max-w-md rounded-3xl border border-[#2b241a]/10 bg-[#e3d5c1] p-8 shadow-sm">
        
        {/* Header/Logo Section */}
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#526e3d] font-serif font-black text-white text-lg">
            TP
          </div>
          <h2 className="font-serif text-3xl font-black tracking-tight mt-2">
            Create your account
          </h2>
          <p className="font-sans text-sm text-[#6e6353]">
            Start turning your customer reviews into revenue.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans text-sm">
          
          {/* Business Name Field */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#5c5346]">Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g., Joe" 
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="rounded-xl border border-[#2b241a]/10 bg-[#f5eade] px-4 py-3 outline-none focus:border-[#4c6a37] transition-colors text-[#2b241a]"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#5c5346]">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="name@business.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-[#2b241a]/10 bg-[#f5eade] px-4 py-3 outline-none focus:border-[#4c6a37] transition-colors text-[#2b241a]"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-[#5c5346]">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-[#2b241a]/10 bg-[#f5eade] px-4 py-3 outline-none focus:border-[#4c6a37] transition-colors text-[#2b241a]"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="mt-2 w-full rounded-full bg-[#4c6a37] py-3.5 font-bold text-white hover:bg-[#3d552c] transition-colors shadow-sm"
          >
            Get Started &rarr;
          </button>
        </form>

        {/* Dynamic Route Back to Login */}
        <p className="mt-6 text-center font-sans text-xs text-[#6e6353]">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[#4c6a37] hover:underline">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}