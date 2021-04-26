import React from "react";
import styles from "./css/home.module.css";
import mockupmain from "../../assets/mockone.png";
import { useHistory } from "react-router-dom";
import Header from "../../components/header";

const Home = () => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.main_heading}>
        Build your<br></br> online store in<br></br> 30 seconds.
      </h1>
      <h1 className={styles.sub_heading}>
        With Saav, you don’t have to be a technology expert to build an
        ecommerce website and start selling online.
      </h1>
      <button
        className={styles.register_btn}
        onClick={() => history.push("/signup")}
      >
        Register Now
      </button>
      <img src={mockupmain} alt="s" className={styles.main_mockup} />
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
