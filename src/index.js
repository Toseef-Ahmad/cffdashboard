import React from "react";
import ReactDOM from "react-dom";

// notify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import App from "./App";
import "./styles/main.scss";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";
// context Api
import { CffFormProvider } from "./contexts/cffDataContext";
import Layout from "./layout/Layout";
import { LoginContextProvider } from "./contexts/loginContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginContextProvider>
        <CffFormProvider>
          <Layout>
            <ToastContainer />
            <App />
          </Layout>
        </CffFormProvider>
      </LoginContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
