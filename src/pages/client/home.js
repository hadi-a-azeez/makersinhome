import React from "react";
import styles from "./css/home.module.css";
import logo from "../../assets/logo.png";
import mockupmain from "../../assets/mockone.png";

const Home = () => {
  return (
    <div className={styles.container}>
      {/* Header starts here */}
      <div className={styles.header}>
        <div className={styles.logowrapper}>
          <img src={logo} className={styles.logo} alt="s" />
          <h1 className={styles.saav}>Saav</h1>
        </div>
        <button className={styles.login_btn}>Login</button>
      </div>
      {/* Header ends here */}

      <h1 className={styles.main_heading}>
        Build your<br></br> online store in<br></br> 30 seconds.
      </h1>
      <h1 className={styles.sub_heading}>
        With Saav, you don’t have to be a technology expert to build an
        ecommerce website and start selling online.
      </h1>
      <button className={styles.register_btn}>Register Now</button>
      <img src={mockupmain} alt="s" className={styles.main_mockup} />
      <div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
