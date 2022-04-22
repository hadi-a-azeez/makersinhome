import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserInfo } from "api/sellerAccountAPI";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserData = async () => {
    const responseUser = await getUserInfo();
    setUser(responseUser?.data?.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserData();
    }
  }, []);

  const values = {
    user,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
