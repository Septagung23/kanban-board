import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoutes() {
  const { auth }: any = useAuth();
  // console.log("refresh Token : ", auth.accessToken);

  return auth?.accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}
