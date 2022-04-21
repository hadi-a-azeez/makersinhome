import React, { createContext, useContext, useState, useEffect } from "react";

export const HeadingContext = createContext();

export const HeaderContextProvider = ({ children }) => {
  const [header, setHeader] = useState({});

  useEffect(() => {
    document.title = `Saav | ${header.title}` || "Saav | App";
  }, [header.title]);

  const values = {
    header,
    setHeader,
  };

  return (
    <HeadingContext.Provider value={values}>{children}</HeadingContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeadingContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
