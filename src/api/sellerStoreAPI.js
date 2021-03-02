import axios_seller from "./axios-seller";

export const updateStoreAPI = async (storeInfo) => {
  console.log(storeInfo);
  try {
    const ProductsData = await axios_seller.put(`/seller/store`, storeInfo);
    return ProductsData;
  } catch (error) {
    return error;
  }
};

export const updateStoreStatusAPI = async (storeId) => {
  try {
    const response = await axios_seller.put(`/seller/store/status/${storeId}`);
    return response;
  } catch (error) {
    return error;
  }
};
