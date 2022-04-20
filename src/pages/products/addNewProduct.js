import FocusLock from "@chakra-ui/focus-lock";
import { AddIcon, EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useHeader } from "utils/useHeader";
import { v4 as uuidv4 } from "uuid";
import { uploadProductImageDO } from "../../api/imageUploadAPI";
import { getCategoriesAPI } from "../../api/sellerCategoryAPI";
import { addProductAPI } from "../../api/sellerProductAPI";
import { Container } from "../../components/Container";
import { useForm } from "../../components/useForm";
import { productImageCompresser } from "../../utils/imageCompresser";
import AddNewCategoryDrawer from "../categories/addCategoryModel";
import styles from "../css/addNewProduct.module.css";

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
  const [newVariantInventoryCount, setNewVariantInventoryCount] = useState("");

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const { setHeader } = useHeader();

  const toast = useToast();

  useEffect(() => {
    setHeader({ title: "Add New Product", isBackButton: true });
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    //get catogories of the current user to display on product category section
    const response = await getCategoriesAPI();
    setCategoriesArray(response.data.data);
    //adding default category to state
    if (defaultCatogory) setProduct({ product_cat: defaultCatogory });
  };

  const clearVariantNew = () => {
    setNewVariant("");
    setNewVariantPrice("");
    setNewVariantIsDiscount(false);
    setNewVariantSalePrice("");
    setNewVariantInventoryCount("");
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
    let imagesFromInput = event.target.files;

    try {
      //image name notchangin
      for (let image of imagesFromInput) {
        //generate uuid for images
        let imageName = uuidv4() + ".jpg";
        let compressedImages = await productImageCompresser(image, imageName);

        setCompressedImages((oldArray) => [
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

  return (
    <Container>
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
            onClick={() => setIsCategoryModalOpen(true)}
          >
            Add Category
          </Text>
        </Stack>

        <Select
          name="product_cat"
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
                      (100 * product.product_sale_price) / product.product_price
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
        <FormLabel>Product Stock</FormLabel>
        <Input
          type="number"
          name="product_inventory_count"
          variant="filled"
          size="lg"
          placeholder="Enter quantity"
          onChange={updateProduct}
        />
      </FormControl>
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
                        <FormLabel> Stock Count</FormLabel>
                        <Input
                          mb="10px"
                          type="text"
                          value={variant.variant_inventory_count}
                          onChange={(e) =>
                            updateVariant(
                              variant.id,
                              "variant_inventory_count",
                              e.target.value
                            )
                          }
                        />
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
                variant="filled"
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
                    variant="filled"
                    onChange={(e) => setNewVariantPrice(e.target.value)}
                  />
                </Box>
                {newVariantIsDiscount && (
                  <Box>
                    <FormLabel>Selling Price</FormLabel>
                    <Input
                      type="number"
                      value={newVariantSalePrice || ""}
                      variant="filled"
                      onChange={(e) => setNewVariantSalePrice(e.target.value)}
                    />
                  </Box>
                )}
              </Stack>
              <FormControl mt="4" mb="5">
                <FormLabel>Stock Count</FormLabel>
                <Input
                  type="text"
                  name="variant_inventory_count"
                  variant="filled"
                  placeholder="Enter quantity"
                  value={newVariantInventoryCount || ""}
                  onChange={(e) => setNewVariantInventoryCount(e.target.value)}
                />
              </FormControl>
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
                        variant_inventory_count: newVariantInventoryCount,
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
      <AddNewCategoryDrawer
        fetchCategories={fetchCategories}
        isDrawerOpen={isCategoryModalOpen}
        setIsDrawerOpen={setIsCategoryModalOpen}
      />
    </Container>
  );
};

export default AddNewProduct;
