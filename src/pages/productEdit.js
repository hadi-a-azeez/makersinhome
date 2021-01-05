import React, { useEffect, useState, useRef } from "react";
import styles from "./css/productDetailed.module.css";
import { productImagesRoot } from "../config";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import LabelHeader from "../components/labelHeader";
import { useForm } from "../components/useForm";
import imageCompression from "browser-image-compression";
import { getCategoriesAPI } from "../api/sellerCategoryAPI";
import { SmallCloseIcon, AddIcon } from "@chakra-ui/icons";

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
  Select,
  Stack,
  Image,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";

const ProductDetailed = (props) => {
  const [product, setProduct, updateProduct] = useForm([]);
  const [productImagesLocal, setProductImagesLocal] = useState([]);
  const [serverImagesToDelete, setServerImagesToDelete] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [isFormError, setIsFormError] = useState(false);
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
      setProduct(productDetails.data.data[0]);
      const image = productDetails.data.data[0].images;
      const responseCatogory = await getCategoriesAPI();
      setCategoriesArray(responseCatogory.data.data);
    };
    productLoad();
  }, []);

  //flip is on product in state on switch click
  const handleIsOnSale = () => {
    console.log("nnnnice");
    let onSale = !product.product_is_sale;
    setProduct({ ...product, product_is_sale: onSale ? 1 : 0 });
  };

  //validate input values
  const validateFields = (formAction) => {
    if (product.product_price != "" && product.product_name != "") {
      setIsFormError(false);
      return formAction();
    }
    setIsFormError(true);
  };

  const setSalePrice = (value) => {
    setProduct({
      ...product,
      product_sale_price: value + "",
    });
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
      prevImages.filter((image) => image.name !== imageToDelete)
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
    setServerImagesToDelete([...serverImagesToDelete, imageToDelete]);
  };

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
        let imageName = uuidv4();
        compressedFile.lastModifiedDate = new Date();
        const convertedBlobFile = new File(
          [compressedFile],
          imagesFromInput[i].name,
          {
            type: imagesFromInput[i].type,
            lastModified: Date.now(),
          }
        );
        setProductImagesLocal((oldArray) => [
          ...oldArray,
          {
            name: imageName,
            image: convertedBlobFile,
            imageblob: URL.createObjectURL(compressedFile),
          },
        ]);
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

        {!isLoading && (
          <div className={styles.container}>
            <SimpleGrid
              column={3}
              w="90%"
              mt="5"
              mb="3"
              columns={3}
              spacing="7px"
            >
              <label htmlFor="file-upload" className={styles.customFileUpload}>
                <AddIcon w={8} h={8} />
              </label>
              {product.images &&
                product.images.split(",").map((image, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        borderRadius: `8px`,
                        width: "90px",
                      }}
                    >
                      <Image
                        boxSize="90px"
                        borderRadius="8px"
                        objectFit="cover"
                        src={`${productImagesRoot}/min/${image.split(":")[0]}`}
                        key={index}
                      />
                      <IconButton
                        colorScheme="gray"
                        borderRadius="100%"
                        aria-label="Call Segun"
                        size="sm"
                        position="absolute"
                        top="5px"
                        right="3px"
                        zIndex="8"
                        onClick={() => deleteServerImages(image)}
                        icon={<SmallCloseIcon color="black" w={4} h={4} />}
                      />
                    </div>
                  );
                })}
              {productImagesLocal &&
                productImagesLocal.map((image) => {
                  return (
                    <div
                      key={image.name}
                      style={{
                        position: "relative",
                        borderRadius: `8px`,
                      }}
                    >
                      <Image
                        boxSize="90px"
                        borderRadius="8px"
                        objectFit="cover"
                        src={image.imageblob}
                        key={image.name}
                        onClick={() => deleteLocalImages(image.name)}
                      />
                      <IconButton
                        colorScheme="gray"
                        borderRadius="100%"
                        aria-label="Call Segun"
                        size="sm"
                        position="absolute"
                        top="5px"
                        right="22px"
                        zIndex="8"
                        onClick={() => deleteLocalImages(image.name)}
                        icon={<SmallCloseIcon color="black" w={4} h={4} />}
                      />
                    </div>
                  );
                })}
            </SimpleGrid>

            <input
              type="file"
              accept="image/*"
              id="file-upload"
              onChange={(event) => compressImage(event)}
              onClick={(event) => {
                event.target.value = null;
              }}
              multiple
            />
            <FormControl id="product_name" isRequired w="90%">
              <FormLabel>Product Name</FormLabel>
              <Input
                type="text"
                name="product_name"
                placeholder="Product name"
                variant="filled"
                defaultValue={product.product_name}
                onChange={updateProduct}
                size="lg"
              />
            </FormControl>
            <FormControl isRequired w="90%" mt="4">
              <FormLabel>Is Product On Discount</FormLabel>
              <Switch
                onChange={() => {
                  handleIsOnSale();
                }}
                size="lg"
                colorScheme="green"
                isChecked={product.product_is_sale ? true : false}
              />
            </FormControl>
            <Stack direction="row" w="90%" mt="4">
              <FormControl id="product_price" isRequired w="100%">
                <FormLabel>Product Price</FormLabel>
                <Input
                  type="text"
                  name="product_price"
                  placeholder="Price"
                  variant="filled"
                  defaultValue={product.product_price}
                  onChange={updateProduct}
                  size="lg"
                  w="100%"
                />
              </FormControl>

              {product.product_is_sale && (
                <FormControl w="100%">
                  <FormLabel>Sale Price</FormLabel>
                  <Input
                    type="text"
                    name="product_sale_price"
                    placeholder="Price"
                    variant="filled"
                    defaultValue={product.product_sale_price}
                    onChange={(e) => setSalePrice(e.target.value)}
                    size="lg"
                    w="100%"
                  />
                </FormControl>
              )}
            </Stack>
            <FormControl w="90%" mt="4" isRequired>
              <FormLabel>categories</FormLabel>
              <Select
                name="parent category"
                name="product_cat"
                id="parentcategory"
                variant="filled"
                size="lg"
                value={
                  product.product_cat == 0 ? "DEFAULT" : product.product_cat
                }
                onChange={updateProduct}
              >
                <option value="DEFAULT" disabled>
                  select category
                </option>
                {categoriesArray.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.cat_name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="description" w="90%" mt="4">
              <FormLabel>Description</FormLabel>
              <Textarea
                type="textarea"
                name="product_desc"
                placeholder="Description"
                variant="filled"
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
            {isFormError && (
              <h1 style={{ color: "red" }}>Please fill all required details</h1>
            )}
            <Button
              colorScheme="white"
              style={{ color: "red" }}
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
              onClick={() => validateFields(updateProductFull)}
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
