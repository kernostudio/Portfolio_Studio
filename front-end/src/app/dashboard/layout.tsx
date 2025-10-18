import Sidebar from "@/components/modules/dashboard/Sidebar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      {" "}
      <div className="flex h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-1 flex flex-col  ">
          <main className="p-6 overflow-auto border-2 border-r-0 border-b-0 flex-1">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
