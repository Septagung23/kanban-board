import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../services/axios";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth }: any = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: any) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error: any) => {
        const prevRequest = error?.config;
        if (
          (error?.response?.status === 403 ||
            error?.response?.status === 401) &&
          !prevRequest.sent
        ) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log("refresh Token : ", newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;
