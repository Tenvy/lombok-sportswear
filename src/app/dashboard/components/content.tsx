import Image from "next/image";
import {
  Calendar,
  ChevronDown,
  Download,
  Banknote,
  ShoppingBag,
  Users,
  Target,
  Receipt,
  Eye,
  TrendingUp,
  Wallet,
} from "lucide-react";
import DashboardHeader from "./header";
import DashboardSidebar from "./sidebar";

interface KpiCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
}

const kpiCards: KpiCard[] = [
  {
    label: "Revenue",
    value: "Rp 125.4M",
    change: "+12%",
    positive: true,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    icon: <Banknote className="text-base" />,
  },
  {
    label: "Orders",
    value: "1,248",
    change: "+8%",
    positive: true,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    icon: <ShoppingBag className="text-base" />,
  },
  {
    label: "Customers",
    value: "3,542",
    change: "+15%",
    positive: true,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    icon: <Users className="text-base" />,
  },
  {
    label: "Conversion",
    value: "3.4%",
    change: "-2%",
    positive: false,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    icon: <Target className="text-base" />,
  },
  {
    label: "Avg. Order",
    value: "Rp 312K",
    change: "+5%",
    positive: true,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    icon: <Receipt className="text-base" />,
  },
  {
    label: "Visitors",
    value: "28.6K",
    change: "+22%",
    positive: true,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
    icon: <Eye className="text-base" />,
  },
];

const topProducts = [
  { name: "Lombok Classic Polo", sold: 342, width: "100%", bg: "bg-black" },
  { name: "Sport Zip Jacket", sold: 289, width: "84%", bg: "bg-gray-700" },
  { name: "Essential Hoodie", sold: 245, width: "72%", bg: "bg-gray-500" },
  { name: "Wide Leg Trousers", sold: 198, width: "58%", bg: "bg-gray-400" },
  { name: "Training Crew Tee", sold: 176, width: "51%", bg: "bg-gray-300" },
];

const recentOrders = [
  { id: "#LS-4821", customer: "Andi Rahmat", total: "Rp 578K", status: "Paid", statusColor: "bg-emerald-50 text-emerald-600", date: "12 Jun" },
  { id: "#LS-4820", customer: "Dian Saputra", total: "Rp 289K", status: "Paid", statusColor: "bg-emerald-50 text-emerald-600", date: "12 Jun" },
  { id: "#LS-4819", customer: "Fajar Nugroho", total: "Rp 849K", status: "Pending", statusColor: "bg-amber-50 text-amber-600", date: "11 Jun" },
  { id: "#LS-4818", customer: "Rina Kartika", total: "Rp 459K", status: "Paid", statusColor: "bg-emerald-50 text-emerald-600", date: "11 Jun" },
  { id: "#LS-4817", customer: "Budi Santoso", total: "Rp 199K", status: "Cancelled", statusColor: "bg-red-50 text-red-500", date: "10 Jun" },
  { id: "#LS-4816", customer: "Mega Permata", total: "Rp 738K", status: "Paid", statusColor: "bg-emerald-50 text-emerald-600", date: "10 Jun" },
  { id: "#LS-4815", customer: "Wahyu Pratama", total: "Rp 329K", status: "Pending", statusColor: "bg-amber-50 text-amber-600", date: "9 Jun" },
];

const popularProducts = [
  { name: "Lombok Classic Polo", sold: "342 sold · Rp 98.8M", status: "In Stock", statusColor: "bg-emerald-50 text-emerald-600", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=80&h=80&fit=crop" },
  { name: "Sport Zip Jacket", sold: "289 sold · Rp 132.6M", status: "In Stock", statusColor: "bg-emerald-50 text-emerald-600", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80&h=80&fit=crop" },
  { name: "Essential Hoodie Black", sold: "245 sold · Rp 95.3M", status: "Low Stock", statusColor: "bg-amber-50 text-amber-600", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=80&h=80&fit=crop" },
  { name: "Wide Leg Trousers", sold: "198 sold · Rp 69.1M", status: "In Stock", statusColor: "bg-emerald-50 text-emerald-600", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=80&h=80&fit=crop" },
  { name: "Training Crew Tee", sold: "176 sold · Rp 35.0M", status: "Out of Stock", statusColor: "bg-red-50 text-red-500", image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=80&h=80&fit=crop" },
];

export default function DashboardContent() {
  return (
    <>
    <DashboardSidebar />
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardHeader />
      <main className="flex-1 overflow-y-auto px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="mt-0.5 text-[12px] text-gray-400">
            Welcome back. Here&apos;s your business summary for{" "}
            <span className="font-medium text-gray-600">June 2025</span>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3.5 py-2 text-[11px] font-semibold transition-colors hover:bg-gray-50">
            <Calendar className="text-sm" />
            Last 30 Days
            <ChevronDown className="text-xs" />
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-gray-800">
            <Download className="text-sm" />
            Export
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4 xl:grid-cols-6">
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${kpi.iconBg} ${kpi.iconColor}`}>
                {kpi.icon}
              </div>
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${kpi.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                {kpi.change}
              </span>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-gray-400">{kpi.label}</p>
            <p className="mt-0.5 text-lg font-bold tracking-tight">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-12 gap-4">
        <div className="col-span-8 rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-[13px] font-bold">Revenue Trend</h3>
              <p className="mt-0.5 text-[11px] text-gray-400">Last 7 days performance</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="rounded-md bg-black px-2.5 py-1 text-[10px] font-semibold text-white">7D</button>
              <button className="rounded-md px-2.5 py-1 text-[10px] font-semibold text-gray-400 transition-colors hover:bg-gray-50">30D</button>
              <button className="rounded-md px-2.5 py-1 text-[10px] font-semibold text-gray-400 transition-colors hover:bg-gray-50">90D</button>
            </div>
          </div>
          <div className="relative h-[200px]">
            <div className="absolute left-0 top-0 flex h-full w-10 flex-col justify-between text-[9px] font-medium text-gray-400">
              <span>25M</span><span>20M</span><span>15M</span><span>10M</span><span>5M</span><span>0</span>
            </div>
            <div className="ml-12 relative h-full">
              <div className="absolute inset-0 flex flex-col justify-between">
                <div className="border-b border-gray-100" />
                <div className="border-b border-gray-100" />
                <div className="border-b border-gray-100" />
                <div className="border-b border-gray-100" />
                <div className="border-b border-gray-100" />
                <div className="border-b border-gray-200" />
              </div>
              <svg viewBox="0 0 600 200" className="relative z-10 h-full w-full" preserveAspectRatio="none">
                <path d="M0,140 L100,100 L200,120 L300,60 L400,80 L500,40 L600,20 L600,200 L0,200 Z" fill="url(#areaGradient)" opacity="0.15" />
                <path d="M0,140 L100,100 L200,120 L300,60 L400,80 L500,40 L600,20" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="0" cy="140" r="4" fill="#000" />
                <circle cx="100" cy="100" r="4" fill="#000" />
                <circle cx="200" cy="120" r="4" fill="#000" />
                <circle cx="300" cy="60" r="4" fill="#000" />
                <circle cx="400" cy="80" r="4" fill="#000" />
                <circle cx="500" cy="40" r="4" fill="#000" />
                <circle cx="600" cy="20" r="5" fill="#000" stroke="#fff" strokeWidth="2" />
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#000" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="mt-2 flex justify-between text-[9px] font-medium text-gray-400">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span className="font-semibold text-black">Sun</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-[13px] font-bold">Payment Methods</h3>
          <p className="mb-5 mt-0.5 text-[11px] text-gray-400">Distribution this month</p>
          <div className="mb-5 flex items-center justify-center">
            <svg width="150" height="150" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="55" fill="none" stroke="#111" strokeWidth="22" strokeDasharray="155.5 190" strokeDashoffset="0" transform="rotate(-90 75 75)" />
              <circle cx="75" cy="75" r="55" fill="none" stroke="#9ca3af" strokeWidth="22" strokeDasharray="121 224.5" strokeDashoffset="-155.5" transform="rotate(-90 75 75)" />
              <circle cx="75" cy="75" r="55" fill="none" stroke="#e5e7eb" strokeWidth="22" strokeDasharray="69.1 276.4" strokeDashoffset="-276.5" transform="rotate(-90 75 75)" />
              <text x="75" y="72" textAnchor="middle" className="text-[22px] font-bold" fill="#000">1,248</text>
              <text x="75" y="88" textAnchor="middle" className="text-[9px] font-medium" fill="#9ca3af">TOTAL</text>
            </svg>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-black" /><span className="text-[11px]">Credit Card</span></div>
              <span className="text-[11px] font-semibold">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-gray-400" /><span className="text-[11px]">Bank Transfer</span></div>
              <span className="text-[11px] font-semibold">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-gray-200" /><span className="text-[11px]">E-Wallet</span></div>
              <span className="text-[11px] font-semibold">20%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-12 gap-4">
        <div className="col-span-5 rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-[13px] font-bold">Top 5 Products</h3>
          <p className="mb-5 mt-0.5 text-[11px] text-gray-400">By sales volume this month</p>
          <div className="space-y-3.5">
            {topProducts.map((product) => (
              <div key={product.name}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="max-w-[160px] truncate text-[11px] font-medium">{product.name}</span>
                  <span className="text-[11px] font-bold">{product.sold}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div className={`h-full rounded-full ${product.bg}`} style={{ width: product.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-7 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                <TrendingUp className="text-sm text-emerald-600" />
              </div>
              <h3 className="text-[13px] font-bold">Income Statement</h3>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[11px] text-gray-500">Revenue</span>
                <span className="text-[11px] font-semibold">Rp 125.4M</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[11px] text-gray-500">Cost of Goods Sold</span>
                <span className="text-[11px] font-semibold text-red-500">- Rp 62.1M</span>
              </div>
              <div className="my-1 border-t border-gray-100" />
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[11px] font-semibold">Gross Profit</span>
                <span className="text-[11px] font-bold">Rp 63.3M</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[11px] text-gray-500">Operating Expenses</span>
                <span className="text-[11px] font-semibold text-red-500">- Rp 28.7M</span>
              </div>
              <div className="my-1 border-t border-gray-200" />
              <div className="-mx-2 flex items-center justify-between rounded-lg bg-gray-50 px-2 py-1.5">
                <span className="text-[11px] font-bold">Net Income</span>
                <span className="text-[13px] font-bold text-emerald-600">Rp 34.6M</span>
              </div>
              <p className="mt-1 text-[9px] text-gray-400">Margin: 27.6%</p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50">
                <Wallet className="text-sm text-sky-600" />
              </div>
              <h3 className="text-[13px] font-bold">Cashflow</h3>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[11px] text-gray-500">Opening Balance</span>
                <span className="text-[11px] font-semibold">Rp 85.2M</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[11px] text-gray-500">Total Inflows</span>
                <span className="text-[11px] font-semibold text-emerald-600">+ Rp 132.8M</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[11px] text-gray-500">Total Outflows</span>
                <span className="text-[11px] font-semibold text-red-500">- Rp 98.4M</span>
              </div>
              <div className="my-1 border-t border-gray-200" />
              <div className="-mx-2 flex items-center justify-between rounded-lg bg-gray-50 px-2 py-1.5">
                <span className="text-[11px] font-bold">Closing Balance</span>
                <span className="text-[13px] font-bold">Rp 119.6M</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-[57.5%] rounded-full bg-emerald-500" />
                </div>
                <span className="text-[9px] text-gray-400">57.5% inflow ratio</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-emerald-50 p-2 text-center">
                  <p className="text-[9px] font-medium text-emerald-600">INFLOW</p>
                  <p className="text-[11px] font-bold text-emerald-700">+Rp 132.8M</p>
                </div>
                <div className="rounded-lg bg-red-50 p-2 text-center">
                  <p className="text-[9px] font-medium text-red-500">OUTFLOW</p>
                  <p className="text-[11px] font-bold text-red-600">-Rp 98.4M</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-12 gap-4">
        <div className="col-span-7 overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <h3 className="text-[13px] font-bold">Recent Orders</h3>
              <p className="mt-0.5 text-[10px] text-gray-400">Latest transactions</p>
            </div>
            <a id="view-all-orders" href="#" className="text-[11px] font-semibold hover:underline">View All &rarr;</a>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400">Order ID</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400">Customer</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400">Total</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400">Status</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-50 transition-colors hover:bg-gray-50">
                  <td className="px-5 py-3 font-mono text-[11px] font-semibold">{order.id}</td>
                  <td className="px-3 py-3 text-[11px]">{order.customer}</td>
                  <td className="px-3 py-3 text-[11px] font-semibold">{order.total}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${order.statusColor}`}>{order.status}</span>
                  </td>
                  <td className="px-3 py-3 text-[11px] text-gray-400">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-span-5 overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <h3 className="text-[13px] font-bold">Popular Products</h3>
              <p className="mt-0.5 text-[10px] text-gray-400">Stock &amp; sales overview</p>
            </div>
            <a id="view-all-products" href="#" className="text-[11px] font-semibold hover:underline">View All &rarr;</a>
          </div>
          <div className="divide-y divide-gray-50">
            {popularProducts.map((product) => (
              <div key={product.name} className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-gray-50">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <Image src={product.image} alt={product.name} width={40} height={40} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold">{product.name}</p>
                  <p className="text-[10px] text-gray-400">{product.sold}</p>
                </div>
                <span className={`flex-shrink-0 rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${product.statusColor}`}>{product.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
    </div>
    </>
  );
}
