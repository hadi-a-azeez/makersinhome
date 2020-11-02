import React, { useState, useEffect } from "react";
import styles from "./css/addNewCategory.module.css";
import { fetchParentCategoriesApi } from "../api";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LabelHeader from "../components/labelHeader";

const AddNewCategory = () => {
  const [isLogin, setIsLogin] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [selected, setSelected] = useState([]);
  const [newCategory, setNewCategory] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const getCategoriesData = async () => {
      const Data = await fetchParentCategoriesApi();
      setIsLogin(Data.data.login);
      setCategoriesArray(Data.data.data);
      console.log(Data);
    };
    getCategoriesData();
  }, []);

  const handleCategoryClick = (id) => {
    setSelected(id);
    console.log(id);
  };

  const handleSubmit = () => {
    const postApi = "https://fliqapp.xyz/api/seller/catogories/";
    try {
      const post = axios
        .post(
          postApi,
          {
            cat_name: newCategory,
            cat_parent: selected,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.status_code === 201) {
            history.push("/categories");
          }
          console.log(response);
        });
    } catch (error) {
      return error;
    }
    console.log("clicked");
  };

  return (
    <>
      {/* <div className={styles.align_left_container}>
        <h1 className={styles.heading_bold}>Add new category</h1>
      </div> */}
      <div className={styles.container}>
      <LabelHeader label={"Add new category"} />
        <div className={styles.blank_two}></div>
        <select
          name="parent category"
          id="parentcategory"
          className={styles.dropdown}
          defaultValue={"DEFAULT"}
          onChange={(e) => handleCategoryClick(e.target.value)}
        >
          <option value="DEFAULT" disabled>
            parent category
          </option>
          {isLogin &&
            categoriesArray.map((item, index) => (
              <option value={item.id} key={index}>
                {item.cat_name}
              </option>
            ))}
        </select>
        <input
          type="text"
          className={styles.input_field}
          placeholder="Category name"
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className={styles.btn} onClick={handleSubmit}>
          ADD CATEGORY
        </button>
        
        <div className={styles.blank}></div>
      </div>
    </>
  );
};

export default AddNewCategory;
