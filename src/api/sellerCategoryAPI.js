import axios_seller from "./axios-seller";

//get all parent categories
export const getParentCategoriesApi = async () => {
  try {
    const parentCategoriesData = await axios_seller.get(
      "/seller/catogories/parent"
    );
    console.log(parentCategoriesData);
    return parentCategoriesData;
  } catch (error) {
    return error;
  }
};

// get catogories of  user
export const getCategoriesAPI = async () => {
  try {
    const categoriesData = await axios_seller.get(`/seller/catogories/`);
    console.log(categoriesData);
    return categoriesData;
  } catch (error) {
    return error;
  }
};

//add new category
export const addCatogoriesAPI = async (newCategory, selected) => {
  try {
    return await axios_seller.post(`/seller/catogories/`, {
      cat_name: newCategory,
      cat_parent: selected,
    });
  } catch (error) {
    console.log(error);
  }
};

//update single category
export const updateCatogoriesAPI = async (category) => {
  console.log(category);
  const catId = category.id;
  delete category.id;
  try {
    return await axios_seller.put(`/seller/catogories/${catId}`, category);
  } catch (error) {
    console.log(error);
  }
};

//get a single category
export const getSingleCategoryAPI = async (categoryId) => {
  try {
    return await axios_seller.get(`/seller/catogories/${categoryId}`);
  } catch (error) {
    console.log(error);
  }
};

//delete a category
export const deleteCategoryAPI = async (id) => {
  try {
    return await axios_seller.delete(`/seller/catogories/${id}`);
  } catch (error) {
    return error;
  }
};
