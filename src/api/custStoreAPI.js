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

// //get details of a store from link
// export const getStoreInfoAPI = async (storeLink) => {
//   try {
//     const response = await axios.get(`${apiRoot}/client/store/${storeLink}`);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

//get store products by category
export const getStoreProducts = async (userId, cat) => {
  const response = await axios
    .get(`${apiRoot}/client/store/allproducts/${userId}/${cat}`)
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
