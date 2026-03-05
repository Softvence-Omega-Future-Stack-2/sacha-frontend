import { useState } from "react";
import { Outlet } from "react-router-dom";
import TenantSidebar from "../components/TenantSidebar";

const TenantDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TenantSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className={`flex-1 transition-all duration-300 ${isCollapsed ? "ml-[80px]" : "ml-64"
          } hidden lg:block`}
      >
        <div className="pt-16 p-6">
          <Outlet />
        </div>
      </div>

      {/* Mobile Content Area (no fixed margin) */}
      <div className="flex-1 lg:hidden pt-16 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default TenantDashboard;