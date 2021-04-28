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
        Build an online store for your Instagram business within 30 seconds.
      </h1>
      <h1 className={styles.sub_heading}>
        An online store for your Instagram business will make you stand alone
        among your competitors.
      </h1>
      <button
        className={styles.register_btn}
        onClick={() => history.push("/signup")}
      >
        Register For Free
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
