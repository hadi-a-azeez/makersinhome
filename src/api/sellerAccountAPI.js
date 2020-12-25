import axios from "axios";
import { apiRoot } from "../config";

//get all info of loginned users
export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${apiRoot}/seller/store/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
