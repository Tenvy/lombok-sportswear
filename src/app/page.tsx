import Navbar from "@/src/components/Navbar";
import HeroSection from "./components/HeroSection";
import Categories from "./components/Categories";
import ProductDisplay from "./components/ProductDisplay";
import Footer from "@/src/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />
      <HeroSection />
      <Categories />
      <ProductDisplay />
      <Footer />
    </div>
  );
}
