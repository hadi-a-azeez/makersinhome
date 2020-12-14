import React, { useEffect, useState } from "react";
import styles from "./css/productDetailed.module.css";
import Switch from "react-switch";
import axios from "axios";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory } from "react-router-dom";
import LabelHeader from "../components/labelHeader";
import { useForm } from "../components/useForm";
import { getProductAPI, updateProductAPI } from "../api/sellerProductAPI";

const ProductDetailed = (props) => {
  const [product, setProduct, updateProduct] = useForm([]);
  const [isLogin, setIsLogin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();
  const id = props.match.params.id;
  const updateProductStock = () => {
    //update product stock state manually
    let toStock = !product.product_stock;
    console.log(product);
    setProduct({ ...product, product_stock: toStock ? 1 : 0 });
    console.log(product);
  };

  //update product on server on submit
  const updateProductFull = async () => {
    const response = await updateProductAPI(product);
    history.push("/products");
  };

  useEffect(() => {
    const productLoad = async () => {
      setIsLoading(true);
      const productDetails = await getProductAPI(id);
      setIsLoading(false);
      console.log(productDetails.data.data[0]);
      setProduct(productDetails.data.data[0]);
      const image = productDetails.data.data[0].images;
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
              name="product_name"
              className={styles.input_field}
              placeholder="Product name"
              defaultValue={product.product_name}
              onChange={updateProduct}
            />
            <input
              type="text"
              name="product_price"
              className={styles.input_field}
              placeholder="Price"
              defaultValue={product.product_price}
              onChange={updateProduct}
            />
            <input
              type="text"
              name="product_sale_price"
              className={styles.input_field}
              placeholder="Price"
              defaultValue={product.product_sale_price}
              onChange={updateProduct}
            />
            <textarea
              type="textarea"
              name="product_desc"
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
                    name="product_stock"
                    checked={product.product_stock ? true : false}
                    onChange={updateProductStock}
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
            <button className={styles.btn} onClick={updateProductFull}>
              Update product
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetailed;
