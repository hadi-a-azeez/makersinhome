import React from "react";
import styles from "./css/addNewCategory.module.css";

const AddNewCategory = () => {
  return (
    <>
      <div className={styles.align_left_container}>
        <h1 className={styles.heading_bold}>Add new category</h1>
      </div>
      <div className={styles.container}>
        <select
          name="parent category"
          id="parentcategory"
          className={styles.dropdown}
        >
          <option value="" disabled defaultValue hidden>
            parent category
          </option>
          <option value="volvo">Cake</option>
          <option value="saab">Deserts</option>
          <option value="fiat">Bag</option>
          <option value="audi">Craft</option>
        </select>
        <input
          type="text"
          className={styles.input_field}
          placeholder="Category name"
        />
        <button className={styles.btn}>ADD CATEGORY</button>
      </div>
    </>
  );
};

export default AddNewCategory;
