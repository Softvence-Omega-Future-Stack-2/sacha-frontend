import { Navigate } from "react-router-dom";
import { useSubscription } from "../hooks/useSubscription";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requireSubscription?: boolean;
}

const ProtectedRoute = ({ children, allowedRoles, requireSubscription = false }: ProtectedRouteProps) => {
  const { hasSubscription, isLoading } = useSubscription();
  const userRole = localStorage.getItem("role") || "tenant";
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Check if user is logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check subscription requirement (only for tenants)
  if (requireSubscription && userRole === "tenant" && !hasSubscription) {
    return <Navigate to="/subscription" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
