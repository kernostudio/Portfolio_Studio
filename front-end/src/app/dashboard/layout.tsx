import Sidebar from "@/components/modules/dashboard/Sidebar";
import NavBarDashboard from "@/components/shared/NavBarDashboard";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="flex flex-col bg-white ">
        {/* Top Navbar */}
        <NavBarDashboard />

        {/* Sidebar + Main Content */}
        <div className="flex  overflow-auto">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto border-l-2  border-t-2 ">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
