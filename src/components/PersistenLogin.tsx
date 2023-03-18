import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "../hooks/useAuth";
import nore from "../assets/nore.png";
import CircularProgress from "@mui/joy/CircularProgress";

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

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <img src={nore} width="300px" />
          <CircularProgress color="success" variant="soft" size="lg" />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
