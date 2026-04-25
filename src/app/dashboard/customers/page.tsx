import DashboardSidebar from "../components/sidebar";
import DashboardHeader from "../components/header";
import CustomersContent from "./components/content";

export default function CustomersPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <CustomersContent />
      </div>
    </div>
  );
}
