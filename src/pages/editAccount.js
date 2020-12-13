import React, { useState, useEffect } from "react";
import styles from "./css/editAccount.module.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LabelHeader from "../components/labelHeader";
import { useForm } from "../components/useForm";
import { updateStoreAPI } from "../api/accountStoreAPI";

const EditAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState([]);
  const [storeInfo, setStoreInfo, updateStoreInfo] = useForm([]);
  let history = useHistory();

  useEffect(() => {
    console.log("nice");
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
            src="https://media.thieve.co/products%2ForFARmD6aOq92uEuwmVb.jpg?fm=jpg&dpr=1&q=70&w=354&h=354"
            alt="image"
            className={styles.thumbnail_image}
          />
        </div>
      </div>
      <h1 className={styles.link}>Update store image</h1>
      <input
        type="text"
        className={styles.input_field}
        placeholder="Store name*"
        name="account_store"
        defaultValue={storeInfo.account_store}
        onChange={updateStoreInfo}
      />
      <input
        type="text"
        className={styles.input_field}
        placeholder="Store link*"
        name="account_store_link"
        defaultValue={storeInfo.account_store_link}
        onChange={updateStoreInfo}
      />
      <input
        type="text"
        className={styles.input_field}
        placeholder="Phone number*"
        name="account_whatsapp"
        defaultValue={storeInfo.account_whatsapp}
        onChange={updateStoreInfo}
      />
      <input
        type="text"
        className={styles.input_field}
        placeholder="Address*"
        name="account_store_address"
        defaultValue={storeInfo.account_store_address}
        onChange={updateStoreInfo}
      />
      <button className={styles.btn} onClick={handleClick}>
        Update Store Info
      </button>
    </div>
  );
};

export default EditAccount;
