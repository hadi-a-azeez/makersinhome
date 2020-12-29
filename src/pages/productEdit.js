import React, { useEffect, useState, useRef } from "react";
import styles from "./css/productDetailed.module.css";
import { productImagesRoot } from "../config";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory } from "react-router-dom";
import LabelHeader from "../components/labelHeader";
import { useForm } from "../components/useForm";
import imageCompression from "browser-image-compression";
import {
  getProductAPI,
  updateProductAPI,
  deleteProductImagesAPI,
  deleteProductAPI,
  uploadProductImageAPI,
} from "../api/sellerProductAPI";
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
  const [productImagesLocal, setProductImagesLocal] = useState([]);
  const [serverImagesToDelete, setServerImagesToDelete] = useState([]);
  const [isLogin, setIsLogin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = useRef();
  const toast = useToast();

  let history = useHistory();
  const productId = props.match.params.id;

  useEffect(() => {
    const productLoad = async () => {
      setIsLoading(true);
      const productDetails = await getProductAPI(productId);
      setIsLoading(false);
      console.log(productDetails.data.data[0]);
      setProduct(productDetails.data.data[0]);
      const image = productDetails.data.data[0].images;
    };
    productLoad();
  }, []);

  //flip is on product in state on switch click
  const handleIsOnSale = () => {
    console.log("nnnnice");
    let onSale = !product.product_is_sale;
    setProduct({ ...product, product_is_sale: onSale ? 1 : 0 });
  };
  //update product on server on submit
  const updateProductFull = async () => {
    setIsBtnLoading(true);
    //check if new images are added to product if upload it to server
    if (productImagesLocal.length > 0) {
      const responseImage = await uploadProductImageAPI(
        productImagesLocal,
        productId
      );
    }
    if (serverImagesToDelete.length > 0) {
      await deleteProductImagesAPI(serverImagesToDelete, productId);
    }
    const responseAPI = await updateProductAPI(product);
    setIsBtnLoading(false);
    toast({
      title: "Product updated.",
      description: "Product updated successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom",
    });

    /* history.push("/products"); */
  };
  const updateProductStock = () => {
    //update product stock state manually
    let toStock = !product.product_stock;
    setProduct({ ...product, product_stock: toStock ? 1 : 0 });
  };

  //delete newly added images from state
  const deleteLocalImages = (imageToDelete) => {
    setProductImagesLocal((prevImages) =>
      prevImages.filter((image) => image.name !== imageToDelete.name)
    );
  };
  //add images to be deleted from server to array
  const deleteServerImages = (imageToDelete) => {
    console.log(product.images);
    let img = product.images;
    let imagesDeleted = img
      .split(",")
      .filter((image) => image !== imageToDelete)
      .join(",");
    console.log(imagesDeleted);
    setProduct({ ...product, images: imagesDeleted });
    setServerImagesToDelete([
      ...serverImagesToDelete,
      parseInt(imageToDelete.split(":")[1]),
    ]);
  };

  //delete images which are deleted in state from server

  const compressImage = async (event) => {
    //compresses image to below 1MB
    let imagesFromInput = event.target.files;
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };
    try {
      for (let i = 0; i < imagesFromInput.length; i++) {
        const compressedFile = await imageCompression(
          imagesFromInput[i],
          options
        );
        setProductImagesLocal((oldArray) => [...oldArray, compressedFile]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    await deleteProductAPI(productId);
    setIsLoading(false);
    history.push("/products/All%20Products/all");
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
              {/* images are returned with image name and id with it seperated by : */}
              {product.images &&
                product.images.split(",").map((image, index) => {
                  return (
                    <img
                      src={`${productImagesRoot}/${image.split(":")[0]}`}
                      key={index}
                      onClick={() => deleteServerImages(image)}
                    />
                  );
                })}
              {productImagesLocal &&
                productImagesLocal.map((image, index) => {
                  return (
                    <img
                      src={URL.createObjectURL(image)}
                      key={index}
                      onClick={() => deleteLocalImages(image)}
                    />
                  );
                })}
            </div>
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              onChange={(event) => compressImage(event)}
              multiple
            />
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
            <Switch
              onChange={() => {
                handleIsOnSale();
              }}
              size="md"
              isChecked={product.product_is_sale ? true : false}
            />
            {product.product_is_sale && (
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
            )}
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
