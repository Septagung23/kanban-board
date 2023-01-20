import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

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
    if (error?.response?.status === 401) {
      // handleRemoveToken();
    }
    return Promise.reject(error);
  }
);

export default instance;
