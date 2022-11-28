import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const LOCATIONS = {
  login: "/login",
  resetPassword: "/reset-password",
};

const Layout = ({ children }) => {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);

  return (
    <>
      {(currentLocation === LOCATIONS.login && <div>{children}</div>) ||
        (currentLocation === LOCATIONS.resetPassword && (
          <div>{children}</div>
        )) || (
          <div className="wrapper">
            <Sidebar />
            <div style={{ width: "100%" }}>{children}</div>
          </div>
        )}
    </>
  );
};

export default Layout;
