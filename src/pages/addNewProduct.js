import React, { useState, useEffect } from "react";
import styles from "./css/addNewProduct.module.css";
import { getCategoriesAPI } from "../api/sellerCategoryAPI";
import { useHistory } from "react-router-dom";
import LabelHeader from "../components/labelHeader";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { apiRoot } from "../config";
import { useForm } from "../components/useForm";
import { addProductAPI } from "../api/sellerProductAPI";

const AddNewProduct = (props) => {
  const history = useHistory();

  const [product, setProduct, updateProduct] = useForm([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [isLogin, setIsLogin] = useState([]);
  const defaultCatogory = props.match.params.catogory;
  const [compressedImages, setCompressedImages] = useState([]);
  useEffect(() => {
    //get catogories of the current user to display on product category section
    const getCategoriesData = async () => {
      const Data = await getCategoriesAPI();
      setIsLogin(Data.data.login);
      setCategoriesArray(Data.data.data);
    };
    getCategoriesData();
    //adding default category to state
    if (defaultCatogory) setProduct({ product_cat: defaultCatogory });
  }, []);

  const addProduct = async () => {
    console.log("started");
    const response = await addProductAPI(product);
    const id = response.data.data.product_id;
    console.log(compressedImages);
    const responseImageUpload = await imageToServer(compressedImages, id);
    console.log(responseImageUpload);
  };
  const compressImage = async (event) => {
    //compresses image to below 1MB
    let imagesFromInput = event.target.files;
    let imagesCompressed = [];
    console.log(event.target.files[0]);
    const options = {
      maxSizeMB: 0.6,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };
    try {
      for (let i = 0; i < imagesFromInput.length; i++) {
        const compressedFile = await imageCompression(
          imagesFromInput[i],
          options
        );
        setCompressedImages((oldArray) => [...oldArray, compressedFile]);
      }

      // setProductImageConverted(URL.createObjectURL(compressedFile));
    } catch (error) {
      console.log(error);
    }
  };
  const imageToServer = async (imagesLocal, productId) => {
    let formData = new FormData();
    imagesLocal.map((image) => {
      formData.append("product_image", image);
    });
    try {
      const response = await axios.post(
        `https://fliqapp.xyz/api/seller/products/imageupload/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <LabelHeader label={"Add new product"} />
        <div className={styles.blank}></div>
        {compressedImages &&
          compressedImages.map((image) => (
            <img width="80px" src={URL.createObjectURL(image)} />
          ))}
        <input
          type="file"
          accept="image/*"
          id="file-upload"
          onChange={(event) => compressImage(event)}
          multiple
        />
        <input
          type="text"
          name="product_name"
          defaultValue={product.product_name}
          className={styles.input_field}
          placeholder="Product name*"
          onChange={updateProduct}
        />
        <input
          type="text"
          name="product_price"
          defaultValue={product.product_price}
          className={styles.input_field}
          placeholder="original price*"
          onChange={updateProduct}
        />
        <input
          type="text"
          name="product_sale_price"
          defaultValue={product.product_sale_price}
          className={styles.input_field}
          placeholder="new price"
          onChange={updateProduct}
        />
        <select
          name="parent category"
          name="product_cat"
          id="parentcategory"
          value={
            product.product_cat
              ? product.product_cat
              : defaultCatogory
              ? defaultCatogory
              : "DEFAULT"
          }
          className={styles.dropdown}
          onChange={updateProduct}
        >
          <option value="DEFAULT" disabled>
            select category
          </option>
          {isLogin &&
            categoriesArray.map((item, index) => (
              <option value={item.id} key={index}>
                {item.cat_name}
              </option>
            ))}
        </select>
        <textarea
          type="textarea"
          name="product_desc"
          defaultValue={product.product_desc}
          className={styles.input_field}
          placeholder="Description"
          rows="4"
          onChange={updateProduct}
        />
        <button className={styles.btn} onClick={addProduct}>
          Next
        </button>
      </div>
    </>
  );
};

export default AddNewProduct;
