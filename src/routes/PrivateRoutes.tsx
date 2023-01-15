import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

export default function PrivateRoutes() {
  const { currentUser } = useCurrentUser();

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}
