import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

export default function PublicRoutes() {
  const { currentUser } = useCurrentUser();

  return !currentUser ? <Outlet /> : <Navigate to="/" replace />;
}
