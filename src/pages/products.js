import React, { useState, useEffect } from "react";
import styles from "./css/products.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Switch from "react-switch";
import { fetchProductsApi } from "../api";
import axios from "axios";

const Products = () => {
  const [isLogin, setIsLogin] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  let history = useHistory();

  const handleChange = (id) => {
    /* const productFlipApi = `https://fliqapp.xyz/api/seller/products/stock/${id}`;
    try {
      axios
        .put(
          productFlipApi,
          {
            id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      return error;
    } */
  };

  useEffect(() => {
    const getProductsData = async () => {
      const productsData = await fetchProductsApi();
      setIsLogin(productsData.data.login);
      setProductsArray(productsData.data.data);
      console.log(productsData.data);
      if (productsData.data.login === false) {
        history.push("/");
      }
    };
    getProductsData();
    const token = localStorage.getItem("token");
    console.log(token);
  }, []);

  let inStock = "In stock";
  let outOfStock = "Out of stock";

  return (
    <>
      <div className={styles.container}>
        <div className={styles.blank_two}></div>
        {/* card one */}
        {isLogin &&
          productsArray.map((item, index) => (
            <div className={styles.card} key={index}>
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
                <h1 className={styles.heading_bold_product}>
                  {item.product_name}
                </h1>
                <h1 className={styles.heading_normal}>{item.product_price}</h1>
                <div className={styles.stock_block}>
                  <h1 className={styles.heading_bold}>
                    {item.product_stock ? inStock : outOfStock}
                  </h1>
                  <div className={styles.toggle}>
                    <Switch
                      /* id={item.id} */
                      onChange={handleChange}
                      checked={item.product_stock ? true : false}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onColor="#00b140"
                      width={32}
                      height={17}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        {/* card one ends here */}

        <button className={styles.btn}>
          <Link
            to="/add_product"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            ADD PRODUCTS
          </Link>
        </button>
        <div className={styles.header}>
          <h1 className={styles.heading_normal}>Products</h1>
        </div>
        <div className={styles.blank}></div>
      </div>
    </>
  );
};

export default Products;
