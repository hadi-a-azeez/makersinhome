import React, { useEffect, useState, useRef } from "react";
import styles from "./css/productDetailed.module.css";
/* import Switch from "react-switch"; */
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory } from "react-router-dom";
import LabelHeader from "../components/labelHeader";
import { useForm } from "../components/useForm";
import { getProductAPI, updateProductAPI } from "../api/sellerProductAPI";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useToast,
} from "@chakra-ui/react";

const ProductDetailed = (props) => {
  const [product, setProduct, updateProduct] = useForm([]);
  const [isLogin, setIsLogin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = useRef();
  const toast = useToast();

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
    setIsBtnLoading(true);
    const response = await updateProductAPI(product);
    setIsBtnLoading(false);
    toast({
      title: "Product updated.",
      description: "Product updated successfully.",
      status: "success",
      duration: 6000,
      isClosable: true,
      position: "top",
    });
    /* history.push("/products"); */
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
      <LabelHeader label={"Update product"} isBackButton={true} />
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
            <FormControl id="product_name" isRequired w="90%">
              <FormLabel>Product Name</FormLabel>
              <Input
                type="text"
                name="product_name"
                placeholder="Product name"
                defaultValue={product.product_name}
                onChange={updateProduct}
                size="lg"
              />
            </FormControl>
            <FormControl id="product_price" isRequired w="90%" mt="4px">
              <FormLabel>Product Price</FormLabel>
              <Input
                type="text"
                name="product_price"
                placeholder="Price"
                defaultValue={product.product_price}
                onChange={updateProduct}
                size="lg"
              />
            </FormControl>
            <FormControl id="product_sale_price" w="90%" mt="4px">
              <FormLabel>Sale Price</FormLabel>
              <Input
                type="text"
                name="product_sale_price"
                placeholder="Price"
                defaultValue={product.product_sale_price}
                onChange={updateProduct}
                size="lg"
              />
            </FormControl>
            <FormControl id="description" w="90%" mt="4px">
              <FormLabel>Description</FormLabel>
              <Textarea
                type="textarea"
                name="product_desc"
                placeholder="Description"
                defaultValue={product.product_desc}
                rows="4"
                onChange={updateProduct}
              />
            </FormControl>
            {/* <div className={styles.toggle_block}>
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
            </div> */}
            <FormControl id="description" w="90%" mt="4px">
              <FormLabel>Stock</FormLabel>
              <Switch
                size="lg"
                colorScheme="green"
                mb="4px"
                isChecked={product.product_stock ? true : false}
                onChange={updateProductStock}
              />
            </FormControl>
            <Button
              colorScheme="red"
              w="90%"
              mb="6px"
              size="lg"
              onClick={() => setIsOpen(true)}
            >
              Delete this product
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={() => setIsOpen(false)}
            >
              <AlertDialogOverlay>
                <AlertDialogContent w="90%">
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Product
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={handleDelete} ml={3}>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
            <Button
              colorScheme="green"
              w="90%"
              isLoading={isBtnLoading}
              loadingText="Uploading"
              onClick={updateProductFull}
              size="lg"
            >
              Update product
            </Button>
            <div style={{ marginTop: `70px` }}></div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetailed;
