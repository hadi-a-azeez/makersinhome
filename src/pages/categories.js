import React from "react";
import { Link } from "react-router-dom";
import styles from "./css/categories.module.css";

const Categories = () => {
  return (
    <>
      <div className={styles.container}>
        <button className={styles.btn}>
          <Link
            to="/add_category"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            ADD CATEGORIES
          </Link>
        </button>
        <div className={styles.card}>
          <h1 className={styles.heading_bold}>Bags</h1>
          <h1 className={styles.heading_small}>21 products</h1>
        </div>
        <div className={styles.card}>
          <h1 className={styles.heading_bold}>Cakes</h1>
          <h1 className={styles.heading_small}>5 products</h1>
        </div>
      </div>
    </>
  );
};

export default Categories;
