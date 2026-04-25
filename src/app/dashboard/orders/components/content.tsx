import {
  ShoppingBag,
  Clock,
  Loader,
  CheckCircle,
  XCircle,
  Calendar,
  ChevronDown,
  Download,
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import DashboardHeader from "../../components/header";

const kpiCards = [
  { label: "Total Orders", value: "1,248", change: "+8%", positive: true, iconBg: "bg-sky-50", iconColor: "text-sky-600", icon: <ShoppingBag className="text-base" /> },
  { label: "Pending", value: "12", change: "+3", positive: false, iconBg: "bg-amber-50", iconColor: "text-amber-600", icon: <Clock className="text-base" /> },
  { label: "Processing", value: "28", change: "+5", positive: true, iconBg: "bg-violet-50", iconColor: "text-violet-600", icon: <Loader className="text-base" /> },
  { label: "Delivered", value: "1,142", change: "+42", positive: true, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", icon: <CheckCircle className="text-base" /> },
  { label: "Cancelled", value: "18", change: "+2", positive: false, iconBg: "bg-red-50", iconColor: "text-red-500", icon: <XCircle className="text-base" /> },
];

const statusTabs = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const statusColors: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-600",
  Processing: "bg-sky-50 text-sky-600",
  Shipped: "bg-violet-50 text-violet-600",
  Delivered: "bg-emerald-50 text-emerald-600",
  Cancelled: "bg-red-50 text-red-500",
};

const orders = [
  { id: "#LS-4821", customer: "Andi Rahmat", email: "andi.rahmat@mail.com", items: "3 items", total: "Rp 578.000", payment: "Credit Card", status: "Pending", date: "24 Jun" },
  { id: "#LS-4820", customer: "Dian Saputra", email: "dian.s@gmail.com", items: "1 item", total: "Rp 289.000", payment: "Bank Transfer", status: "Processing", date: "24 Jun" },
  { id: "#LS-4819", customer: "Fajar Nugroho", email: "fajar.n@outlook.com", items: "5 items", total: "Rp 849.000", payment: "E-Wallet", status: "Shipped", date: "23 Jun" },
  { id: "#LS-4818", customer: "Rina Kartika", email: "rina.k@yahoo.com", items: "2 items", total: "Rp 459.000", payment: "Credit Card", status: "Delivered", date: "22 Jun" },
  { id: "#LS-4817", customer: "Budi Santoso", email: "budi.s@mail.com", items: "1 item", total: "Rp 199.000", payment: "Bank Transfer", status: "Cancelled", date: "21 Jun" },
  { id: "#LS-4816", customer: "Mega Permata", email: "mega.p@gmail.com", items: "4 items", total: "Rp 738.000", payment: "Credit Card", status: "Delivered", date: "20 Jun" },
  { id: "#LS-4815", customer: "Wahyu Pratama", email: "wahyu.p@mail.com", items: "2 items", total: "Rp 329.000", payment: "E-Wallet", status: "Pending", date: "20 Jun" },
  { id: "#LS-4814", customer: "Sari Dewi", email: "sari.d@gmail.com", items: "6 items", total: "Rp 1.247.000", payment: "Bank Transfer", status: "Processing", date: "19 Jun" },
  { id: "#LS-4813", customer: "Hendra Wijaya", email: "hendra.w@outlook.com", items: "1 item", total: "Rp 459.000", payment: "Credit Card", status: "Shipped", date: "18 Jun" },
  { id: "#LS-4812", customer: "Nisa Amalia", email: "nisa.a@mail.com", items: "3 items", total: "Rp 687.000", payment: "E-Wallet", status: "Delivered", date: "17 Jun" },
  { id: "#LS-4811", customer: "Rizki Aditya", email: "rizki.a@gmail.com", items: "2 items", total: "Rp 518.000", payment: "Bank Transfer", status: "Pending", date: "16 Jun" },
  { id: "#LS-4810", customer: "Putri Handayani", email: "putri.h@yahoo.com", items: "1 item", total: "Rp 289.000", payment: "E-Wallet", status: "Delivered", date: "15 Jun" },
  { id: "#LS-4809", customer: "Agus Hermawan", email: "agus.h@mail.com", items: "3 items", total: "Rp 927.000", payment: "Credit Card", status: "Cancelled", date: "14 Jun" },
  { id: "#LS-4808", customer: "Lina Marlina", email: "lina.m@gmail.com", items: "2 items", total: "Rp 618.000", payment: "Bank Transfer", status: "Shipped", date: "13 Jun" },
  { id: "#LS-4807", customer: "Tommy Setiawan", email: "tommy.s@outlook.com", items: "1 item", total: "Rp 389.000", payment: "E-Wallet", status: "Delivered", date: "12 Jun" },
];

export default function OrdersContent() {
  return (
    <>
      <DashboardHeader />
      <main className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Orders Management</h1>
            <p className="mt-0.5 text-[12px] text-gray-400">
              Track and manage all customer orders.
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

        <div className="mb-6 grid grid-cols-5 gap-4">
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

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-3">
            <div className="flex items-center gap-1">
              {statusTabs.map((tab, i) => (
                <button
                  key={tab}
                  className={`rounded-md px-3 py-1.5 text-[11px] font-semibold transition-colors ${i === 0 ? "bg-black text-white" : "text-gray-500 hover:bg-gray-50"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-[12px] transition-colors focus:border-gray-400 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-2">
            <select className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[11px] text-gray-500 focus:border-gray-400 focus:outline-none">
              <option>Bulk Actions</option>
              <option>Update Status</option>
              <option>Delete Selected</option>
              <option>Export Selected</option>
            </select>
            <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-[11px] font-medium text-gray-500 transition-colors hover:bg-gray-50">
              Apply
            </button>
            <span className="text-[10px] text-gray-400">0 selected</span>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="h-3.5 w-3.5 rounded accent-black" />
                </th>
                <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Order ID</th>
                <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Customer</th>
                <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Items</th>
                <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Total</th>
                <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Payment</th>
                <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Status</th>
                <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Date</th>
                <th className="w-[80px] pr-4 py-3 text-right text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${order.status === "Cancelled" ? "bg-red-50/20" : ""}`}
                >
                  <td className="px-4 py-2.5">
                    <input type="checkbox" className="h-3.5 w-3.5 rounded accent-black" />
                  </td>
                  <td className="py-2.5">
                    <span className={`font-mono text-[12px] font-semibold ${order.status === "Cancelled" ? "text-gray-400" : ""}`}>
                      {order.id}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <p className={`text-[12.5px] font-semibold ${order.status === "Cancelled" ? "text-gray-400" : ""}`}>
                      {order.customer}
                    </p>
                    <p className="mt-0.5 text-[10px] text-gray-400">{order.email}</p>
                  </td>
                  <td className={`py-2.5 text-[12px] ${order.status === "Cancelled" ? "text-gray-400" : ""}`}>
                    {order.items}
                  </td>
                  <td className={`py-2.5 text-[12px] font-semibold ${order.status === "Cancelled" ? "text-gray-400" : ""}`}>
                    {order.total}
                  </td>
                  <td className={`py-2.5 text-[12px] ${order.status === "Cancelled" ? "text-gray-400" : ""}`}>
                    {order.payment}
                  </td>
                  <td className="py-2.5">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className={`py-2.5 text-[12px] ${order.status === "Cancelled" ? "text-gray-400" : "text-gray-500"}`}>
                    {order.date}
                  </td>
                  <td className="py-2.5 pr-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black">
                        <Eye className="text-[13px]" />
                      </button>
                      <button className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black">
                        <Pencil className="text-[13px]" />
                      </button>
                      <button className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500">
                        <Trash2 className="text-[13px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-400">Rows per page:</span>
              <select className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium focus:border-gray-400 focus:outline-none">
                <option>15</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center gap-1">
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black">
                <ChevronLeft className="text-sm" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-[11px] font-bold text-white">
                1
              </button>
              {[2, 3, 4].map((n) => (
                <button
                  key={n}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-[11px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-black"
                >
                  {n}
                </button>
              ))}
              <span className="px-0.5 text-[11px] text-gray-300">...</span>
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-[11px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-black">
                6
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black">
                <ChevronRight className="text-sm" />
              </button>
              <div className="ml-3 flex items-center gap-1.5 border-l border-gray-200 pl-3">
                <span className="text-[11px] text-gray-400">Go to:</span>
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={6}
                  className="w-12 rounded border border-gray-200 px-2 py-1 text-center text-[11px] font-medium focus:border-gray-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
