"use client";

import { Clock, Search, Bell, Home, User, LogOut, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function POSHeader({ 
  searchQuery, 
  setSearchQuery 
}: { 
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}) {
  const [time, setTime] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-8">
      <div className="flex flex-1 items-center gap-6">
        {session?.user?.role === "ADMIN" && (
          <Link href="/dashboard">
            <Button variant="outline" size="icon" className="h-9 w-9" title="Go to Dashboard">
              <Home className="size-4" />
            </Button>
          </Link>
        )}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-md border bg-muted/50 pl-10 pr-4 text-sm transition-all focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 border-r pr-4 text-right sm:flex">
          <div className="flex flex-col items-end">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Cashier On Duty</p>
            <p className="text-xs font-bold">{session?.user?.name || "Active User"}</p>
          </div>
          <div className="ml-2 flex items-center gap-1.5 font-mono text-sm font-bold bg-primary/5 px-2 py-1 rounded border border-primary/10">
            <Clock className="size-3 text-primary" />
            {time}
          </div>
        </div>
        <div className="flex items-center gap-2 relative">
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="size-4" />
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </Button>

            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                  <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-widest">Notifications</h3>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">2 New</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex gap-3">
                        <div className="size-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-red-600">
                          <Clock className="size-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">Low Stock Alert</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Classic Polo Black is down to 5 units. Please restock soon.</p>
                          <p className="text-[9px] text-primary font-bold mt-1">2 mins ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex gap-3">
                        <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                          <ShoppingCart className="size-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">New Online Order</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Order #LS-99281 has been placed via Web Store.</p>
                          <p className="text-[9px] text-primary font-bold mt-1">15 mins ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full p-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-black transition-colors bg-gray-50/50">
                    View All Notifications
                  </button>
                </div>
              </>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 text-destructive hover:bg-destructive/5 hover:text-destructive"
            onClick={() => signOut({ callbackUrl: "/pos/login" })}
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
