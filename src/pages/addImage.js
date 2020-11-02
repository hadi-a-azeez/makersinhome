import React, { useState } from "react";
import styles from "./css/addNewProduct.module.css";
import "./css/filepond.css";
import { FilePond, File, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import {useHistory} from "react-router-dom";
import LabelHeader from "../components/labelHeader";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AddImage = (props) => {
  let history = useHistory();
  const [files, setFiles] = useState([]);
  const id = props.match.params.id;
  const handleClick = () => {
    console.log(id);
    history.push('/products');
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
          server=
            {
                {
                    url: `https://fliqapp.xyz/api/seller/products/imageupload/${id}`,
                    process: {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                    }
                }
            }
          labelIdle="Upload image"
        />
      </div>
      <div className={styles.container}>
      <LabelHeader label={"Add new product"} />
        <button className={styles.btn} onClick={handleClick}>
          Add product
        </button>
        
      </div>
    </>
  );
};

export default AddImage;
