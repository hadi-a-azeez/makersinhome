import axios from "axios";
import { apiRoot } from "../config";

//sign in user
export const signinUserAPI = async (loginUsername, loginPassword) => {
  const response = await axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      phone: loginUsername,
      password: loginPassword,
    },
    url: `${apiRoot}/seller/login`,
  });
  return response;
};

//get all info of loginned user
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
