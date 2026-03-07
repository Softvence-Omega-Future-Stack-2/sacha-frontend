import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  FileText,
  Package,
  LogOut,
  Menu,
  X,
  Loader2,
  WebhookIcon,
  Heart,
  Search,
  MessageSquare,
  File,
} from "lucide-react";

// --- Assets ---
import logo from "../../../assets/main-logo.png";
import manue2Icon from "../../../assets/dashboard/menu-02.svg";
import Topbar from "../../owner/components/topbar";

// =========================================================
const SidebarItem = ({
  icon: Icon,
  text,
  isActive,
  onClick,
  isCollapsed,
}: {
  icon: React.ElementType;
  text: string;
  isActive: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}) => {
  const baseClasses = `relative flex items-center p-3 text-sm font-medium cursor-pointer transition-all duration-150 rounded-lg whitespace-nowrap overflow-hidden h-11`;
  const activeClasses = "bg-[#EBF5FF] text-[#006CFF] font-semibold";
  const inactiveClasses =
    "text-gray-700 hover:bg-gray-100 hover:text-[#006CFF]";
  const alignmentClass = isCollapsed ? "justify-center" : "space-x-3";

  return (
    <div
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses
        } ${alignmentClass}`}
      onClick={onClick}
      title={isCollapsed ? text : ""}
    >
      {/* active indicator */}
      {isActive && (
        <div className="absolute left-0 top-0 h-full w-1 bg-[#006CFF] rounded-r-lg" />
      )}

      <Icon className="w-5 h-5 shrink-0" />
      {!isCollapsed && <span className="tracking-wide">{text}</span>}
    </div>
  );
};

// =========================================================
// Main SidebarApp Component (NOW ROUTE-BASED)
// =========================================================
interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const TenantSidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Logout Modal States
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    // { id: 1, text: "Overview", icon: FileText, path: "/dashboard-tenant" },
    { id: 1, text: "My Files", icon: FileText, path: "/dashboard-tenant" },
    { id: 2, text: "My Possessions", icon: Package, path: "/dashboard-tenant/possessions" },
    { id: 4, text: "My Search", icon: Search, path: "/dashboard-tenant/search" },
    // { id: 5, text: "Application", icon: Search, path: "/dashboard-tenant/applications" },
    { id: 6, text: "Favorites", icon: Heart, path: "/dashboard-tenant/favorites" },
    { id: 7, text: "Messages", icon: MessageSquare, path: "/dashboard-tenant/messages" },
    { id: 8, text: "All Documents", icon: File, path: "/dashboard-tenant/documents" },
  ];

  const bottomItems = [
    { id: 9, text: "Go to website", icon: WebhookIcon, path: "/" },
    { id: 10, text: "Logout", icon: LogOut, path: "" },
  ];

  const handleTabClick = (path: string, text: string) => {
    setIsMenuOpen(false);

    if (text === "Go to website") {
      navigate("/");
      return;
    }

    if (text === "Logout") {
      setShowLogoutConfirm(true);
      return;
    }

    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setIsLoggingOut(false);
    setShowLogoutConfirm(false);
    window.location.href = "/";
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const isItemActive = (path: string) => {
    if (path === "/dashboard-tenant") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const renderItems = (items: typeof navItems | typeof bottomItems) =>
    items.map((item) => (
      <SidebarItem
        key={item.id}
        icon={item.icon}
        text={item.text}
        isActive={
          item.text === "Logout" || item.text === "Go to website"
            ? false
            : isItemActive(item.path)
        }
        onClick={() => handleTabClick(item.path, item.text)}
        isCollapsed={isCollapsed}
      />
    ));

  const sidebarWidth = isCollapsed ? "80px" : "256px";
  const sidebarPadding = isCollapsed ? "lg:px-2" : "lg:p-0 lg:px-2";
  const buttonPositionClass = isMenuOpen ? "right-4" : "left-4";
  const buttonBaseClass = `lg:hidden fixed top-3 p-2 z-2 z-50 bg-white border rounded shadow transition-all duration-300`;

  return (
    <div className="flex bg-white">
      <Topbar
        sidebarCollapsed={isCollapsed}
        onProfileClick={() => handleTabClick("/dashboard-tenant/profile", "My Profile")}
      />

      {/* Mobile Menu Toggle Button */}
      <button
        className={`${buttonBaseClass} ${buttonPositionClass}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div
        className={`
                    fixed top-0 left-0 h-full bg-white border-r border-gray-200 
                    pt-0 pb-4 flex flex-col justify-between  z-40
                    transition-all duration-300 ${sidebarPadding}
                    ${isMenuOpen
            ? "translate-x-0 w-64 px-2"
            : "-translate-x-full w-64 px-2"
          }
                    lg:translate-x-0  hidden lg:flex
                `}
        style={{ width: sidebarWidth }}
      >
        {/* Top Section */}
        <div className="flex flex-col">
          <div
            className={`flex items-center h-16  transition-all duration-300 ${isCollapsed ? "justify-center" : "justify-between"
              }`}
          >
            <div
              className={`flex items-center transition-all duration-300 ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                }`}
            >
              <Link to="/dashboard-owner">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-40 object-contain mr-2"
                />
              </Link>
            </div>
            <button
              className={`p-1 rounded-full text-gray-400 hover:bg-gray-100 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""
                }`}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <img src={manue2Icon} alt="Toggle" className="w-6 h-6" />
            </button>
          </div>
          <nav className="space-y-1">{renderItems(navItems)}</nav>
        </div>

        {/* Bottom Section */}
        <div className="space-y-1 border-t pt-4 border-gray-200">
          {renderItems(bottomItems)}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 pt-0 pb-4 flex flex-col justify-between shadow-xl z-40 transition-all duration-300 w-64 p-4 lg:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col">
          <div className="flex items-center space-x-2 h-16 border-b border-gray-200 mb-4 justify-start"></div>
          <nav className="space-y-1">{renderItems(navItems)}</nav>
        </div>
        <div className="space-y-1 border-t pt-4 border-gray-200">
          {renderItems(bottomItems)}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999 px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Are you sure you want to logout?
            </h3>
            <div className="flex gap-3 mt-5">
              <button
                onClick={confirmLogout}
                disabled={isLoggingOut}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${isLoggingOut
                  ? "bg-red-400 cursor-not-allowed text-white"
                  : "bg-red-600 text-white hover:bg-red-700"
                  }`}
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Logging out...
                  </>
                ) : (
                  "Yes, Logout"
                )}
              </button>
              <button
                onClick={cancelLogout}
                disabled={isLoggingOut}
                className="flex-1 py-2.5 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantSidebar;
