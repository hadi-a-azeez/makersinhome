import axios from "axios";
import { apiRoot } from "../config";

/* get product specific by catogory or all */
export const getProductsApi = async (catogory) => {
  let apiLink = `${apiRoot}/seller/products`;
  if (catogory != "all") {
    apiLink = `https://fliqapp.xyz/api/seller/products/catogories/${catogory}`;
  }
  try {
    console.log(apiLink);
    const ProductsData = await axios.get(apiLink, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return ProductsData;
  } catch (error) {
    return error;
  }
};

//add new product to store
export const addProductAPI = async (product) => {
  try {
    const response = await axios.post(`${apiRoot}/seller/products`, product, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
//update a product details
export const updateProductAPI = async (product) => {
  try {
    const response = await axios.put(`${apiRoot}/seller/products`, product, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
//Delete Product Images
export const deleteProductImagesAPI = async (images, pid) => {
  let imagesArr = { images_delete: images };
  try {
    const response = await axios.post(
      `${apiRoot}/seller/products/imageDelete/${pid}`,
      imagesArr,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//get count of all product and categories of current user
export const getCountAPI = async (id) => {
  try {
    const response = await axios.get(`${apiRoot}/seller/products/count`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

//get single product by id
export const getProductAPI = async (id) => {
  try {
    const response = await axios.get(`${apiRoot}/seller/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
