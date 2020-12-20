import axios from "axios";
import { apiRoot } from "../config";

/* get all parent categories */
const parentCategoriesApi = "https://fliqapp.xyz/api/seller/catogories/parent";
export const fetchParentCategoriesApi = async () => {
  try {
    const parentCategoriesData = await axios.get(parentCategoriesApi, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return parentCategoriesData;
  } catch (error) {
    return error;
  }
};
