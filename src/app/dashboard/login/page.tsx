"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, User as UserIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username,
        password,
        role: "ADMIN",
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid Admin Credentials");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Left - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1000&h=1200&fit=crop"
          alt="Sportswear"
          fill
          className="object-cover"
        />
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
              Management Portal
            </p>
            <h1 className="text-2xl font-black uppercase tracking-wider">
              Admin Login
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="border border-red-100 bg-red-50 p-3 text-center text-xs font-semibold text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                Administrator ID
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/5 transition-colors"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/5 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-black text-white font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Authenticate"}
            </Button>
          </form>

          <div className="text-center">
            <button
              onClick={() => router.push("/")}
              className="text-xs font-semibold text-gray-400 hover:text-black transition-colors"
            >
              &larr; Return to Site
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
