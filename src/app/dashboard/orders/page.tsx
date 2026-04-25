import DashboardSidebar from "../components/sidebar";
import DashboardHeader from "../components/header";
import OrdersContent from "./components/content";

export default function OrdersPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <OrdersContent />
      </div>
    </div>
  );
}
