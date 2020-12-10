import React, { useState, useEffect } from "react";
import styles from "./css/addNewProduct.module.css";
import { fetchCategoriesApi } from "../api";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LabelHeader from "../components/labelHeader";

const AddNewProduct = (props) => {
  const history = useHistory();
  const [productName, setProductName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [isLogin, setIsLogin] = useState([]);
  const [id, setId] = useState("");
  const defaultCatogory = props.match.params.catogory;

  useEffect(() => {
    const getCategoriesData = async () => {
      const Data = await fetchCategoriesApi();
      setIsLogin(Data.data.login);
      setCategoriesArray(Data.data.data);
      console.log(Data);
    };
    getCategoriesData();
  }, []);

  const handleCategoryClick = (id) => {
    setCategory(id);
    console.log(id);
  };

  const handleNextClick = async () => {
    const postApi = "https://fliqapp.xyz/api/seller/products";

    try {
      const post = await axios
        .post(
          postApi,
          {
            product_name: productName,
            product_desc: description,
            product_price: originalPrice,
            product_cat: category,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          const id = response.data.data.product_id;
          history.push(`/add_image/${id}`);
          console.log(id);
          console.log(response);
        });
    } catch (error) {
      return error;
    }

    console.log("clicked");
  };

  return (
    <>
      <div className={styles.container}>
        <LabelHeader label={"Add new product"} />
        <div className={styles.blank}></div>
        <input
          type="text"
          className={styles.input_field}
          placeholder="Product name*"
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          className={styles.input_field}
          placeholder="original price*"
          onChange={(e) => setOriginalPrice(e.target.value)}
        />
        <input
          type="text"
          className={styles.input_field}
          placeholder="new price"
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <select
          name="parent category"
          id="parentcategory"
          className={styles.dropdown}
          value={defaultCatogory ? defaultCatogory : "DEFAULT"}
          onChange={(e) => handleCategoryClick(e.target.value)}
        >
          <option value="DEFAULT" disabled>
            select category
          </option>
          {isLogin &&
            categoriesArray.map((item, index) => (
              <option value={item.id} key={index}>
                {item.cat_name}
              </option>
            ))}
        </select>
        <textarea
          type="textarea"
          className={styles.input_field}
          placeholder="Description"
          rows="4"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className={styles.btn} onClick={handleNextClick}>
          Next
        </button>
      </div>
    </>
  );
};

export default AddNewProduct;
