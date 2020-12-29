import React, { useState, useEffect } from "react";
import styles from "./css/signup.module.css";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import { signinUserAPI } from "../api/sellerAccountAPI";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const SignIn = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  /*  useEffect(() => {
    localStorage.getItem('token') && history.replace('/dashboard')
  }, []); */

  let history = useHistory();

  useEffect(() => {
    //redirect to dashboard if already loginned
    if (localStorage.getItem("loginExpiry")) {
      if (localStorage.getItem("loginExpiry") > Date.now())
        return history.push("/dashboard");
    }
  }, []);

  const signIn = async () => {
    setIsLoading(true);

    let response = await signinUserAPI(loginUsername, loginPassword);
    setIsLoading(false);
    // check if login detials are incorrect
    if (!response.data.status) return setIsLoginError(true);
    //if login details are correct remov previous data
    localStorage.removeItem("token");
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("loginExpiry", Date.now() + 1.123e9);
    history.push("/dashboard");
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading_block}>
        <h1 className={styles.heading_bold_big}>Sign in</h1>
      </div>
      {isLoginError && (
        <h1 style={{ color: "red" }}>Please check your login details</h1>
      )}
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
