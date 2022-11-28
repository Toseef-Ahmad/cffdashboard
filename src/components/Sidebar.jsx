import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [activeClass, setActiveClass] = useState("");

  const checkIsEmail = (str) => {
    const atSymbole = str.indexOf("@");
    const dotCom = str.indexOf(".com");

    return atSymbole && dotCom;
  };

  useEffect(() => {
    const activePath = location.pathname.split("/")[1];
    if (checkIsEmail(activePath) > 0) {
      setActiveClass("dashboard");
    } else {
      setActiveClass(activePath);
    }
  }, [location.pathname]);

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/images/logo.svg" alt="CFF logo" />
      </div>

      <div className="sidebar-items">
        {/* Dashboard */}
        <Link
          to="/dashboard"
          onClick={() => {
            setActiveClass("dashboard");
          }}
        >
          <div
            className={`item ${
              (activeClass === "dashboard" && "active") || ""
            }`}
          >
            <p>Dashboard</p>
          </div>
        </Link>

        {/* Customers */}
        <Link
          to="/customer"
          onClick={() => {
            setActiveClass("customer");
          }}
        >
          <div
            className={`item ${(activeClass === "customer" && "active") || ""}`}
          >
            <p>Customers</p>
          </div>
        </Link>

        {/* Quoting */}
        <Link
          to="/quoting"
          onClick={() => {
            setActiveClass("quoting");
          }}
        >
          <div
            className={`item ${(activeClass === "quoting" && "active") || ""}`}
          >
            <p>Quoting</p>
          </div>
        </Link>

        {/* Settings */}
        <Link
          to="/settings"
          onClick={() => {
            setActiveClass("settings");
          }}
        >
          <div
            className={`item ${(activeClass === "settings" && "active") || ""}`}
          >
            <p>Settings</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
