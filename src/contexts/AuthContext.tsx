import { createContext, useState } from "react";

export const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState(null);

  const value = { auth, setAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
