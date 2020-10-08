import axios from "axios";

/* all products of loggined user */
const productsApi = "https://fliqapp.xyz/api/seller/products";
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

/* all categories of loggined user */
const categoriesApi = "https://fliqapp.xyz/api/seller/catogories/";
export const fetchCategoriesApi = async () => {
  try {
    const categoriesData = await axios.get(categoriesApi, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return categoriesData;
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
