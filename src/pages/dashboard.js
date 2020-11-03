import React from "react";
import styles from "./css/dashboard.module.css";
import { Link } from "react-router-dom";
import LabelHeader from "../components/labelHeader";
import VisibleIcon from "../assets/eye.svg";
import MessagesIcon from "../assets/chatbubble-ellipses.svg";
import ProductsIcon from "../assets/layersFilled.svg";
import CategoriesIcon from "../assets/gridFilled.svg";

const Dashboard = () => {
  return (
    <>
      <div className={styles.container}>
      <LabelHeader label={"Home"} />
        {/* <Link to="/add_product" className={`${styles.btn}`}>
          ADD PRODUCTS
        </Link> */}
        <div className={styles.heading_block}>
          <h1 className={styles.heading_bold}>Dashboard</h1>
        </div>
        <div className={styles.row}>
          <div className={`${styles.card} ${styles.green}`}>
            <div className={styles.card_content}>
              <img src={VisibleIcon} alt="home" className={styles.iconFilled} />
              <h1 className={styles.card_heading}>Store visits</h1>
              <h1 className={styles.card_data_bold}>299</h1>
            </div>
          </div>
          <div className={`${styles.card} ${styles.blue}`}>
            <div className={styles.card_content}>
              <img src={MessagesIcon} alt="home" className={styles.iconFilled} />
              <h1 className={styles.card_heading}>Messages started</h1>
              <h1 className={styles.card_data_bold}>78</h1>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.card} ${styles.yellow}`}>
            <div className={styles.card_content}>
            <img src={ProductsIcon} alt="home" className={styles.iconFilled} />
              <h1 className={styles.card_heading}>Total products</h1>
              <h1 className={styles.card_data_bold}>18</h1>
            </div>
          </div>
          <div className={`${styles.card} ${styles.red}`}>
            <div className={styles.card_content}>
            <img src={CategoriesIcon} alt="home" className={styles.iconFilled} />
              <h1 className={styles.card_heading}>Categories</h1>
              <h1 className={styles.card_data_bold}>6</h1>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Dashboard;
