import axios from "axios";
import { apiRoot } from "../config";

export const updateStoreAPI = async (storeInfo) => {
  try {
    const ProductsData = await axios.put(`${apiRoot}seller/store`, storeInfo, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return ProductsData;
  } catch (error) {
    return error;
  }
};
