import axios from "axios";
import { apiRoot } from "../config";

// get catogories of  user
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

//add new category
export const addCatogoriesAPI = async (newCategory, selected) => {
  try {
    return await axios.post(
      `${apiRoot}/seller/catogories/`,
      {
        cat_name: newCategory,
        cat_parent: selected,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryAPI = async (id) => {
  try {
    return await axios.delete(`${apiRoot}/seller/catogories/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    return error;
  }
};
