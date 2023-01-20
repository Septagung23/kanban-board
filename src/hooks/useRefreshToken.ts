import axios from "../services/axios";
import { useAuth } from "./useAuth";

const useRefreshToken = () => {
  const { setAuth }: any = useAuth();

  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });

    setAuth((prev: any) => {
      console.log(prev);
      console.log("refresh Token : ", response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
