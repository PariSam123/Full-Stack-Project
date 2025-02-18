import React from "react";
import axios from "axios";
import authService from "./authService";
import { json, Navigate, Redirect, useHistory } from "react-router-dom";
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
});

axiosClient.interceptors.request.use(
  (config) => {

    config.headers["authorization"] = authService.getCurrentUser();
    config.headers.refreshToken = authService.getCurrentRefreshToken();
    if (authService.isAuthenticateduser()) {
      return config;
    } else {
      return <Navigate to="/Login" replace />;
    }
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  function (response) {
    // Do something with response data
   
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.data) {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject(error.data);
      }
    } else if (error.request) {
      return Promise.reject(error.request);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosClient;
