import React, { useState, useEffect } from "react";
import styles from "../css/addNewProduct.module.css";
import { getCategoriesAPI } from "../../../api/sellerCategoryAPI";
import { useHistory } from "react-router-dom";
import LabelHeader from "../../../components/labelHeader";
import imageCompression from "browser-image-compression";
import { useForm } from "../../../components/useForm";
import { Badge, Box, Flex, Switch, Text } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import {
  addProductAPI,
  addProductsVariantAPI,
  uploadProductImageAPI,
} from "../../../api/sellerProductAPI";
import { SmallCloseIcon, AddIcon, CloseIcon } from "@chakra-ui/icons";
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

const AddNewProduct = (props) => {
  const history = useHistory();

  const [product, setProduct, updateProduct] = useForm([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const defaultCatogory = props.match.params.catogory;
  const [compressedImages, setCompressedImages] = useState([]);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [isFormError, setIsFormError] = useState(false);
  const [variantsLocal, setVariantsLocal] = useState([]);
  const [newVariant, setNewVariant] = useState("");
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

  const deleteCompressedImage = (imageToDelete) => {
    setCompressedImages((prevImages) =>
      prevImages.filter((image) => image.name !== imageToDelete)
    );
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
    const response = await addProductAPI(product);
    console.log(response.data);
    const productId = response.data.data.id;

    //clean up variants and add to server if any
    if (variantsLocal.length > 0) {
      let variantsFiltered = variantsLocal.map((variant) => ({
        variant_name: variant.variant_name,
        product_id: productId,
      }));
      await addProductsVariantAPI(variantsFiltered);
    }
    //upload image to server if any
    if (compressedImages.length > 0) {
      const responseImageUpload = await uploadProductImageAPI(
        compressedImages,
        productId
      );
    }
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
    const optionsMin = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 400,
      useWebWorker: true,
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
        let imageName = uuidv4();

        console.log(compressedFile);

        const convertedBlobFile = new File([compressedFile], imageName, {
          type: imagesFromInput[i].type,
          lastModified: Date.now(),
        });
        console.log(convertedBlobFile);
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
          <FormLabel>Category</FormLabel>
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
            {categoriesArray.map((item, index) => (
              <option value={item.id} key={index}>
                {item.cat_name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl w="90%" mt="4">
          <FormLabel>Discount</FormLabel>
          <Switch
            onChange={handleIsOnSale}
            size="lg"
            colorScheme="green"
            isChecked={product.product_is_sale}
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
                type="number"
                name="product_sale_price"
                defaultValue={product.product_sale_price}
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
                      onClick={() =>
                        setVariantsLocal((old) =>
                          old.filter(
                            (variantCurr) => variantCurr.id !== variant.id
                          )
                        )
                      }
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
                        { id: uuidv4(), variant_name: newVariant },
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
          colorScheme="green"
          w="90%"
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
