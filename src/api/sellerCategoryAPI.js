import axios from "axios";
import { apiRoot } from "../config";

export const getCategoriesAPI = async () => {
  try {
    const categoriesData = await axios.get(`${apiRoot}/seller/catogories/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return categoriesData;
  } catch (error) {
    return error;
  }
};
