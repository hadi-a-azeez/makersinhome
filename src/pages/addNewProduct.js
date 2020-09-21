import React, { useState } from "react";
import styles from "./css/addNewProduct.module.css";
import "./css/filepond.css";
import { FilePond, File, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AddNewProduct = () => {
  const [files, setFiles] = useState([]);

  return (
    <>
      <div className={styles.align_left_container}>
        <h1 className={styles.heading_bold}>Add new product</h1>
        {/* <h1 className={styles.heading_bold_small}>Images</h1> */}
      </div>

      <div className={styles.image_uploader_wraper}>
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={true}
          maxFiles={3}
          name="files"
          imagePreviewHeight={100}
          server="https://albananuae.com/seller/products/uploadimage"
          labelIdle="Upload image"
        />
      </div>
      <div className={styles.container}>
        <input
          type="text"
          className={styles.input_field}
          placeholder="Product name"
        />
        <input
          type="text"
          className={styles.input_field}
          placeholder="original price"
        />
        <input
          type="text"
          className={styles.input_field}
          placeholder="new price"
        />
        <select
          name="parent category"
          id="parentcategory"
          className={styles.dropdown}
        >
          <option disabled defaultValue hidden>
            product category
          </option>
          <option>Cake</option>
          <option>Deserts</option>
          <option>Bag</option>
          <option>Craft</option>
        </select>
        <textarea
          type="textarea"
          className={styles.input_field}
          placeholder="Description"
          rows="4"
        />
        <button className={styles.btn}>Add product</button>
      </div>
    </>
  );
};

export default AddNewProduct;
