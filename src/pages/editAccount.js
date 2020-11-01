import React,{useState,useEffect} from 'react';
import styles from "./css/editAccount.module.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios"
import { useHistory } from "react-router-dom";

const EditAccount = () => {
    const [storeName,setStoreName] = useState("");
    const [storeLink,setStoreLink] = useState("");
    const [phoneNuber,setPhoneNumber] = useState("");
    const [location,setLocation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState([]);
    const [storeInfo, setStoreInfo] = useState([]);
    let history = useHistory();

    useEffect(() => {
      const getStoreDetails = async () => {
        setIsLoading(true);
        const productsApi = `https://fliqapp.xyz/api/seller/store`;
        await axios
          .get(productsApi, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            setIsLogin(response.data.login);
            setStoreInfo(response.data.data[0]);
            setIsLoading(false);
            console.log(response.data.data[0]);
            console.log(isLogin);
            console.log(storeInfo);
            if (response.data.login === false) {
              history.push("/");
            }
          });
      };
      getStoreDetails();
    }, []);

    const handleClick = ()=>{
        console.log(storeInfo)
    }

    return ( 
    <div className={styles.container}>
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
          onChange={(e) => setStoreName(e.target.value)}
        />
        <input
          type="text"
          className={styles.input_field}
          placeholder="Store link*"
          onChange={(e) => setStoreLink(e.target.value)}
        />
        <input
          type="text"
          className={styles.input_field}
          placeholder="Phone number*"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          className={styles.input_field}
          placeholder="Location*"
          onChange={(e) => setLocation(e.target.value)}
        />
         <button className={styles.btn} onClick={handleClick}>
          save
        </button>
        <div className={styles.header}>
          <h1 className={styles.heading_normal}>Edit business details</h1>
        </div>
    </div> );
}
 
export default EditAccount;