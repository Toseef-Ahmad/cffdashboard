import React, { useState, useEffect, useContext } from "react";
// import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./App.css";
// import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainContent from "./components/MainContent";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Customer from "./components/Customer";
import Settings from "./components/settings/Settings";
import Login from "./components/login/Login";
import ResetPassword from "./components/login/reset-password/ResetPassword";
import useApi from "./hooks/useApi";

// Context
import { LoginContext } from "./contexts/loginContext";
import Quoting from "./components/Quoting";

function App(props) {
  // const [state, setState] = useState(false);
  const { checkIsLoggedIn, setIsLogin } = useContext(LoginContext);

  const [tabActive, setTabActive] = useState(1);

  const { login } = useApi();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const parsedUser = user && JSON.parse(user);

  const onChangeTab = (key) => {
    setTabActive(key);
  };
  const handleSectionHideAndShow = () => {
    setTabActive(false);
  };

  const location = useLocation();

  useEffect(() => {
    if (
      !checkIsLoggedIn() &&
      !parsedUser &&
      location.pathname !== "/login" &&
      location.pathname !== "/reset-password"
    ) {
      navigate("/login");
    }

    if (location.pathname === "/dashboard") {
      navigate("/customer");
    }

    console.log(location.pathname, " path ");
  }, [location]);

  return (
    <div className="App">
      <div className="">
        <Routes>
          <Route
            path="/:email"
            element={
              <MainContent
                tabActive={tabActive}
                onChangeTab={onChangeTab}
                handleSectionHideAndShow={handleSectionHideAndShow}
              />
            }
          />
          <Route path="/" element={<Redirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/quoting" element={<Quoting />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

const Redirect = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { checkIsLoggedIn } = useContext(LoginContext);
  React.useEffect(() => {
    if (checkIsLoggedIn()) {
      navigate("/customer");
    } else {
      navigate("/login");
    }
  }, []);
  return null;
};

export default App;
