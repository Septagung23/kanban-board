import axios from "../services/axios";
import { useAuth } from "./useAuth";

const useRefreshToken = () => {
  const { setAuth }: any = useAuth();

  const refresh = async () => {
    const res = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    const token = res.data.data.accessToken;
    const id = res.data.data.id;
    const nama = res.data.data.namaLengkap;
    const role = res.data.data.role;
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
