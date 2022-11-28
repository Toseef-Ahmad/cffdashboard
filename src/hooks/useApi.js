import React, { useState } from "react";
import axios from "axios";
import {
  LOGIN,
  UPDATE_CUSTOMER,
  FORGET_PASSWORD,
  RESET_PASSWORD,
} from "./url_helper";
import { PATCH, GET, POST } from "./api_methods";

const URL =
  "https://backend.cffinsure.com/v1/api/dashboard/admin_update_user_data";

/** CFF Dashboard Base URL */
const BASE_URL = "https://backend.cffinsure.com/v1/api";

const generateUrl = (name, id) => {
  switch (name) {
    case "customer":
      return `${BASE_URL}${UPDATE_CUSTOMER}/${id}`;
    case "login":
      return `${BASE_URL}${LOGIN}`;
    case "forgetPassword":
      return `${BASE_URL}${FORGET_PASSWORD}`;
    case "resetPassword":
      return `${BASE_URL}${RESET_PASSWORD}/${id}`;
  }
};
/** Get Header */
const getHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

/** Api configure Object */
function ApiConfigure(method, url, getHeaders, data) {
  this.method = method;
  this.url = url;
  this.headers = getHeaders;
  this.data = data;
}

const useApi = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const updateCustomer = (payload, id) => {
    const config = new ApiConfigure(
      PATCH,
      generateUrl("customer", id),
      getHeaders(),
      payload
    );

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const login = (payload) => {
    setIsLoading(true);
    const config = new ApiConfigure(
      POST,
      generateUrl("login"),
      getHeaders(),
      payload
    );
    return axios(config);
  };

  const forgetPassword = (payload) => {
    setIsLoading(true);
    const config = new ApiConfigure(
      POST,
      generateUrl("forgetPassword"),
      getHeaders(),
      payload
    );

    return axios(config);
  };

  const resetPassword = (payload) => {
    setIsLoading(true);
    const { otp } = payload;
    const config = new ApiConfigure(
      POST,
      generateUrl("resetPassword", otp),
      getHeaders(),
      payload
    );

    return axios(config);
  };

  return {
    updateCustomer,
    login,
    forgetPassword,
    resetPassword,
    setIsLoading,
    isLoading,
  };
};

export default useApi;
