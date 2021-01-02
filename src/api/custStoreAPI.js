import axios from "axios";
import { apiRoot } from "../config";

//get details of a store from link
export const getStoreInfoAPI = async (storeLink) => {
  try {
    const response = await axios.get(`${apiRoot}/client/store/${storeLink}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//get store products
export const getStoreProducts = async (userId, cat) => {
  const response = await axios
    .get(`${apiRoot}/client/store/allproducts/${userId}/${cat}`)
    .catch((err) => console.log(err));
  return response;
};

//get store catogories

export const getStoreCategoriesAPI = async (userId) => {
  try {
    const response = await axios.get(
      `${apiRoot}/client/store/categories/all/${userId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

//get single product
export const getSingleProductAPI = async (productId) => {
  try {
    const response = await axios.get(
      `${apiRoot}/client/store/products/single/${productId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
