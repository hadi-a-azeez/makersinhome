import React from "react";
import styles from "./css/categories.module.css";
const Categories = () => {
  return (
    <>
      <div className={styles.container}>
        <button className={styles.btn}>ADD CATEGORIES</button>
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
