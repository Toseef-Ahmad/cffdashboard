import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const parsedUser = user && JSON.parse(user);

  const checkIsLoggedIn = () => {
    return isLogin || parsedUser;
  };

  return (
    <>
      <LoginContext.Provider
        value={{
          checkIsLoggedIn,
          setIsLogin,
        }}
      >
        {children}
      </LoginContext.Provider>
    </>
  );
};
