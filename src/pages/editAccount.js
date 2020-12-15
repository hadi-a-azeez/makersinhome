import React, { useState, useEffect } from "react";
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
import TextField from '@material-ui/core/TextField';

const EditAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState([]);
  const [storeInfo, setStoreInfo, updateStoreInfo] = useForm([]);
  let history = useHistory();

  const compressImage = async (event) => {
    //compresses image to below 1MB

    const img = await imageToServer(event.target.files[0]);
    console.log(img);
  };
  const imageToServer = async (image) => {
    try {
      const response = await axios.post(
        `${apiRoot}/seller/store/profile-upload`,
        image,
        {
          headers: {
            "Content-Type": Image.type,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
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

  const handleClick = () => {
    updateStoreAPI(storeInfo);
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
            src={`https://fliqapp.xyz/api/profile-images/${storeInfo.account_store_image}`}
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
        InputLabelProps={{shrink: true}}
        style={{width: `90%`,}}
        id="outlined-basic"
        name="account_store"
        value={storeInfo.account_store}
        onChange={updateStoreInfo}
      />
      <TextField
        label="Phone number*"
        variant="outlined"
        InputLabelProps={{shrink: true}}
        style={{width: `90%`,marginTop:20}}
        name="account_whatsapp"
        value={storeInfo.account_whatsapp}
        onChange={updateStoreInfo}
      />
      <TextField
        label="Address*"
        variant="outlined"
        InputLabelProps={{shrink: true}}
        style={{width: `90%`,marginTop:20,marginBottom: 20}}
        name="account_store_address"
        value={storeInfo.account_store_address}
        onChange={updateStoreInfo}
      />
      <button className={styles.btn} onClick={handleClick}>
        Update Store Info
      </button>
    </div>
  );
};

export default EditAccount;
