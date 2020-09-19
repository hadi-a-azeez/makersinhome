import React from "react";
import styles from "./css/signup.module.css";

const SignUp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading_block}>
        <h1 className={styles.heading_normal}>Create your</h1>
        <h1 className={styles.heading_bold}>&nbsp;FREE</h1>
        <h1 className={styles.heading_normal}>&nbsp;store.</h1>
      </div>
      <div className={styles.input_group}>
        <input
          type="text"
          className={styles.input_field}
          placeholder="Whatsapp no"
        />
        <input
          type="password"
          className={styles.input_field}
          placeholder="Password"
        />
        <input
          type="text"
          className={styles.input_field}
          placeholder="Store name"
        />
        <button className={styles.btn}>Create Store</button>
      </div>
    </div>
  );
};

export default SignUp;
