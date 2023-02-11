import axios from "../services/axios";
import { useAuth } from "./useAuth";

const useRefreshToken = () => {
  const { setAuth }: any = useAuth();

  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    const token = response.data.accessToken;
    const id = response.data.id;
    const username = response.data.nama_lengkap;
    const role = response.data.role;
    setAuth({
      token,
      id,
      username,
      role,
    });
    return token;
  };

  return refresh;
};

export default useRefreshToken;
