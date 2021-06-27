import React, { useState, useEffect } from "react";
import styles from "../css/addNewProduct.module.css";
import { getCategoriesAPI } from "../../../api/sellerCategoryAPI";
import { useHistory } from "react-router-dom";
import LabelHeader from "../../../components/labelHeader";
import imageCompression from "browser-image-compression";
import { useForm } from "../../../components/useForm";
import {
  Badge,
  Box,
  CircularProgress,
  Flex,
  Switch,
  Text,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import {
  addProductAPI,
  addProductsVariantAPI,
  uploadProductImageAPI,
} from "../../../api/sellerProductAPI";
import { SmallCloseIcon, AddIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Select,
  Stack,
  Image,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FocusLock from "@chakra-ui/focus-lock";
import { uploadProductImageDO } from "../../../api/imageUploadAPI";

const AddNewProduct = (props) => {
  const history = useHistory();

  const [product, setProduct, updateProduct] = useForm([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const defaultCatogory = props.match.params.catogory;
  const [compressedImages, setCompressedImages] = useState([]);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const [isFormError, setIsFormError] = useState(false);
  const [variantsLocal, setVariantsLocal] = useState([]);

  const [newVariantIsDiscount, setNewVariantIsDiscount] = useState(false);
  const [isProductDiscount, setIsProductDiscount] = useState(false);

  const [newVariant, setNewVariant] = useState("");
  const [newVariantPrice, setNewVariantPrice] = useState("");
  const [newVariantSalePrice, setNewVariantSalePrice] = useState("");

  const toast = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      //get catogories of the current user to display on product category section
      const response = await getCategoriesAPI();
      setCategoriesArray(response.data.data);
      //adding default category to state
      if (defaultCatogory) setProduct({ product_cat: defaultCatogory });
    };
    fetchCategories();
  }, []);

  const clearVariantNew = () => {
    setNewVariant("");
    setNewVariantPrice("");
    setNewVariantIsDiscount(false);
    setNewVariantSalePrice("");
  };
  const deleteCompressedImage = (imageToDelete) => {
    setCompressedImages((prevImages) =>
      prevImages.filter((image) => image.name !== imageToDelete)
    );
  };

  //update variant array objects keys
  const updateVariant = (id, name, value) => {
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

  const validateFields = (formAction) => {
    if (
      product.product_price != "" &&
      product.product_price != undefined &&
      product.product_name != "" &&
      product.product_name != undefined
    ) {
      setIsFormError(false);
      return formAction();
    }
    setIsFormError(true);
  };
  const addProduct = async () => {
    setIsBtnLoading(true);

    let imagesFiltered = compressedImages.map((img) => ({
      product_image: img.name,
    }));

    //set regualr price to sale price if discount is off(is discount is not store in db)
    //also removes  uuid from object
    let variantsFiltered = variantsLocal.map((element) =>
      element.is_discount
        ? { ...element }
        : { ...element, variant_sale_price: element.variant_price }
    );

    //remove is_discount and id
    variantsFiltered = variantsFiltered.map(
      ({ id, is_discount, ...element }) => element
    );

    //set regualr price to sale price if discount is off(is discount is not store in db)
    const response = await addProductAPI({
      ...product,
      product_sale_price: isProductDiscount
        ? product.product_sale_price
        : product.product_price,
      products_variants: variantsFiltered,
      products_images: imagesFiltered,
    });
    console.log(product);

    //upload image to server if any
    if (compressedImages.length > 0)
      await uploadProductImageDO(compressedImages);

    setIsBtnLoading(false);
    toast({
      title: "Product added.",
      description: "Product added successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom",
    });
    //add delay to model Completed product adding
    setTimeout(() => history.push("/app/products/All%20Products/all"), 2000);
  };

  const compressImage = async (event) => {
    setIsCompressing(true);
    //compresses image to below 1MB
    let imagesFromInput = event.target.files;
    const options = {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
      fileType: "image/jpeg",
    };
    const optionsMin = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 360,
      useWebWorker: true,
      fileType: "image/jpeg",
    };
    try {
      //image name notchangin
      for (let i = 0; i < imagesFromInput.length; i++) {
        const compressedFile = await imageCompression(
          imagesFromInput[i],
          options
        );
        const compressedFileMin = await imageCompression(
          imagesFromInput[i],
          optionsMin
        );
        //generate uuid for images
        let imageName = uuidv4() + ".jpg";
        const convertedBlobFile = new File([compressedFile], imageName, {
          type: imagesFromInput[i].type,
          lastModified: Date.now(),
        });
        const convertedBlobFileMin = new File([compressedFileMin], imageName, {
          type: imagesFromInput[i].type,
          lastModified: Date.now(),
        });

        setCompressedImages((oldArray) => [
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
    setIsCompressing(false);
  };

  return (
    <>
      <div className={styles.container}>
        <LabelHeader label={"Add new product"} isBackButton={true} />
        <SimpleGrid column={3} w="90%" mt="5" mb="3" columns={3} spacing="7px">
          <label htmlFor="file-upload" className={styles.customFileUpload}>
            <AddIcon w={8} h={8} />
          </label>
          {compressedImages &&
            compressedImages.map((image) => (
              <div
                key={image.name}
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
                  src={image.imageblob}
                  onClick={() => deleteCompressedImage(image.name)}
                  key={image.name}
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
                  onClick={() => deleteCompressedImage(image.name)}
                  icon={<SmallCloseIcon color="black" w={4} h={4} />}
                />
              </div>
            ))}
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
          onChange={(event) => compressImage(event)}
          onClick={(event) => {
            event.target.value = null;
          }}
          multiple
        />
        <FormControl isRequired w="90%">
          <FormLabel>Product Name</FormLabel>
          <Input
            type="text"
            name="product_name"
            defaultValue={product.product_name}
            variant="filled"
            size="lg"
            placeholder="Product name*"
            onChange={updateProduct}
          />
        </FormControl>
        <FormControl w="90%" mt="4">
          <Stack direction="row" w="100%" justifyContent="space-between">
            <FormLabel>Category</FormLabel>
            <Text
              color="green.500"
              fontWeight="bold"
              onClick={() => history.push("/app/add_category")}
            >
              Add Category
            </Text>
          </Stack>

          <Select
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
            variant="filled"
            size="lg"
            onChange={updateProduct}
          >
            <option value="DEFAULT" disabled>
              select category
            </option>
            {categoriesArray?.map((item, index) => (
              <option value={item.id} key={index}>
                {item.cat_name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl w="90%" mt="4">
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

        <Stack direction="row" w="90%" mt="4">
          <FormControl isRequired w="100%">
            <FormLabel>Product price</FormLabel>
            <Input
              type="number"
              name="product_price"
              defaultValue={product.product_price}
              variant="filled"
              size="lg"
              placeholder="original price*"
              onChange={updateProduct}
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
                value={product.product_sale_price}
                variant="filled"
                size="lg"
                placeholder="sale price"
                onChange={updateProduct}
              />
            </FormControl>
          )}
        </Stack>
        <FormControl w="90%" mt="4">
          <FormLabel>Product Variants</FormLabel>
          <Flex direction="row" flexWrap="wrap">
            {variantsLocal &&
              variantsLocal.map((variant) => (
                <Box
                  borderRadius="5px"
                  border="1px solid #c2c2c2"
                  p="5px"
                  ml="5px"
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
                        <IconButton icon={<EditIcon />} size="sm" mr="6px" />
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
                              updateVariant(
                                variant.id,
                                "variant_name",
                                e.target.value
                              )
                            }
                          />
                          <FormLabel mt="10px">Discount</FormLabel>
                          <Switch
                            onChange={() =>
                              updateVariant(
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
                                  updateVariant(
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
                                    updateVariant(
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
                                  (variantCurr) => variantCurr.id !== variant.id
                                )
                              );
                              close();
                            }}
                            mr="8px"
                          >
                            Delete
                          </Button>
                          <Button colorScheme="blue" onClick={close}>
                            Update Variant
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
              setNewVariantIsDiscount(isProductDiscount);
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
                  value={newVariant || ""}
                  onChange={(e) => setNewVariant(e.target.value)}
                />
                <FormLabel mt="10px">Discount</FormLabel>
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
                      value={newVariantPrice || ""}
                      onChange={(e) => setNewVariantPrice(e.target.value)}
                      mb="18px"
                    />
                  </Box>
                  {newVariantIsDiscount && (
                    <Box>
                      <FormLabel>Selling Price</FormLabel>

                      <Input
                        type="number"
                        value={newVariantSalePrice || ""}
                        onChange={(e) => setNewVariantSalePrice(e.target.value)}
                        mb="18px"
                      />
                    </Box>
                  )}
                </Stack>
                <Button
                  onClick={() => {
                    close();
                    clearVariantNew();
                  }}
                  mr="8px"
                >
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
                          variant_name: newVariant,
                          is_discount: newVariantIsDiscount,
                          variant_price: newVariantPrice,
                          variant_sale_price: newVariantIsDiscount
                            ? newVariantSalePrice
                            : newVariantPrice,
                        },
                      ]);
                      clearVariantNew();
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
        <FormControl w="90%" mt="4">
          <FormLabel>Description</FormLabel>
          <Textarea
            type="textarea"
            name="product_desc"
            defaultValue={product.product_desc}
            variant="filled"
            placeholder="Description"
            rows="4"
            onChange={updateProduct}
          />
        </FormControl>
        {isFormError && (
          <h1 style={{ color: "red" }}>Please fill all required details</h1>
        )}
        <Button
          backgroundColor="#08bd80"
          color="white"
          colorScheme="green"
          w="90%"
          isDisabled={isCompressing}
          isLoading={isBtnLoading}
          loadingText="Uploading"
          onClick={() => validateFields(addProduct)}
          size="lg"
          mb="80px"
          mt="10px"
        >
          Add Product
        </Button>
      </div>
    </>
  );
};

export default AddNewProduct;
