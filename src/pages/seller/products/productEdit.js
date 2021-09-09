import React, { useEffect, useState, useRef } from "react";
import styles from "../css/productDetailed.module.css";
import { productImagesRoot } from "../../../config";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import LabelHeader from "../../../components/labelHeader";
import { useForm } from "../../../components/useForm";
import { getCategoriesAPI } from "../../../api/sellerCategoryAPI";
import { SmallCloseIcon, AddIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

import {
  getProductAPI,
  updateProductAPI,
  deleteProductAPI,
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
  CircularProgress,
} from "@chakra-ui/react";
import { Box } from "@material-ui/core";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FocusLock from "@chakra-ui/focus-lock";
import {
  deleteProductImageDO,
  uploadProductImageDO,
} from "../../../api/imageUploadAPI";
import { productImageCompresser } from "../../../utils/imageCompresser";

const ProductEdit = (props) => {
  const [product, setProduct, updateProduct] = useForm([]);
  const [productImagesLocal, setProductImagesLocal] = useState([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [isFormError, setIsFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [testCompress, setTest] = useState("");

  const [isProductDiscount, setIsProductDiscount] = useState(false);

  const [variantsLocal, setVariantsLocal] = useState([]);
  const [newVariant, setNewVariant] = useState("");
  const [newVariantPrice, setNewVariantPrice] = useState("");
  const [newVariantSalePrice, setNewVariantSalePrice] = useState("");
  const [newVariantIsDiscount, setNewVariantIsDiscount] = useState(false);

  const cancelRef = useRef();
  const toast = useToast();

  let history = useHistory();
  const productId = props.match.params.id;

  useEffect(() => {
    const productLoad = async () => {
      setIsLoading(true);
      const productDetails = await getProductAPI(productId);
      setIsLoading(false);
      //set products discount
      productDetails?.data?.data?.product_price !==
        productDetails?.data?.data?.product_sale_price &&
        setIsProductDiscount(true);

      // add is_discount to variants
      let variantsModified = productDetails.data.data?.products_variants?.map(
        (element) => ({
          ...element,
          is_discount: element.variant_price !== element.variant_sale_price,
        })
      );

      setProduct({
        ...productDetails.data.data,
        products_variants: variantsModified,
      });

      const responseCatogory = await getCategoriesAPI();
      setCategoriesArray(responseCatogory.data.data);
    };
    productLoad();
  }, []);

  //validate input values
  const validateFields = (formAction) => {
    if (product.product_price != "" && product.product_name != "") {
      setIsFormError(false);
      return formAction();
    }
    setIsFormError(true);
  };

  //update product on server on submit
  const updateProductFull = async () => {
    setIsBtnLoading(true);

    //check if new images are added to product if upload it to server
    productImagesLocal.length > 0 &&
      (await uploadProductImageDO(productImagesLocal));

    //set sale price to regular if is_disocunt is on
    let variantsFilteredOld = product.products_variants.map((element) =>
      element.is_discount
        ? { ...element }
        : { ...element, variant_sale_price: element.variant_price }
    );

    //remove is_discount
    variantsFilteredOld = variantsFilteredOld.map(
      ({ is_discount, ...element }) => element
    );

    let variantsFilteredNew = variantsLocal.map((element) =>
      element.is_discount
        ? { ...element }
        : { ...element, variant_sale_price: element.variant_price }
    );

    //remove is_discount and id
    variantsFilteredNew = variantsFilteredNew.map(
      ({ id, is_discount, ...element }) => element
    );

    const editedProduct = {
      ...product,
      product_sale_price: isProductDiscount
        ? product.product_sale_price
        : product.product_price,
      products_variants_old: variantsFilteredOld,
      products_variants_new: variantsFilteredNew,
      products_images_new: productImagesLocal.map((img) => img.name),
      products_images_old: product.products_images,
    };
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

  //delete newly added images from state
  const deleteLocalImages = (imageToDelete) => {
    setProductImagesLocal((prevImages) =>
      prevImages.filter((image) => image.name !== imageToDelete)
    );
  };

  //update variant arra objects keys
  const updateVariantLocal = (id, name, value) => {
    const variantIndex = variantsLocal.findIndex(
      (variantInState) => variantInState.id === id
    );
    const variantsArr = [...variantsLocal];
    variantsArr[variantIndex] = {
      ...variantsArr[variantIndex],
      [name]: value,
    };
    setVariantsLocal(variantsArr);
  };
  //update variant arra objects keys
  const updateVariantServer = (id, name, value) => {
    const variantIndex = product.products_variants.findIndex(
      (variantInState) => variantInState.id === id
    );
    const variantsArr = [...product.products_variants];
    variantsArr[variantIndex] = {
      ...variantsArr[variantIndex],
      [name]: value,
    };
    setProduct((old) => ({ ...old, products_variants: variantsArr }));
  };

  //delete variants in server
  const deleteServerVariants = (toDeleteVariant) => {
    let currentVariants = product.products_variants;
    let newVariants = currentVariants.filter(
      (variant) => variant.id !== toDeleteVariant.id
    );
    setProduct({ ...product, products_variants: newVariants });
  };

  //add images to be deleted from server to array
  const deleteServerImages = (imageToDelete) => {
    let currentImages = product.products_images;
    let newImages = currentImages.filter(
      (image) => image.id !== imageToDelete.id
    );
    setProduct({ ...product, products_images: newImages });
  };

  const handleImages = async (event) => {
    setIsCompressing(true);
    //compresses image to below 1MB
    let imagesFromInput = event.target.files;
    try {
      for (let image of imagesFromInput) {
        let imageName = uuidv4() + ".jpg";
        let compressedImages = await productImageCompresser(image, imageName);
        setProductImagesLocal((oldArray) => [
          ...oldArray,
          {
            name: imageName,
            image: compressedImages.normal,
            imagemin: compressedImages.min,
            imageblob: URL.createObjectURL(compressedImages.min),
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
    setIsCompressing(false);
  };

  const handleDelete = async () => {
    await deleteProductAPI(productId);
    setIsLoading(false);
    await deleteProductImageDO(product.products_images);
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
      <div style={{ marginTop: "70px" }} />
      <div>
        {testCompress !== "" && <img src={testCompress} />}
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

              {product?.products_images?.map((image, index) => {
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
                      src={`${productImagesRoot}/min/${image.product_image}`}
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
              {isCompressing && (
                <label className={styles.customFileUpload}>
                  <CircularProgress isIndeterminate color="green.300" />
                </label>
              )}
            </SimpleGrid>
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              onChange={(event) => handleImages(event)}
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
              <Stack direction="row" w="100%" justifyContent="space-between">
                <FormLabel>Category</FormLabel>
                <Text
                  color="green.500"
                  fontWeight="bold"
                  onClick={() => history.push("/app/add_category")}
                >
                  Add Category
                </Text>
              </Stack>{" "}
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

            {product?.products_variants?.length < 1 ? (
              <Stack w="90%">
                <FormControl mt="4">
                  <FormLabel>Discount</FormLabel>
                  <Switch
                    onChange={() => {
                      setIsProductDiscount((old) => !old);
                    }}
                    size="lg"
                    colorScheme="green"
                    isChecked={isProductDiscount}
                  />
                </FormControl>
                <Stack direction="row" mt="4">
                  <FormControl id="product_price" isRequired w="100%">
                    <FormLabel>Product Price</FormLabel>
                    <Input
                      type="number"
                      name="product_price"
                      placeholder="Price"
                      variant="filled"
                      defaultValue={product.product_price}
                      onChange={updateProduct}
                      size="lg"
                      w="100%"
                    />
                  </FormControl>

                  {isProductDiscount && (
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
                        type="number"
                        name="product_sale_price"
                        placeholder="Price"
                        variant="filled"
                        defaultValue={product.product_sale_price}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            product_sale_price: e.target.value + "",
                          })
                        }
                        size="lg"
                        w="100%"
                      />
                    </FormControl>
                  )}
                </Stack>
              </Stack>
            ) : (
              <Stack w="90%">
                <FormControl id="product_price" isDisabled mt="10px">
                  <FormLabel>Product Price</FormLabel>
                  <Input
                    type="number"
                    variant="filled"
                    placeholder={product.product_price}
                    size="lg"
                  />
                </FormControl>
                <Text color="red.300" fontWeight="bold">
                  {" "}
                  Edit Price in Variants
                </Text>
              </Stack>
            )}
            <FormControl isRequired w="90%" mt="4">
              <FormLabel>Product Variants</FormLabel>
              <Flex direction="row" flexWrap="wrap">
                {product.products_variants &&
                  product.products_variants.map((variant) => (
                    <Box
                      borderRadius="5px"
                      border="1px solid #c2c2c2"
                      p="5px"
                      ml="5px"
                      mt="5px"
                      key={variant.id}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text ml="10px"> {variant.variant_name}</Text>
                        <Popup
                          lockScroll={true}
                          closeOnDocumentClick={false}
                          trigger={
                            <IconButton
                              icon={<EditIcon />}
                              size="sm"
                              mr="6px"
                            />
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
                              <FormLabel> Name</FormLabel>
                              <Input
                                type="text"
                                value={variant.variant_name}
                                onChange={(e) =>
                                  updateVariantServer(
                                    variant.id,
                                    "variant_name",
                                    e.target.value
                                  )
                                }
                              />
                              <FormLabel mt="10px">Discount</FormLabel>
                              <Switch
                                onChange={() =>
                                  updateVariantServer(
                                    variant.id,
                                    "is_discount",
                                    !variant.is_discount
                                  )
                                }
                                size="lg"
                                colorScheme="green"
                                isChecked={variant.is_discount}
                              />
                              <Stack direction="row" mt="10px">
                                <Box>
                                  <FormLabel>Price</FormLabel>

                                  <Input
                                    pattern="\d*"
                                    type="number"
                                    value={variant.variant_price}
                                    onChange={(e) =>
                                      updateVariantServer(
                                        variant.id,
                                        "variant_price",
                                        e.target.value
                                      )
                                    }
                                    mb="18px"
                                  />
                                </Box>
                                {variant.is_discount && (
                                  <Box>
                                    <FormLabel>Selling Price</FormLabel>

                                    <Input
                                      pattern="\d*"
                                      type="number"
                                      value={variant.variant_sale_price}
                                      onChange={(e) =>
                                        updateVariantServer(
                                          variant.id,
                                          "variant_sale_price",
                                          e.target.value
                                        )
                                      }
                                      mb="18px"
                                    />
                                  </Box>
                                )}
                              </Stack>
                              <Button
                                bgColor="#fff"
                                color="red.500"
                                onClick={() => {
                                  deleteServerVariants(variant);
                                  close();
                                }}
                                mr="8px"
                              >
                                Delete
                              </Button>
                              <Button colorScheme="blue" onClick={close}>
                                OK
                              </Button>
                              <Stack />
                            </Box>
                          )}
                        </Popup>
                      </Stack>
                    </Box>
                  ))}

                {variantsLocal &&
                  variantsLocal.map((variant) => (
                    <Box
                      borderRadius="5px"
                      border="1px solid #c2c2c2"
                      p="5px"
                      ml="5px"
                      key={variant.id}
                      mt="5px"
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text ml="10px"> {variant.variant_name}</Text>
                        <Popup
                          lockScroll={true}
                          closeOnDocumentClick={false}
                          trigger={
                            <IconButton
                              icon={<EditIcon />}
                              size="sm"
                              mr="6px"
                            />
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
                              <FormLabel> Name</FormLabel>
                              <Input
                                type="text"
                                value={variant.variant_name}
                                onChange={(e) =>
                                  updateVariantLocal(
                                    variant.id,
                                    "variant_name",
                                    e.target.value
                                  )
                                }
                              />
                              <FormLabel>Discount</FormLabel>
                              <Switch
                                onChange={(e) =>
                                  updateVariantLocal(
                                    variant.id,
                                    "is_discount",
                                    !variant.is_discount
                                  )
                                }
                                size="lg"
                                colorScheme="green"
                                isChecked={variant.is_discount}
                              />
                              <Stack direction="row" mt="10px">
                                <Box>
                                  <FormLabel>Price</FormLabel>

                                  <Input
                                    type="number"
                                    value={variant.variant_price}
                                    onChange={(e) =>
                                      updateVariantLocal(
                                        variant.id,
                                        "variant_price",
                                        e.target.value
                                      )
                                    }
                                    mb="18px"
                                  />
                                </Box>
                                {variant.is_discount && (
                                  <Box>
                                    <FormLabel>Selling Price</FormLabel>

                                    <Input
                                      type="number"
                                      value={variant.variant_sale_price}
                                      onChange={(e) =>
                                        updateVariantLocal(
                                          variant.id,
                                          "variant_sale_price",
                                          e.target.value
                                        )
                                      }
                                      mb="18px"
                                    />
                                  </Box>
                                )}
                              </Stack>
                              <Button
                                colorScheme="red"
                                onClick={() => {
                                  setVariantsLocal((old) =>
                                    old.filter(
                                      (variantCurr) =>
                                        variantCurr.id !== variant.id
                                    )
                                  );
                                  close();
                                }}
                                mr="8px"
                              >
                                Delete
                              </Button>
                              <Button colorScheme="blue" onClick={close}>
                                OK
                              </Button>
                              <Stack />
                            </Box>
                          )}
                        </Popup>
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
                onOpen={() => {
                  setNewVariantIsDiscount(product.is_discount);
                  setNewVariantPrice(product.product_price);
                  setNewVariantSalePrice(product.product_sale_price);
                }}
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
                    <FormLabel> Name</FormLabel>
                    <Input
                      type="text"
                      value={newVariant}
                      onChange={(e) => setNewVariant(e.target.value)}
                    />
                    <FormLabel>Discount</FormLabel>
                    <Switch
                      onChange={() => setNewVariantIsDiscount((old) => !old)}
                      size="lg"
                      colorScheme="green"
                      isChecked={newVariantIsDiscount}
                    />

                    <Stack direction="row" mt="10px">
                      <Box>
                        <FormLabel>Price</FormLabel>

                        <Input
                          type="number"
                          value={newVariantPrice}
                          onChange={(e) => setNewVariantPrice(e.target.value)}
                          mb="18px"
                        />
                      </Box>
                      {newVariantIsDiscount && (
                        <Box>
                          <FormLabel>Selling Price</FormLabel>

                          <Input
                            type="number"
                            value={newVariantSalePrice}
                            onChange={(e) =>
                              setNewVariantSalePrice(e.target.value)
                            }
                            mb="18px"
                          />
                        </Box>
                      )}
                    </Stack>
                    <Button onClick={close} mr="8px">
                      Cancel
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        if (newVariant && newVariantPrice) {
                          setVariantsLocal((old) => [
                            ...old,
                            {
                              id: uuidv4(),
                              product_id: product.id,
                              variant_name: newVariant,
                              is_discount: newVariantIsDiscount,
                              variant_price: newVariantPrice,
                              variant_sale_price: newVariantSalePrice,
                            },
                          ]);
                          setNewVariant("");
                          setNewVariantPrice("");
                          setNewVariantSalePrice("");
                          setNewVariantIsDiscount(false);
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
              backgroundColor="#08bd80"
              colorScheme="green"
              color="white"
              variant="solid"
              w="90%"
              isDisabled={isCompressing}
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
