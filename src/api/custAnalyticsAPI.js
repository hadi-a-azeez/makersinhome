import axios from "axios";
import { apiRoot } from "../config";

//update store views (include save credentials for saving cookies)
export const updateStoreViews = async (shopid) => {
  console.log("called");
  try {
    return await axios.get(
      `${apiRoot}/client/store/analytics/storeviewsnew/${shopid}`
    );
  } catch (error) {
    console.log(error);
  }
};

//increment message started today
export const updateMessagesStarted = async (shopid) => {
  try {
    return await axios.get(
      `${apiRoot}/client/store/analytics/messagecount/${shopid}`
    );
  } catch (error) {
    console.log(error);
  }
};
