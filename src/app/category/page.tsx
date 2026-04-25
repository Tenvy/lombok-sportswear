import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import CollectionsHeader from "./components/header";
import CollectionsGrid from "./components/grid";

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />
      <CollectionsHeader />
      <CollectionsGrid />
      <Footer />
    </div>
  );
}
