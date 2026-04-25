import DashboardSidebar from "../components/sidebar";
import DashboardHeader from "../components/header";
import ProductsContent from "./components/content";

export default function ProductsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto">
          <ProductsContent />
        </div>
      </div>
    </div>
  );
}
