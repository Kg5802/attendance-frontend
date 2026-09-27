import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, roles }) {
  const { token, user } = useSelector((s) => s.auth);

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // User doesn't have required role
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}