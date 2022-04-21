import React from "react";
import styles from "./css/header.module.css";
//import logo from "../assets/logo.png";
import logo from "../assets/ssav_logo.png";
import { useHistory } from "react-router-dom";

const Header = ({ signup }) => {
  const history = useHistory();
  return (
    <>
      {/* Header starts here */}
      <div className={styles.header}>
        <div className={styles.logowrapper} onClick={() => history.push("/")}>
          <img src={logo} className={styles.logo} alt="s" />
          <h1 className={styles.saav}>Saav</h1>
        </div>
        {signup ? (
          <button
            className={styles.login_btn}
            onClick={() => history.push("/signup")}
          >
            Sign up
          </button>
        ) : (
          <button
            className={styles.login_btn}
            onClick={() => history.push("/login")}
          >
            Login
          </button>
        )}
      </div>
      {/* Header ends here */}
    </>
  );
};

export default Header;
