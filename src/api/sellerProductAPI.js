import axios from "axios";
import { apiRoot } from "../config";

export const getProductAPI = async (id) => {
  try {
    const response = await axios.get(`${apiRoot}/seller/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
