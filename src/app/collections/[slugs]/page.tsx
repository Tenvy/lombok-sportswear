import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import CollectionSlugHeader from "./components/header";
import CollectionContent from "./components/content";

export default function CollectionSlugPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />
      <CollectionSlugHeader
        name="Men"
        productCount={16}
      />
      <CollectionContent />
      <Footer />
    </div>
  );
}
