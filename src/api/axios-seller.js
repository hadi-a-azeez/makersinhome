import axios from "axios";
import { apiRoot } from "../config";

//adding a initial url to all axios requests
const axios_seller = axios.create({
  baseURL: apiRoot,
});

//adding auth token to all axios requests

axios_seller.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

//redirect to login if token expired
axios_seller.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      //place your reentry code
      localStorage.removeItem("loginExpiry");
      localStorage.removeItem("token");
      window.location = "/login";
    }
    return error;
  }
);

export default axios_seller;
