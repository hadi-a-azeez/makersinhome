import React, { useState } from "react";
import styles from "./css/productDetailed.module.css";
import Switch from "react-switch";
import MultiImageInput from "react-multiple-image-input";

const ProductDetailed = () => {
  const [checked, setChecked] = useState(true);
  const [images, setImages] = useState({});
  const handleChange = (checked) => {
    setChecked(checked);
  };
  return (
    <>
      <h1 className={styles.heading_normal}>Product name</h1>
      <h1 className={styles.heading_bold_small}>Images</h1>
      <div className={styles.image_uploader_wraper}>
        <MultiImageInput
          max={5}
          images={images}
          setImages={setImages}
          allowCrop={false}
          theme={{
            background: "#ffffff",
            outlineColor: "#111111",
            textColor: "rgba(255,255,255,0.6)",
            buttonColor: "#0000",
            modalColor: "#fffff",
          }}
          style={{ borderRadius: 10, borderColor: "red" }}
          imageStyle={{ width: 10 }}
        />
      </div>
      <div className={styles.container}>
        <input
          type="text"
          className={styles.input_field}
          placeholder="Product name"
        />
        <input type="text" className={styles.input_field} placeholder="Price" />
        <textarea
          type="textarea"
          className={styles.input_field}
          placeholder="Description"
          rows="4"
        />
        <div className={styles.toggle_block}>
          <h1 className={styles.heading_toggle}>Stock</h1>
          <label>
            <div className={styles.toggle}>
              <Switch
                onChange={handleChange}
                checked={checked}
                uncheckedIcon={false}
                checkedIcon={false}
                onColor="#000"
                width={46}
                height={24}
              />
            </div>
          </label>
        </div>
        <button className={styles.btn}>Update product</button>
      </div>
    </>
  );
};

export default ProductDetailed;
