import React, { useState } from "react";
import styles from "./css/signup.module.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  let history = useHistory();
  const signIn = () => {
    axios({
      method: "post",
      data: {
        phone: loginUsername,
        password: loginPassword,
      },
      url: "https://fliqapp.xyz/api/seller/login",
    }).then(function (response) {
      console.log(response);
      if (response.data.token) {
        console.log("need to be redirected");
        history.push("/dashboard");
        localStorage.removeItem("token");
        localStorage.setItem("token", response.data.token);
      }
    });
  };
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
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          type="password"
          className={styles.input_field}
          placeholder="Password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button className={styles.btn} onClick={signIn}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default SignIn;
