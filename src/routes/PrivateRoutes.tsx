import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoutes() {
  const { auth }: any = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
}
