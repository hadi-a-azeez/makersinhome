import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./css/categories.module.css";
import { fetchCategoriesApi } from "../api";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Categories = () => {
  const [isLogin, setIsLogin] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCategoriesData = async () => {
      setIsLoading(true);
      const Data = await fetchCategoriesApi();
      setIsLogin(Data.data.login);
      setCategoriesArray(Data.data.data);
      setIsLoading(false);
      console.log(Data);
    };
    getCategoriesData();
  }, []);

  const handleCount = (id) => {
    console.log(id);
    /* const postApi = `https://fliqapp.xyz/api/seller/products/catogories/no/${id}`;
    let count = axios.get(postApi, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(count); */
  };

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
        {isLogin &&
          categoriesArray.map((item, index) => (
            <Link
              to={`/products_category/${item.id}`}
              key={index}
              className={styles.link}
            >
              <div className={styles.card}>
                <h1 className={styles.heading_bold}>{item.cat_name}</h1>
                <h1 className={styles.heading_small}>3 products</h1>
              </div>
            </Link>
          ))}

        <Link to="/add_category" className={styles.btn}>
          ADD CATEGORIES
        </Link>
        <div className={styles.header}>
          <h1 className={styles.heading_normal}>Categories</h1>
        </div>
        <div className={styles.blank}></div>
      </div>
    </>
  );
};

export default Categories;
