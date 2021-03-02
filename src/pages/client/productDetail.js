import React, { useState, useEffect } from "react";
import styles from "./css/productDetail.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import WhatsappLogo from "../../assets/logo-whatsapp.svg";
import CartIcon from "../../assets/cart-outline.svg";
import { getProductDetailAPI } from "../../api/custStoreAPI";
import { productImagesRoot } from "../../config";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Image,
  Button,
  IconButton,
  Skeleton,
  Input,
  Stack,
  FormControl,
  Select,
  FormErrorMessage,
  FormLabel,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { Tag, HStack } from "@chakra-ui/react";

import { ArrowBackIcon, CheckCircleIcon, EmailIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { updateMessagesStarted } from "../../api/custAnalyticsAPI";
import { useToast } from "@chakra-ui/react";

const ProductDetail = (props) => {
  const [productData, setProductData] = useState({});
  const [storeData, setStoreData] = useState({});
  const [selectedUnit, setSelectedUnit] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [similarProducts, setSimilarProducts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAddedCart, setIsAddedCart] = useState(false);
  const productId = props.match.params.productId;
  const history = useHistory();
  const toast = useToast();

  const unitsObject = {
    kg: {
      units: ["gm", "kg"],
      default_value: 500,
      value_sets: [
        { value: 100, unit: "gm" },
        { value: 250, unit: "gm" },
        { value: 500, unit: "gm" },
        { value: 1, unit: "kg" },
      ],
    },
    litre: {
      units: ["ml", "litre"],
      default_value: 500,
      value_sets: [
        { value: 100, unit: "ml" },
        { value: 250, unit: "ml" },
        { value: 500, unit: "ml" },
        { value: 1, unit: "litre" },
      ],
    },
    piece: {
      units: ["piece"],
      default_value: 1,
      value_sets: [
        { value: 1, unit: "piece" },
        { value: 2, unit: "piece" },
        { value: 5, unit: "piece" },
      ],
    },
  };

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      const productResponse = await getProductDetailAPI(productId);
      setProductData(productResponse.data.data.product);
      setSelectedUnit(
        unitsObject[productResponse.data.data.product.product_unit].units[0]
      );
      setProductQuantity(
        unitsObject[productResponse.data.data.product.product_unit]
          .default_value
      );
      setStoreData(productResponse.data.data.storeinfo);
      setSimilarProducts(productResponse.data.data.similarproducts);
      setIsLoading(false);
      console.log(productResponse);
    };
    getProduct();
  }, []);

  //handle add to favourates button click
  // const handleFavourates = (
  //   store_id,
  //   product_id,
  //   product_name,
  //   product_image
  // ) => {
  //   if (localStorage.getItem("favourates")) {
  //     let storedArr = JSON.parse(localStorage.getItem("favourates"));
  //     let isContains = storedArr.some(
  //       (product) => product.product_id == product_id
  //     );
  //     if (!isContains) {
  //       let favouratesArr = [
  //         { store_id, product_id, product_image, product_name },
  //         ...storedArr,
  //       ];
  //       localStorage.setItem("favourates", JSON.stringify(favouratesArr));
  //     }
  //   } else {
  //     localStorage.setItem(
  //       "favourates",
  //       JSON.stringify([{ store_id, product_id, product_image, product_name }])
  //     );
  //   }
  // };
  const validateAddToCart = (callback) => {
    if (productQuantity > 0) callback();
  };
  const addToCart = (store_id, product_id, product_name, product_image) => {
    let productObject = {
      store_id,
      product_id,
      product_image,
      product_name,
      product_quantity: `${productQuantity} ${selectedUnit}`,
    };
    if (localStorage.getItem("cart")) {
      let storedArr = JSON.parse(localStorage.getItem("cart"));
      let isContains = storedArr.some(
        (product) => product.product_id === product_id
      );
      if (!isContains) {
        let cartArr = [productObject, ...storedArr];
        localStorage.setItem("cart", JSON.stringify(cartArr));
      } else {
        //remove existing product and replace with new
        const productsOther = storedArr.filter(
          (product) => product.product_id != parseInt(productId)
        );
        console.log(productsOther);
        let cartArr = [productObject, ...productsOther];
        localStorage.setItem("cart", JSON.stringify(cartArr));
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([productObject]));
    }
    setIsAddedCart(true);
    toast({
      title: "Product Added To Cart",
      status: "success",
      duration: 2000,
      position: "top",
      isClosable: true,
    });
  };
  const whatsappBuy = async () => {
    updateMessagesStarted(storeData.id);
    const productsMsg = `• ${
      productData.product_name
    }   -   ${`${productQuantity} ${selectedUnit}`} %0D%0A`;
    const whatsappMessage = `Hey👋 %0D%0AI want to place an order %0D%0A%0D%0A*Order*%0D%0A${productsMsg}_______________________%0D%0A%0D%0A Powered by Shopwhats`;
    window.location.replace(
      `https://api.whatsapp.com/send/?phone=919496742190&text=${whatsappMessage}`
    );
  };
  return (
    <HelmetProvider>
      <div className={styles.container}>
        {productData && (
          <Helmet>
            <meta charSet="utf-8" />
            <title>{productData.product_name}</title>
            <meta name="description" content={productData.product_desc} />
            {productData.images && (
              <meta
                property="og:image"
                content={`${productImagesRoot}/${productData.products_images[0].product_image}`}
              />
            )}
          </Helmet>
        )}
        {isLoading && <Skeleton height="350px" width="100%" />}
        <Carousel
          className={styles.image_slider}
          infiniteLoop
          dynamicHeight
          showThumbs={false}
          showStatus={false}
        >
          {productData.products_images &&
            productData.products_images.map((image) => {
              return (
                <div
                  key={image.id}
                  style={{ height: 350, backgroundColor: `white` }}
                >
                  <img
                    src={`${productImagesRoot}/${image.product_image}`}
                    style={{
                      objectFit: "cover",
                      height: 350,
                    }}
                  />
                </div>
              );
            })}
        </Carousel>
        <IconButton
          backgroundColor="gray"
          borderRadius="30px"
          aria-label="Search database"
          icon={<ArrowBackIcon color="black" w={5} h={5} />}
          pos="fixed"
          top="3"
          left="3"
          onClick={() => history.goBack()}
        />
        <IconButton
          backgroundColor="#ffbe0f"
          borderRadius="30px"
          aria-label="Search database"
          icon={<Image src={CartIcon} w={30} h={30} />}
          pos="fixed"
          top="4"
          right="4"
          w="60px"
          h="60px"
          onClick={() => history.push(`/cart/${storeData.id}`)}
        />

        <h1 className={styles.product_name}>{productData.product_name}</h1>
        {productData.product_is_sale == 0 ? (
          <h1 className={styles.product_price}>₹{productData.product_price}</h1>
        ) : (
          <Stack direction="row" w="95%" mt="2">
            <h1 className={styles.product_price_strike}>
              ₹{productData.product_price}
            </h1>
            <h1 className={styles.product_price}>
              ₹{productData.product_sale_price}
            </h1>
          </Stack>
        )}
        {/* predefined quantities */}
        <Box w="90%">
          <FormLabel alignSelf="flex-start">Quantity</FormLabel>
          <HStack spacing={4} alignSelf="flex-start">
            {productData.product_unit &&
              unitsObject[productData.product_unit].value_sets.map(
                (set, index) => (
                  <Button
                    size="sm"
                    key={index}
                    variant="solid"
                    variant="outline"
                    onClick={() => {
                      setProductQuantity(set.value);
                      setSelectedUnit(set.unit);
                    }}
                  >
                    {`${set.value} ${set.unit}`}
                  </Button>
                )
              )}
          </HStack>

          <Stack direction="row" w="70%" mt="4" mb="1" alignSelf="flex-start">
            <FormControl
              isRequired
              w="50%"
              isInvalid={productQuantity.length < 1}
            >
              <Input
                type="number"
                name="product_quantity"
                variant="filled"
                size="lg"
                value={productQuantity}
                placeholder="quantity"
                onChange={(e) => setProductQuantity(e.target.value)}
              />

              <FormErrorMessage>Please add product quantity</FormErrorMessage>
            </FormControl>

            <FormControl w="50%">
              <Select
                name="product_unit"
                value={selectedUnit || ""}
                variant="filled"
                size="lg"
                onChange={(e) => setSelectedUnit(e.target.value)}
              >
                {productData.product_unit &&
                  unitsObject[productData.product_unit].units.map(
                    (unit, index) => (
                      <option value={unit} key={index}>
                        {unit}
                      </option>
                    )
                  )}
              </Select>
            </FormControl>
          </Stack>
        </Box>
        {/* {productData.id && (
          <button
            className={styles.btn_favourites}
            onClick={() =>
              handleFavourates(
                storeData.id,
                productData.id,
                productData.product_name,
                productData.products_images[0].product_image
              )
            }
          >
            <img
              src={FavouritesIcon}
              alt="w"
              className={styles.favouritesicon}
            />
            Add to favourites
          </button>
        )} */}
        {
          !isAddedCart ? (
            <Button
              w="90%"
              size="lg"
              leftIcon={<Image src={CartIcon} className={styles.carticon} />}
              style={{ backgroundColor: "#00b140" }}
              color="white"
              mt="2"
              paddingBottom="8"
              paddingTop="8"
              variant="solid"
              onClick={() =>
                validateAddToCart(() =>
                  addToCart(
                    storeData.id,
                    productData.id,
                    productData.product_name,
                    productData.products_images[0].product_image
                  )
                )
              }
            >
              ADD TO CART
            </Button>
          ) : (
            <Button
              w="90%"
              paddingBottom="8"
              paddingTop="8"
              size="lg"
              leftIcon={<CheckCircleIcon color="white" w="25px" h="25px" />}
              style={{ backgroundColor: "#ff8826" }}
              color="white"
              mt="2"
              variant="solid"
              onClick={() => history.push(`/cart/${storeData.id}`)}
            >
              GO TO CART
            </Button>
          )

          // <button
          //   className={styles.btn_cart}
          //   onClick={() =>
          //     validateAddToCart(() =>
          //       addToCart(
          //         storeData.id,
          //         productData.id,
          //         productData.product_name,
          //         productData.products_images[0].product_image
          //       )
          //     )
          //   }
          // >
          //   <img src={CartIcon} alt="w" className={styles.carticon} />
          //   Add to Cart
          // </button>
        }
        {/* <button className={styles.btn_whatsapp} onClick={whatsappBuy}>
          <img src={WhatsappLogo} alt="w" className={styles.whatsappicon} />
          Buy on whatsapp
        </button> */}
        <h1 className={styles.desc_heading}>Description</h1>
        <h1 className={styles.description}>{productData.product_desc}</h1>
      </div>
    </HelmetProvider>
  );
};

export default ProductDetail;
