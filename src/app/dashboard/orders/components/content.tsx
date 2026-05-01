"use client";

import { useState } from "react";
import {
  Calendar,
  CaretDown,
  DownloadSimple,
} from "@phosphor-icons/react";
import DashboardHeader from "../../components/header";
import OrdersTable from "./table";
import OrdersKpiCards from "./card";
import ExportModal from "./exportModal";

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
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <>
      <ExportModal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
      <DashboardHeader />
      <main className="flex-1 overflow-y-auto px-6 py-5">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">Orders Management</h1>
            <p className="mt-0.5 text-[13px] text-gray-400">
              Track and manage all customer orders.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3.5 py-2 text-[13px] font-semibold transition-colors hover:bg-gray-50">
              <Calendar size={16} />
              Last 30 Days
              <CaretDown size={14} />
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-gray-800"
            >
              <DownloadSimple size={16} />
              Export
            </button>
          </div>
        </div>

        <OrdersKpiCards />

        <OrdersTable orders={orders} />
      </main>
    </>
  );
}
