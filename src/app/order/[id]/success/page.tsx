import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="min-h-screen bg-white font-sans text-black">
      <Navbar />
      <div className="mx-auto max-w-[1400px] px-4 py-20 lg:px-8 text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-black text-white">
          <CheckCircle2 className="size-10" />
        </div>
        <h1 className="text-3xl font-black uppercase italic tracking-tighter">
          Pembayaran Berhasil!
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Terima kasih telah berbelanja. Pesanan Anda sedang diproses.
        </p>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-400">
          Order ID
        </p>
        <p className="mt-1 text-lg font-black">{(await params).id}</p>
        <Link
          href="/"
          className="mt-8 inline-block bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-gray-800 transition-all"
        >
          Kembali ke Beranda
        </Link>
      </div>
      <Footer />
    </main>
  );
}
