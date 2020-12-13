import React, { useState, useEffect } from "react";
import styles from "./css/signup.module.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const SignIn = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /*  useEffect(() => {
    localStorage.getItem('token') && history.replace('/dashboard')
  }, []); */

  let history = useHistory();
  const signIn = () => {
    setIsLoading(true);
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        phone: loginUsername,
        password: loginPassword,
      },
      url: "https://fliqapp.xyz/api/seller/login",
    }).then(function (response) {
      setIsLoading(false);
      console.log(response);
      if (response.data.token) {
        history.push("/dashboard");
        localStorage.removeItem("isLogin");
        localStorage.removeItem("token");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLogin", true);
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
          {isLoading ? (
            <div className={styles.loader}>
              <Loader
                type="Oval"
                color="white"
                height={18}
                width={18}
                visible={isLoading}
              />
            </div>
          ) : (
            <div>Sign in</div>
          )}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
