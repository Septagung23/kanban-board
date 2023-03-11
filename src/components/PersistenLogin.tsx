import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "../hooks/useAuth";
import Loading from "./Loading";

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error: any) {
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.token ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
}
