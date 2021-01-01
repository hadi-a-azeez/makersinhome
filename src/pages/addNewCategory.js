import React, { useState, useEffect } from "react";
import styles from "./css/addNewCategory.module.css";
import { fetchParentCategoriesApi } from "../api";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LabelHeader from "../components/labelHeader";
import { addCatogoriesAPI } from "../api/sellerCategoryAPI";

const AddNewCategory = () => {
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [selected, setSelected] = useState([]);
  const [newCategory, setNewCategory] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const getCategoriesData = async () => {
      const Data = await fetchParentCategoriesApi();
      setCategoriesArray(Data.data.data);
    };
    getCategoriesData();
  }, []);

  const handleCategoryClick = (id) => {
    setSelected(id);
    console.log(id);
  };

  const handleSubmit = async () => {
    const response = await addCatogoriesAPI(newCategory, selected);
    console.log(response);
    history.push("/categories");
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
          {categoriesArray.map((item, index) => (
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
