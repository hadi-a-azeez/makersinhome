import React, { useState, useEffect, useRef } from "react";
import styles from "./css/editAccount.module.css";
import Loader from "react-loader-spinner";
import imageCompression from "browser-image-compression";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LabelHeader from "../components/labelHeader";
import { useForm } from "../components/useForm";
import { updateStoreAPI } from "../api/sellerStoreAPI";
import { apiRoot } from "../config";
import TextField from "@material-ui/core/TextField";

const EditAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState([]);
  const [isImageEdited, setImageEdited] = useState(false);
  const [compressedImagesState, setCompreseesdImagesState] = useState([]);
  const [storeInfo, setStoreInfo, updateStoreInfo] = useForm([]);
  let history = useHistory();

  const compressImage = async (event) => {
    setIsLoading(true);
    //compresses image to below 1MB
    let imagesFromInput = event.target.files;
    let imagesCompressed = [];
    console.log(event.target.files[0]);
    const options = {
      maxSizeMB: 0.6,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };
    try {
      for (let i = 0; i < imagesFromInput.length; i++) {
        const compressedFile = await imageCompression(
          imagesFromInput[i],
          options
        );
        imagesCompressed.push(compressedFile);
      }
      setCompreseesdImagesState(imagesCompressed);
      setImageEdited(true);
      setIsLoading(false);
      // setProductImageConverted(URL.createObjectURL(compressedFile));
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const imageToServer = async (imagesLocal) => {
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

  useEffect(() => {
    const getStoreDetails = async () => {
      setIsLoading(true);
      const productsApi = `https://fliqapp.xyz/api/seller/store`;
      let response = await axios.get(productsApi, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsLogin(response.data.login);
      setStoreInfo(response.data.data[0]);

      setIsLoading(false);
      if (response.data.login === false) {
        history.push("/");
      }
    };
    getStoreDetails();
  }, []);

  const updateStore = async () => {
    setIsLoading(true);
    await updateStoreAPI(storeInfo);
    await imageToServer(compressedImagesState);
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <LabelHeader label={"Edit business details"} />
      {isLoading ? (
        <div className={styles.loaderwraper}>
          <Loader
            type="Oval"
            color="#00b140"
            height={50}
            width={50}
            visible={isLoading}
          />
        </div>
      ) : (
        <div></div>
      )}
      <div className={styles.blank}></div>
      <div className={styles.image_block}>
        <div className={styles.thumbnail}>
          <img
            src={
              isImageEdited
                ? URL.createObjectURL(compressedImagesState[0])
                : `https://fliqapp.xyz/api/profile-images/${storeInfo.account_store_image}`
            }
            alt="image"
            className={styles.thumbnail_image}
          />
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        id="file-upload"
        onChange={(event) => compressImage(event)}
      />
      <h1 className={styles.link}>Update store image</h1>
      <TextField
        label="Store name*"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        style={{ width: `90%` }}
        id="outlined-basic"
        name="account_store"
        value={storeInfo.account_store}
        onChange={updateStoreInfo}
      />
      <TextField
        label="Phone number*"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        style={{ width: `90%`, marginTop: 20 }}
        name="account_whatsapp"
        value={storeInfo.account_whatsapp}
        onChange={updateStoreInfo}
      />
      <TextField
        label="Address*"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        style={{ width: `90%`, marginTop: 20, marginBottom: 20 }}
        name="account_store_address"
        value={storeInfo.account_store_address}
        onChange={updateStoreInfo}
      />
      <button className={styles.btn} onClick={updateStore}>
        Update Store Info
      </button>
    </div>
  );
};

export default EditAccount;
