import React, { useEffect, useState } from "react";
import styles from "./css/productDetailed.module.css";
import Switch from "react-switch";
import axios from "axios";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory } from "react-router-dom";
import LabelHeader from "../components/labelHeader";
import { useForm } from "../components/useForm";
import { getProductAPI } from "../api/sellerProductAPI";

const ProductDetailed = (props) => {
  const [product, setProduct, updateProduct] = useForm([]);
  const [isLogin, setIsLogin] = useState([]);
  const [checked, setChecked] = useState(true);
  const [productImages, setProductImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();
  const id = props.match.params.id;
  const handleChange = (checked) => {
    setChecked(checked);
  };

  useEffect(() => {
    const productLoad = async () => {
      setIsLoading(true);
      const productDetails = await getProductAPI(id);
      setIsLoading(false);
      setProduct(productDetails.data.data[0]);
      const image = productDetails.data.data[0].images;

      // if (image !== null) {
      //   //to check if there is atleast one image
      //   if (image.indexOf(",") > -1) {
      //     //if there is only one image no need to split
      //     const images = image.split(",");
      //     setFiles(
      //       images.map(
      //         (item) => `https://fliqapp.xyz/api/product-images/${item}`
      //       )
      //     );
      //   } else {
      //     setFiles(
      //       image.map(
      //         (item) => `https://fliqapp.xyz/api/product-images/${item}`
      //       )
      //     );
      //   }
      // }
    };
    productLoad();
  }, []);
  const ProductImages = () => {
    if (product) return <p>Loading....</p>;
    let image = product.images;
    // if (image !== null && image != "undefined" && image != "") {
    image.split(",").map((img, index) => {
      return (
        <img
          src={`https://fliqapp.xyz/api/product-images/${img}`}
          key={index}
        />
      );
    });
  };
  const handleDelete = () => {
    const productDeleteApi = `https://fliqapp.xyz/api/seller/products/${id}`;
    setIsLoading(true);
    try {
      const api = axios
        .delete(productDeleteApi, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setIsLoading(false);
          history.push("/products");
          console.log(response);
        });
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <LabelHeader label={"Update product"} />
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

        {isLogin && !isLoading && (
          <div className={styles.container}>
            <div className={styles.productImages}>
              {product.images &&
                product.images.split(",").map((img, index) => {
                  return (
                    <img
                      src={`https://fliqapp.xyz/api/product-images/${img}`}
                      key={index}
                    />
                  );
                })}
            </div>

            <input
              type="text"
              className={styles.input_field}
              placeholder="Product name"
              defaultValue={product.product_name}
              onChange={updateProduct}
            />
            <input
              type="text"
              className={styles.input_field}
              placeholder="Price"
              defaultValue={product.product_price}
              onChange={updateProduct}
            />
            <textarea
              type="textarea"
              className={styles.input_field}
              placeholder="Description"
              defaultValue={product.product_desc}
              rows="4"
              onChange={updateProduct}
            />
            <div className={styles.toggle_block}>
              <h1 className={styles.heading_toggle}>Stock</h1>
              <label>
                <div className={styles.toggle}>
                  <Switch
                    onChange={handleChange}
                    checked={product.product_stock ? true : false}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor="#00b140"
                    width={46}
                    height={24}
                  />
                </div>
              </label>
            </div>
            <button className={styles.delete_btn} onClick={handleDelete}>
              Delete this product
            </button>
            <button
              className={styles.btn}
              onClick={() => {
                console.log(product.images);
              }}
            >
              Update product
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetailed;
