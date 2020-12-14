import axios from "axios";
import { apiRoot } from "../config";

/* all products of loggined user */
const productsApi = `${apiRoot}/seller/products`;
export const fetchProductsApi = async () => {
  try {
    const ProductsData = await axios.get(productsApi, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return ProductsData;
  } catch (error) {
    return error;
  }
};

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
