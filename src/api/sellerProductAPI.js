import axios_seller from "./axios-seller";
import { deleteProductImageDO, uploadProductImageDO } from "./imageUploadAPI";

/* get product specific by catogory or all */
export const getProductsApi = async (catogory) => {
  let apiLink = `/seller/products`;
  if (catogory != "all") {
    apiLink = `/seller/products/catogories/${catogory}`;
  }
  try {
    const ProductsData = await axios_seller.get(apiLink);
    return ProductsData;
  } catch (error) {
    return error;
  }
};

//add new product to store
export const addProductAPI = async (product) => {
  try {
    const response = await axios_seller.post(`/seller/products`, product);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
//update a product details
export const updateProductAPI = async (product, id) => {
  console.log(product);
  try {
    const response = await axios_seller.put(`/seller/products/${id}`, product);
    return response;
  } catch (error) {
    return error;
  }
};

//get count of all product and categories of current user
export const getCountAPI = async (id) => {
  try {
    const response = await axios_seller.get(`/seller/products/count`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//get single product by id
export const getProductAPI = async (id) => {
  try {
    const response = await axios_seller.get(`/seller/products/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//delete product of a user
export const deleteProductAPI = async (productId) => {
  try {
    const response = await axios_seller.delete(`/seller/products/${productId}`);
    return response;
  } catch (error) {
    return error;
  }
};

//get all products of a specif category
export const getCategoryProducts = async (id) => {
  return await axios_seller.get(`/seller/products/catogories/${id}`);
};

//flip product stock status
export const updateProductStock = async (productId, type = "visible") => {
  try {
    const response = await axios_seller.put(
      `/seller/products/stock/${type}/${productId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const addProductsVariantAPI = async (variants_array) => {
  try {
    const response = await axios_seller.post("/seller/products/variants", {
      variants_array,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductsVariantAPI = async (variants_array) => {
  console.log(variants_array);
  try {
    const response = await axios_seller.post(
      "/seller/products/variants/delete",
      {
        variants_array,
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

//upload product images
export const uploadProductImageAPI = async (imagesArr, productId) => {
  const imagesNamesArr = imagesArr.map((img) => img.name);
  //add images to database
  try {
    const api = await axios_seller.post(
      `/seller/products/imageAdd/${productId}`,
      { product_images: imagesNamesArr }
    );
    await uploadProductImageDO(imagesArr);
  } catch (error) {
    return error;
  }
  //upload to aws s3
};
