import axios from "axios";
import { apiRoot } from "../config";

//add new product to store
export const addProductAPI = async (product) => {
  try {
    const response = await axios.post(`${apiRoot}/seller/products`, product, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const updateProductAPI = async (product) => {
  try {
    const response = await axios.put(`${apiRoot}/seller/products`, product, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//get single product by id
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
