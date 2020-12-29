import React, { useState, useEffect } from "react";
import styles from "./css/addNewProduct.module.css";
import { getCategoriesAPI } from "../api/sellerCategoryAPI";
import { useHistory } from "react-router-dom";
import LabelHeader from "../components/labelHeader";
import imageCompression from "browser-image-compression";
import { useForm } from "../components/useForm";
import { Switch } from "@chakra-ui/react";

import { addProductAPI, uploadProductImageAPI } from "../api/sellerProductAPI";

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
      const response = await getCategoriesAPI();
      setIsLogin(response.data.login);
      setCategoriesArray(response.data.data);
    };
    getCategoriesData();
    //adding default category to state
    if (defaultCatogory) setProduct({ product_cat: defaultCatogory });
  }, []);

  useEffect(() => {
    console.log(compressedImages);
  }, [compressedImages]);
  const deleteCompressedImage = (imageToDelete) => {
    setCompressedImages((prevImages) =>
      prevImages.filter((image) => image.name !== imageToDelete.name)
    );
  };
  const addProduct = async () => {
    const response = await addProductAPI(product);
    const id = response.data.data.product_id;
    //upload image to server if any
    if (compressedImages.length > 0) {
      const responseImageUpload = await uploadProductImageAPI(
        compressedImages,
        id
      );
    }
    //add delay to model Completed product adding
    history.push("/products/All%20Products/all");
  };
  const handleIsOnSale = () => {
    setProduct({ ...product, product_is_sale: !product.product_is_sale });
  };
  const compressImage = async (event) => {
    //compresses image to below 1MB
    let imagesFromInput = event.target.files;
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

  return (
    <>
      <div className={styles.container}>
        <LabelHeader label={"Add new product"} />
        <div className={styles.blank}></div>
        {compressedImages &&
          compressedImages.map((image) => (
            <img
              width="80px"
              src={URL.createObjectURL(image)}
              onClick={() => deleteCompressedImage(image)}
            />
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
        <Switch
          onChange={handleIsOnSale}
          size="md"
          isChecked={product.product_is_sale}
        />
        {product.product_is_sale && (
          <input
            type="text"
            name="product_sale_price"
            defaultValue={product.product_sale_price}
            className={styles.input_field}
            placeholder="new price"
            onChange={updateProduct}
          />
        )}
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
