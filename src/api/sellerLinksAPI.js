import axios_seller from "./axios-seller";

export const addLink = async (values) => {
  try {
    const response = await axios_seller.post(`/seller/links/add`, values);

    return response;
  } catch (error) {
    return error;
  }
};

export const reorderLinks = async (values) => {
  try {
    const response = await axios_seller.post(`/seller/links/reorder`, values);

    return response;
  } catch (error) {
    return error;
  }
};

export const deleteLink = async (id) => {
  try {
    const response = await axios_seller.post(`/seller/links/delete/${id}`, {});
    return response;
  } catch (error) {
    return error;
  }
};

// get links
export const getLinksAPI = async () => {
  try {
    const response = await axios_seller.get(`/seller/links`);
    return response;
  } catch (error) {
    return error;
  }
};
