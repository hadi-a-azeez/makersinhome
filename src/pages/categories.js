import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./css/categories.module.css";
import { fetchCategoriesApi } from "../api";
import axios from "axios";

const Categories = () => {
  const [isLogin, setIsLogin] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState([]);

  useEffect(() => {
    const getCategoriesData = async () => {
      const Data = await fetchCategoriesApi();
      setIsLogin(Data.data.login);
      setCategoriesArray(Data.data.data);
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
        <div className={styles.blank_two}></div>
        {isLogin &&
          categoriesArray.map((item, index) => (
            <div className={styles.card} key={index}>
              <h1 className={styles.heading_bold}>{item.cat_name}</h1>
              <h1 className={styles.heading_small}>3 products</h1>
            </div>
          ))}

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
        <div className={styles.header}>
          <h1 className={styles.heading_normal}>Categories</h1>
        </div>
        <div className={styles.blank}></div>
      </div>
    </>
  );
};

export default Categories;
