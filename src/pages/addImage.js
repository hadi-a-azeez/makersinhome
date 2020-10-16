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

const AddImage = (props) => {
  const [files, setFiles] = useState([]);
  const id = props.match.params.id;
  const handleClick = () => {
    console.log(id);
  };

  return (
    <>
      <div className={styles.image_uploader_wraper}>
        <FilePond
          files={files}
          onupdatefiles={(fileItems) => {
            setFiles(fileItems.map((fileItem) => fileItem.file));
          }}
          allowMultiple={true}
          maxFiles={3}
          name="product_image"
          imagePreviewHeight={100}
          server={`https://fliqapp.xyz/api/seller/products/imageupload/${id}`}
          labelIdle="Upload image"
        />
      </div>
      <div className={styles.container}>
        <button className={styles.btn} onClick={handleClick}>
          Add product
        </button>
        <div className={styles.header}>
          <h1 className={styles.heading_normal}>Add new product</h1>
        </div>
      </div>
    </>
  );
};

export default AddImage;
