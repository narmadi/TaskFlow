
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
