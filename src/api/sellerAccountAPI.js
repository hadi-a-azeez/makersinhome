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

//get info about user store

export const getStoreInfoAPI = async () => {
  let response = await axios.get(`${apiRoot}/seller/store`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

//upload user profile image to server

export const uploadProfileImageAPI = async (imagesLocal) => {
  let formData = new FormData();
  imagesLocal.map((image) => {
    formData.append("account_store_image", image);
  });

  try {
    const response = await axios.post(
      `${apiRoot}/seller/store/profile-upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
