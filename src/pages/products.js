import React from "react";
import styles from "./css/products.module.css";

const Products = () => {
  return (
    <div className={styles.container}>
      <button className={styles.btn}>ADD PRODUCTS</button>
      {/* card one */}
      <div className={styles.card}>
        <div className={styles.image_block}>
          <div className={styles.thumbnail}>
            <img
              src="https://media.thieve.co/products%2ForFARmD6aOq92uEuwmVb.jpg?fm=jpg&dpr=1&q=70&w=354&h=354"
              alt="image"
              className={styles.thumbnail_image}
            />
          </div>
        </div>
        <div className={styles.product_details}>
          <h1 className={styles.heading_bold_product}>Product name</h1>
          <h1 className={styles.heading_normal}>2000 Rs</h1>
          <h1 className={styles.heading_bold}>In stock</h1>
        </div>
      </div>
      {/* card one ends here */}
      {/* card two */}
      <div className={styles.card}>
        <div className={styles.image_block}>
          <div className={styles.thumbnail}>
            <img
              src="https://media.thieve.co/products%2F40tJs5LJHQLnzVDhof8s.png?fm=jpg&dpr=1&q=70&w=354&h=354"
              alt="image"
              className={styles.thumbnail_image}
            />
          </div>
        </div>
        <div className={styles.product_details}>
          <h1 className={styles.heading_bold_product}>Product name</h1>
          <h1 className={styles.heading_normal}>2000 Rs</h1>
          <h1 className={styles.heading_bold}>In stock</h1>
        </div>
      </div>
      {/* card two ends here */}
    </div>
  );
};

export default Products;
