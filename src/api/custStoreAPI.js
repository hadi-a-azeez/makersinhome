import axios from "axios";
import { apiRoot } from "../config";

//get details of a store from link
export const getStoreInfoAPI = async (storeLink) => {
  try {
    const response = await axios.get(
      `${apiRoot}/api/client/store/${storeLink}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
