import React from "react";
import styles from "./css/signup.module.css";

const SignIn = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading_block}>
        <h1 className={styles.heading_bold_big}>Sign in</h1>
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
        <button className={styles.btn}>Sign in</button>
      </div>
    </div>
  );
};

export default SignIn;
