import axios from "axios";
import { apiRoot } from "../config";

//get all data for store page
export const getStoreDataAll = async (storeLink) => {
  try {
    const response = await axios.get(
      `${apiRoot}/client/storehomepage/${storeLink}`
    );
    return response;
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status == 404) {
      return error.response;
    }
  }
};

//get store products
export const getStoreProductsPaginated = async (storeId, pageNo) => {
  try {
    const response = await axios.get(
      `${apiRoot}/client/storehomepage/products/${storeId}/${pageNo}`
    );
    return response;
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status == 404) {
      return error.response;
    }
  }
};

//get store details by user id
export const getStoreDataByIdAPI = async (userId) => {
  const response = await axios
    .get(`${apiRoot}/client/store/byid/${userId}`)
    .catch((err) => console.log(err));
  return response;
};

//get store products by category
export const getStoreProducts = async (userId, cat, pageNo) => {
  const response = await axios
    .get(
      `${apiRoot}/client/store/allproducts/${userId}/${cat}/id/desc/${pageNo}`
    )
    .catch((err) => console.log(err));
  return response;
};

//get store catogories

// export const getStoreCategoriesAPI = async (userId) => {
//   try {
//     const response = await axios.get(
//       `${apiRoot}/client/store/categories/all/${userId}`
//     );
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

//get single product
// export const getSingleProductAPI = async (productId) => {
//   try {
//     const response = await axios.get(
//       `${apiRoot}/client/store/products/single/${productId}`
//     );
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

//get all details of product detail page
export const getProductDetailAPI = async (productId) => {
  try {
    const response = await axios.get(
      `${apiRoot}/client/productdetailedpage/${productId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

//search for  products
export const searchProductsAPI = async (storeId, searchTerm) => {
  try {
    const response = await axios.get(
      `${apiRoot}/client/store/search/products/${storeId}/${searchTerm}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
