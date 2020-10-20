import React from "react";
import styles from "./css/account.module.css";
import {Link} from "react-router-dom";

const Account = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.image_block}>
            <div className={styles.thumbnail}>
              <img
                src="https://media.thieve.co/products%2ForFARmD6aOq92uEuwmVb.jpg?fm=jpg&dpr=1&q=70&w=354&h=354"
                alt="image"
                className={styles.thumbnail_image}
              />
            </div>
          </div>
          <div className={styles.account_details}>
            <h1 className={styles.heading_bold_account}>Naz shop</h1>
            <Link to="/edit_account" className={styles.link}>Edit business details</Link>
          </div>
        </div>
        <div className={styles.header}>
          <h1 className={styles.heading_normal}>Account</h1>
        </div>
      </div>
    </>
  );
};

export default Account;
