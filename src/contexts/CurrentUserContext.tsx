import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "../utils/getCookie";
import axios from "axios";
import { api } from "../constant/constant";

export const CurrentUserContext = createContext<any>("");

export const CurrentUserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(null);
  const token = getCookie("ACCESS_TOKEN");

  useEffect(() => {
    auth();
  }, []);

  const auth = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${api}/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const value = { currentUser };

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
