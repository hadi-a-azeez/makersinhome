import React, { useState, useEffect } from "react";
import styles from "./css/addNewProduct.module.css";
import { getCategoriesAPI } from "../api/sellerCategoryAPI";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LabelHeader from "../components/labelHeader";
import { useForm } from "../components/useForm";
import { addProductAPI } from "../api/sellerProductAPI";

const AddNewProduct = (props) => {
  const history = useHistory();

  const [product, setProduct, updateProduct] = useForm([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [isLogin, setIsLogin] = useState([]);
  const defaultCatogory = props.match.params.catogory;

  useEffect(() => {
    //get catogories of the current user to display on product category section
    const getCategoriesData = async () => {
      const Data = await getCategoriesAPI();
      setIsLogin(Data.data.login);
      setCategoriesArray(Data.data.data);
    };
    getCategoriesData();
    //adding default category to state
    if (defaultCatogory) setProduct({ product_cat: defaultCatogory });
  }, []);

  const addProduct = async () => {
    const response = await addProductAPI(product);
    const id = response.data.data.product_id;
    history.push(`/add_image/${id}`);
  };

  return (
    <>
      <div className={styles.container}>
        <LabelHeader label={"Add new product"} />
        <div className={styles.blank}></div>
        <input
          type="text"
          name="product_name"
          defaultValue={product.product_name}
          className={styles.input_field}
          placeholder="Product name*"
          onChange={updateProduct}
        />
        <input
          type="text"
          name="product_price"
          defaultValue={product.product_price}
          className={styles.input_field}
          placeholder="original price*"
          onChange={updateProduct}
        />
        <input
          type="text"
          name="product_sale_price"
          defaultValue={product.product_sale_price}
          className={styles.input_field}
          placeholder="new price"
          onChange={updateProduct}
        />
        <select
          name="parent category"
          name="product_cat"
          id="parentcategory"
          value={
            product.product_cat
              ? product.product_cat
              : defaultCatogory
              ? defaultCatogory
              : "DEFAULT"
          }
          className={styles.dropdown}
          onChange={updateProduct}
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
          name="product_desc"
          defaultValue={product.product_desc}
          className={styles.input_field}
          placeholder="Description"
          rows="4"
          onChange={updateProduct}
        />
        <button className={styles.btn} onClick={addProduct}>
          Next
        </button>
      </div>
    </>
  );
};

export default AddNewProduct;
