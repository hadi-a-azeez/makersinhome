import React, { useEffect, useState, useRef } from "react";
import styles from "../css/productDetailed.module.css";
import { productImagesRoot } from "../../../config";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import LabelHeader from "../../../components/labelHeader";
import { useForm } from "../../../components/useForm";
import imageCompression from "browser-image-compression";
import { getCategoriesAPI } from "../../../api/sellerCategoryAPI";
import { SmallCloseIcon, AddIcon, CloseIcon } from "@chakra-ui/icons";

import {
  getProductAPI,
  updateProductAPI,
  deleteProductImagesAPI,
  deleteProductAPI,
  uploadProductImageAPI,
  addProductsVariantAPI,
  deleteProductsVariantAPI,
} from "../../../api/sellerProductAPI";
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
  Text,
  Grid,
  Flex,
  Heading,
  Badge,
} from "@chakra-ui/react";
import { Box } from "@material-ui/core";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FocusLock from "@chakra-ui/focus-lock";

const ProductEdit = (props) => {
  const [product, setProduct, updateProduct] = useForm([]);
  const [productImagesLocal, setProductImagesLocal] = useState([]);
  const [serverImagesToDelete, setServerImagesToDelete] = useState([]);
  const [variantsLocal, setVariantsLocal] = useState([]);
  const [variantsToDelete, setVariantsToDelete] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [newVariant, setNewVariant] = useState("");
  const [isFormError, setIsFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();
  const toast = useToast();

  let history = useHistory();
  const productId = props.match.params.id;

  useEffect(() => {
    const productLoad = async () => {
      setIsLoading(true);
      const productDetails = await getProductAPI(productId);
      setIsLoading(false);
      setProduct(productDetails.data.data);
      const image = productDetails.data.data.products_images;
      const responseCatogory = await getCategoriesAPI();
      setCategoriesArray(responseCatogory.data.data);
    };
    productLoad();
  }, []);

  //flip is on product in state on switch click
  const handleIsOnSale = () => {
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

    //variants manipulation
    if (variantsLocal.length > 0) {
      await addProductsVariantAPI(variantsLocal);
    }
    if (variantsToDelete.length > 0) {
      await deleteProductsVariantAPI(variantsToDelete);
    }

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
    const editedProduct = { ...product };
    delete editedProduct.products_images;

    const responseAPI = await updateProductAPI(editedProduct, productId);
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

  //delete variants in server
  const deleteServerVariants = (toDeleteVariant) => {
    let currentVariants = product.products_variants;
    let newVariants = currentVariants.filter(
      (variant) => variant.id !== toDeleteVariant.id
    );
    setProduct({ ...product, products_variants: newVariants });
    console.log(toDeleteVariant);
    setVariantsToDelete((old) => [...old, toDeleteVariant.id]);
    console.log(variantsToDelete);
  };

  //delete newly added variants from state
  const deleteLocalVariants = (variantToDelete) => {
    setVariantsLocal((old) =>
      old.filter(
        (variant) => variant.variant_name !== variantToDelete.variant_name
      )
    );
  };

  //add images to be deleted from server to array
  const deleteServerImages = (imageToDelete) => {
    let currentImages = product.products_images;
    let newImages = currentImages.filter(
      (image) => image.id !== imageToDelete.id
    );
    setProduct({ ...product, products_images: newImages });
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
    const optionsMin = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 360,
      useWebWorker: true,
    };
    try {
      for (let i = 0; i < imagesFromInput.length; i++) {
        const compressedFile = await imageCompression(
          imagesFromInput[i],
          options
        );
        const compressedFileMin = await imageCompression(
          imagesFromInput[i],
          optionsMin
        );

        let imageName = uuidv4();

        compressedFile.lastModifiedDate = new Date();
        compressedFileMin.lastModifiedDate = new Date();

        const convertedBlobFileMin = new File(
          [compressedFileMin],
          imagesFromInput[i].name,
          {
            type: imagesFromInput[i].type,
            lastModified: Date.now(),
          }
        );

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
            imagemin: convertedBlobFileMin,
            imageblob: URL.createObjectURL(compressedFile),
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //error in product delete
  const handleDelete = async () => {
    await deleteProductAPI(productId);
    setIsLoading(false);
    history.push("/app/products/All%20Products/all");
  };

  return (
    <>
      <LabelHeader
        label={"Update product"}
        isBackButton={true}
        isRightIcon={true}
        iconAction={() => setIsOpen(true)}
      />
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
              {product.products_images &&
                product.products_images.map((image, index) => {
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
                        src={`https://firebasestorage.googleapis.com/v0/b/saav-9c29f.appspot.com/o/product_images%2Fmin%2F${image.product_image}?alt=media`}
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
            <FormControl w="90%" mt="4" isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                name="parent category"
                name="product_cat"
                id="parentcategory"
                variant="filled"
                size="lg"
                value={!product.product_cat ? "DEFAULT" : product.product_cat}
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
            <FormControl isRequired w="90%" mt="4">
              <FormLabel>Discount</FormLabel>
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
                  <Stack direction="row" justifyContent="space-between">
                    <FormLabel>Sale Price</FormLabel>
                    {product.product_sale_price && product.product_price && (
                      <Badge
                        colorScheme="green"
                        variant="solid"
                        fontSize="14px"
                        alignSelf="center"
                      >
                        {parseInt(
                          100 -
                            (100 * product.product_sale_price) /
                              product.product_price
                        )}
                        % OFF
                      </Badge>
                    )}
                  </Stack>
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
            <FormControl isRequired w="90%" mt="4">
              <FormLabel>Product Variants</FormLabel>
              <Flex direction="row" flexWrap="wrap">
                {product.products_variants &&
                  product.products_variants.map((variant) => (
                    <Box
                      ml="8px"
                      borderRadius="5px"
                      border="1px solid #c2c2c2"
                      mt="8px"
                      p="3px"
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text ml="10px"> {variant.variant_name}</Text>
                        <IconButton
                          icon={<CloseIcon />}
                          size="sm"
                          mr="4px"
                          onClick={() => deleteServerVariants(variant)}
                        />
                      </Stack>
                    </Box>
                  ))}

                {variantsLocal &&
                  variantsLocal.map((variant) => (
                    <Box
                      ml="8px"
                      borderRadius="5px"
                      border="1px solid #c2c2c2"
                      p="5px"
                      mt="8px"
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text ml="10px"> {variant.variant_name}</Text>
                        <IconButton
                          icon={<CloseIcon />}
                          size="sm"
                          mr="6px"
                          onClick={() => deleteLocalVariants(variant)}
                        />
                      </Stack>
                    </Box>
                  ))}
              </Flex>
              <Popup
                lockScroll={true}
                closeOnDocumentClick={false}
                trigger={
                  <Button mt="10px" colorScheme="blue">
                    Add Variant
                  </Button>
                }
                modal
                contentStyle={{ width: "80vw", borderRadius: "10px" }}
                nested
              >
                {(close) => (
                  <Box p="20px">
                    <FocusLock />
                    <Text mb="5px" fontWeight="bold">
                      Add Variant
                    </Text>
                    <Input
                      type="text"
                      value={newVariant}
                      onChange={(e) => setNewVariant(e.target.value)}
                      mt="10px"
                      mb="18px"
                    />
                    <Button onClick={close} mr="8px">
                      Cancel
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        if (newVariant) {
                          setVariantsLocal((old) => [
                            ...old,
                            { variant_name: newVariant, product_id: productId },
                          ]);
                          setNewVariant("");
                          close();
                        }
                      }}
                    >
                      Add Variant
                    </Button>
                    <Stack />
                  </Box>
                )}
              </Popup>
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
                whiteSpace="pre-wrap"
              />
            </FormControl>
            {/* <FormControl id="description" w="90%" mt="4px">
              <FormLabel>Stock</FormLabel>
              <Switch
                size="lg"
                colorScheme="green"
                mb="4px"
                isChecked={product.product_stock ? true : false}
                onChange={updateProductStock}
              />
            </FormControl> */}
            {isFormError && (
              <h1 style={{ color: "red" }}>Please fill all required details</h1>
            )}
            <AlertDialog
              isCentered
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
              mt="15px"
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

export default ProductEdit;
