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
    const nama = response.data.namaLengkap;
    const role = response.data.role;
    setAuth({
      token,
      id,
      nama,
      role,
    });
    return token;
  };

  return refresh;
};

export default useRefreshToken;
