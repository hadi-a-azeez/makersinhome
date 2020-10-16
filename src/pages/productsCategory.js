import React, { useState, useEffect } from "react";
import styles from "./css/products.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Switch from "react-switch";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const ProductsCategory = (props) => {
  const [isLogin, setIsLogin] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  const [stock, setStock] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const id = props.match.params.id;
  let history = useHistory();

  useEffect(() => {
    const getProductsData = async () => {
      setIsLoading(true);
      const productsApi = `https://fliqapp.xyz/api/seller/products/catogories/${id}`;
      await axios
        .get(productsApi, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setIsLogin(response.data.login);
          setProductsArray(response.data.data);
          setIsLoading(false);
          console.log(productsArray);
          if (response.data.login === false) {
            history.push("/");
          }
        });
    };
    getProductsData();
  }, [stock]);

  //in stock,out of stock update
  const handleChange = (a, b, id) => {
    let Id = parseInt(id);
    const productFlipApi = `https://fliqapp.xyz/api/seller/products/stock/${Id}`;
    setIsLoading(true);
    try {
      const api = axios
        .put(
          productFlipApi,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setStock(stock + 1);
        });
    } catch (error) {
      return error;
    }
  };

  //product click handle
  const handleButtonClick = (productId) => {
    console.log(productId);
  };

  let inStock = "In stock";
  let outOfStock = "Out of stock";

  return (
    <>
      <div className={styles.container}>
        {isLoading ? (
          <div className={styles.loaderwraper}>
            <Loader
              type="Oval"
              color="#00b140"
              height={50}
              width={50}
              visible={isLoading}
            />
          </div>
        ) : (
          <div></div>
        )}
        <div className={styles.blank_two}></div>
        {/* card one */}
        {isLogin &&
          !isLoading &&
          productsArray.map((item, index) => (
            <Link
              to={`/product_detailed/${item.id}`}
              key={index}
              className={styles.link}
            >
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
                  <h1 className={styles.heading_bold_product}>
                    {item.product_name}
                  </h1>
                  <h1
                    className={styles.heading_normal}
                  >{`₹${item.product_price}`}</h1>
                  <div className={styles.stock_block}>
                    <h1 className={styles.heading_bold}>
                      {item.product_stock ? inStock : outOfStock}
                    </h1>
                    <div className={styles.toggle}>
                      <Switch
                        id={String(item.id)}
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
            </Link>
          ))}
        {/* card one ends here */}

        <Link to="/add_product" className={styles.btn}>
          ADD PRODUCTS
        </Link>
        <div className={styles.header}>
          <h1 className={styles.heading_normal}>Products</h1>
        </div>
        <div className={styles.blank}></div>
      </div>
    </>
  );
};

export default ProductsCategory;
