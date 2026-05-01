"use client";

import {
  ShoppingBag,
  Clock,
  Spinner,
  CheckCircle,
  XCircle,
} from "@phosphor-icons/react";

const kpiCards = [
  { label: "Total Orders", value: "1,248", change: "+8%", positive: true, iconBg: "bg-sky-50", iconColor: "text-sky-600", icon: <ShoppingBag size={20} /> },
  { label: "Pending", value: "12", change: "+3", positive: false, iconBg: "bg-amber-50", iconColor: "text-amber-600", icon: <Clock size={20} /> },
  { label: "Processing", value: "28", change: "+5", positive: true, iconBg: "bg-violet-50", iconColor: "text-violet-600", icon: <Spinner size={20} /> },
  { label: "Delivered", value: "1,142", change: "+42", positive: true, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", icon: <CheckCircle size={20} /> },
  { label: "Cancelled", value: "18", change: "+2", positive: false, iconBg: "bg-red-50", iconColor: "text-red-500", icon: <XCircle size={20} /> },
];

export default function OrdersKpiCards() {
  return (
    <div className="mb-6 grid grid-cols-5 gap-4">
      {kpiCards.map((kpi) => (
        <div key={kpi.label} className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${kpi.iconBg} ${kpi.iconColor}`}>
              {kpi.icon}
            </div>
            <span className={`rounded px-1.5 py-0.5 text-xs font-semibold ${kpi.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
              {kpi.change}
            </span>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-gray-400">{kpi.label}</p>
          <p className="mt-0.5 text-lg font-bold tracking-tight">{kpi.value}</p>
        </div>
      ))}
    </div>
  );
}
