import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import ProductsHeader from "./components/header";
import ProductsGrid from "./components/grid";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />
      <ProductsHeader />
      <ProductsGrid />
      <Footer />
    </div>
  );
}
