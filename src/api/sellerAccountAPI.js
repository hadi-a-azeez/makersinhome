import axios from "axios";
import axios_seller from "./axios-seller";
import { apiRoot } from "../config";
import { deleteStoreImageDO, uploadStoreImageDO } from "./imageUploadAPI";

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
    return await axios_seller.get(`/seller/store`);
  } catch (error) {
    console.log(error);
  }
};

//get info about user store

export const getStoreInfoAPI = async () => {
  let response = await axios_seller.get(`/seller/store`);
  console.log(response);
  return response;
};

//upload user profile image to server

export const uploadProfileImageAPI = async (imageLocal, oldprofileimage) => {
  //upload image to firebase
  try {
    await uploadStoreImageDO(imageLocal);
    //update database
    const apiResponse = await axios_seller.post(`/seller/store/addprofile/`, {
      profile_image: imageLocal.name,
    });
    // //delete old profile image
    await deleteStoreImageDO(oldprofileimage);
  } catch (error) {
    console.log(error);
    return error;
  }
};
