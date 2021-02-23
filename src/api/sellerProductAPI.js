import axios_seller from "./axios-seller";

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
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
//Delete Product Images
export const deleteProductImagesAPI = async (images, pid) => {
  console.log(images);
  const imagesToDelete = { images_delete: images };
  try {
    const response = await axios_seller.post(
      `/seller/products/imageDelete/${pid}`,
      imagesToDelete
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
    const api = await axios_seller.delete(`/seller/products/${productId}`);
  } catch (error) {
    return error;
  }
};

//get all products of a specif category
export const getCategoryProducts = async (id) => {
  return await axios_seller.get(`/seller/products/catogories/${id}`);
};

//flip product stock status
export const updateProductStock = async (productId) => {
  try {
    const response = await axios_seller.put(
      `/seller/products/stock/${productId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

//upload product images to server

export const uploadProductImageAPI = async (imagesLocal, productId) => {
  let formData = new FormData();
  imagesLocal.map((image) => {
    formData.append("product_image", image.image);
  });
  try {
    const response = await axios_seller.post(
      `/seller/products/imageupload/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
