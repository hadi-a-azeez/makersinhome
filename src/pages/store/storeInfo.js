import React from "react";
import styles from "../css/storeInfo.module.css";

const StoreInfo = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.align_left_container}>
        <h1 className={styles.heading_bold}>Store info</h1>
      </div>
      <div className={styles.container}>
        <input
          type="text"
          className={styles.input_field}
          placeholder="Store name"
        />
        <input
          type="text"
          className={styles.input_field}
          placeholder="Whatsapp no"
        />
        <textarea
          type="textarea"
          className={styles.input_field}
          placeholder="Address"
          rows="4"
        />
        <textarea
          type="textarea"
          className={styles.input_field}
          placeholder="Store description"
          rows="3"
        />
        <button className={styles.btn}>Update</button>
      </div>
    </div>
  );
};

export default StoreInfo;
