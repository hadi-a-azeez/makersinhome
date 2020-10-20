import React,{useState} from 'react';
import styles from "./css/editAccount.module.css";

const EditAccount = () => {
    const [storeName,setStoreName] = useState("");
    const [storeLink,setStoreLink] = useState("");
    const [phoneNuber,setPhoneNumber] = useState("");
    const [location,setLocation] = useState("");

    const handleClick = ()=>{
        console.log("clicked")
    }

    return ( 
    <div className={styles.container}>
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