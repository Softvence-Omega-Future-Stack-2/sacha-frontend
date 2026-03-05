import { useState } from "react";
import { Outlet } from "react-router-dom";
import OwnerSidebar from "../components/OwnerSidebar";

const OwnerDashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OwnerSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className={`flex-1 transition-all duration-300 ${isCollapsed ? "ml-[80px]" : "ml-64"
          } hidden lg:block`}
      >
        <div className="pt-16 p-6">
          <Outlet />
        </div>
      </div>

      {/* Mobile Content Area */}
      <div className="flex-1 lg:hidden pt-16 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default OwnerDashboardLayout;
