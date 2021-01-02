import axios from "axios";
import { apiRoot } from "../config";

//update store views (include save credentials for saving cookies)
export const updateStoreViews = async (shopid) => {
  try {
    await axios.get(`${apiRoot}/client/store/analytics/storeviews/${shopid}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
