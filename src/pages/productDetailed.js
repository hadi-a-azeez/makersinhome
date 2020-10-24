import React, { useEffect, useState } from "react";
import styles from "./css/productDetailed.module.css";
import Switch from "react-switch";
import axios from "axios";
import "./css/filepond.css";
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory } from "react-router-dom";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ProductDetailed = (props) => {
  const [productsArray, setProductsArray] = useState([]);
  const [isLogin, setIsLogin] = useState([]);
  const [checked, setChecked] = useState(true);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [description, setDescription] = useState("");
  let history = useHistory();
  const id = props.match.params.id;
  const handleChange = (checked) => {
    setChecked(checked);
  };

  useEffect(() => {
    setIsLoading(true);
    const productApi = `https://fliqapp.xyz/api/seller/products/${id}`;
    axios
      .get(productApi, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setIsLogin(response.data.login);
        setProductsArray(response.data.data);
        const image = response.data.data[0].images;
        const images = image.split(',');
        setFiles(images.map((item)=>
          `https://fliqapp.xyz/api/product-images/${item}`
        ))
        console.log(response);
      });
  }, []);

  const handleDelete = ()=>{
    console.log("delete");
    const productDeleteApi = `https://fliqapp.xyz/api/seller/products/${id}`;
    setIsLoading(true);
    try {
      const api = axios
        .delete(
          productDeleteApi,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setIsLoading(false);
          history.push('/products');
          console.log(response);

        });
    } catch (error) {
      return error;
    }
  }

  return (
    <>
      <div>
        {isLoading ? (
          <div className={styles.loaderwraper}>
            <Loader
              type="Oval"
              color="#00b140"
              height={50}
              width={50}
              visible={isLoading}
            />
          </div>
        ) : (
          <div></div>
        )}
        {isLogin &&
          !isLoading &&
          productsArray.map((item, index) => (
            <div className={styles.container} key={index}>
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
                  /* server={`https://fliqapp.xyz/api/seller/products/imageupload/${id}`} */
                  labelIdle="Upload image"
                />
              </div>
              <input
                type="text"
                className={styles.input_field}
                placeholder="Product name"
                value={item.product_name}
                onChange={(e) => setProductName(e.target.value)}
              />
              <input
                type="text"
                className={styles.input_field}
                placeholder="Price"
                value={item.product_price}
                onChange={(e) => setOriginalPrice(e.target.value)}
              />
              <textarea
                type="textarea"
                className={styles.input_field}
                placeholder="Description"
                value={item.product_desc}
                rows="4"
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className={styles.toggle_block}>
                <h1 className={styles.heading_toggle}>Stock</h1>
                <label>
                  <div className={styles.toggle}>
                    <Switch
                      onChange={handleChange}
                      checked={item.product_stock ? true : false}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onColor="#00b140"
                      width={46}
                      height={24}
                    />
                  </div>
                </label>
              </div>
              <button className={styles.delete_btn} onClick={handleDelete}>Delete this product</button>
              <button className={styles.btn}>Update product</button>
            </div>
          ))}
      </div>
      <div className={styles.header}>
        <h1 className={styles.heading_normal}>Update product</h1>
      </div>
    </>
  );
};

export default ProductDetailed;
