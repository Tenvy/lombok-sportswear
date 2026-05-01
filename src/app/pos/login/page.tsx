"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Key, User as UserIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CashierLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username,
        pin,
        role: "KASIR",
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid Username or PIN");
      } else {
        router.push("/pos");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-black text-white">
      {/* Left - Brand */}
      <div className="hidden lg:flex lg:w-1/2 items-end p-12 bg-zinc-900">
        <div className="space-y-4">
          <h1 className="text-4xl font-black uppercase tracking-wider">
            Lombok POS
          </h1>
          <p className="text-sm text-gray-500 max-w-xs">
            Point of sale terminal for processing transactions and managing daily sales operations.
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:hidden">
            <h1 className="text-2xl font-black uppercase tracking-wider">Lombok POS</h1>
            <p className="mt-1 text-sm text-gray-500">Cashier Terminal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="border border-red-500/20 bg-red-500/10 p-3 text-center text-xs font-semibold text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Cashier ID
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm font-medium focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Secret PIN
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
                <input
                  type="password"
                  required
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm font-medium tracking-[0.3em] focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors"
                  placeholder="000000"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
            >
              {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Access Terminal"}
            </Button>
          </form>

          <p className="text-center text-[10px] text-gray-600 font-medium">
            Authorized Personnel Only
          </p>
        </div>
      </div>
    </main>
  );
}
