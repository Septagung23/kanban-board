import axios from "axios";
import { api } from "../constant/constant";

const instance = axios.create({
  baseURL: api,
});

const handleRemoveToken = async () => {
  try {
    await localStorage.removeItem("jwt");
  } catch (error) {
    throw error;
  }
};

instance.interceptors.request.use(
  async (config) => {
    const token = await window.localStorage.getItem("jwt");
    // if (token && config.headers) {
    //   config.headers.Authorization = "Bearer " + token;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      handleRemoveToken();
    }
    return Promise.reject(error);
  }
);

export default instance;
