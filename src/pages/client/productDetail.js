import React, { useState, useEffect } from "react";
import Whatsapp from "../../assets/whatsapp_filled.svg";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import CartIconBlack from "../../assets/cartIconblack.svg";
import WhatsappClean from "../../assets/whatsapp_clean.svg";
import { getProductDetailAPI } from "../../api/custStoreAPI";

import ImageModal from "../../components/ImageModal";
import {
  Button,
  IconButton,
  useDisclosure,
  Box,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { UilShareAlt } from "@iconscout/react-unicons";

import styles from "./css/productDetail.module.css";
import { useHistory } from "react-router-dom";
import { updateMessagesStarted } from "../../api/custAnalyticsAPI";
import { Skeleton, useToast } from "@chakra-ui/react";
import useStore from "../../cartState";
import { productImagesRoot } from "../../config";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const ProductDetail = (props) => {
  const [productData, setProductData] = useState(null);
  const [storeData, setStoreData] = useState({});
  const [similarProducts, setSimilarProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const productId = props.match.params.productId;
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [popupImage, setPopupImage] = useState("");
  const [priceLast, setPriceLast] = useState({ price: "_", sale: "_" });
  const {
    isOpen: isImageOpen,
    onOpen: onImageOpen,
    onClose: onImageClose,
  } = useDisclosure();

  const toast = useToast();
  const cartProducts = useStore((state) => state.products);
  const addToCartState = useStore((state) => state.addProduct);

  useEffect(() => {
    if (productData?.products_variants.length > 0) {
      let minVariant = productData.products_variants?.reduce((prev, curr) =>
        prev.variant_sale_price < curr.variant_sale_price ? prev : curr
      );
      setPriceLast({
        price: minVariant.variant_price,
        sale: minVariant.variant_sale_price,
      });
    } else {
      setPriceLast({
        price: productData?.product_price,
        sale: productData?.product_sale_price,
      });
    }
    console.log(productData);
  }, [productData]);

  //get product data from server
  useEffect(() => {
    window.scrollTo(0, 0);
    props.location.state && setProductData(props.location.state);
    const getProduct = async () => {
      const productResponse = await getProductDetailAPI(productId);
      !props.location.state &&
        setProductData(productResponse.data.data.product);
      setStoreData(productResponse.data.data.storeinfo);
      setSimilarProducts(productResponse.data.data.similarproducts);

      setIsLoading(false);
    };
    getProduct();
  }, []);

  const DiscountPriceText = ({ price, sale }) => {
    return (
      <>
        <h1 className={styles.product_price}>₹{sale}</h1>
        <h1 className={styles.product_price_strike}>₹{price}</h1>
        <div className={styles.product_discount}>
          {" "}
          {parseInt(100 - (100 * sale) / price)}% OFF
        </div>
      </>
    );
  };

  const validateBuy = (callback) => {
    setIsError(false);
    if (selectedVariant !== "" || productData.products_variants.length < 1)
      callback();
    else setIsError(true);
  };

  const addToCart = () => {
    const productFinalPrice = selectedVariant
      ? selectedVariant.variant_sale_price
      : productData.product_sale_price;
    addToCartState({
      store_id: storeData.id,
      product_id: productData.id,
      product_name: productData.product_name,
      product_image: productData.products_images[0].product_image,
      product_price: productFinalPrice,
      product_variant: selectedVariant,
      product_quantity: 1,
      //unique id for identify with reference to variant
      product_id_gen: `${productData.id}${
        selectedVariant && selectedVariant.id
      }`,
    });
    toast({
      position: "top",
      duration: 1000,
      render: () => (
        <Box
          color="white"
          p={3}
          mt="60px"
          bg="green.500"
          borderRadius="30px"
          textAlign="center"
        >
          Succesfully Added To Bag
        </Box>
      ),
    });
  };

  const whatsappBuy = async () => {
    updateMessagesStarted(storeData.id);
    const productsMsg = `• ${productData.product_name} ${
      selectedVariant && `(${selectedVariant.variant_name})`
    } x 1 -   ₹${
      selectedVariant
        ? selectedVariant.variant_sale_price
        : productData.product_sale_price
    } %0D%0A`;
    const whatsappMessage = `Hey👋 %0D%0AI want to place an order %0D%0A%0D%0A*Order*%0D%0A${productsMsg} %0D%0A *Total: ₹${
      selectedVariant
        ? selectedVariant.variant_sale_price
        : productData.product_sale_price
    }*%0D%0A _______________________%0D%0A%0D%0A Powered by Saav.in`;
    window.location.replace(
      `https://api.whatsapp.com/send/?phone=91${storeData.account_whatsapp}&text=${whatsappMessage}`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftGrid}>
        <ImageModal
          isImageOpen={isImageOpen}
          onImageClose={onImageClose}
          image={popupImage}
        />
        <div className={styles.header}>
          <Box
            width="80px"
            height="80px"
            position="fixed"
            top="1px"
            left="1px"
            zIndex="1"
            display="grid"
            placeItems="center"
            onClick={() => history.goBack()}
          >
            <IconButton
              width="40px"
              height="40px"
              icon={<ChevronLeftIcon boxSize="30px" color="#fff" />}
              borderRadius="100%"
              backgroundColor="#212121"
            />
          </Box>
          <Box
            width="60px"
            height="60px"
            position="fixed"
            top="25px"
            right="25px"
            zIndex="1"
            onClick={() => history.push(`/cart/${storeData.id}`)}
          >
            <IconButton
              width="60px"
              height="60px"
              icon={<img src={CartIconBlack} width="40px" />}
              borderRadius="100%"
            />
            <div className={styles.cart_count}>
              {cartProducts
                .filter((prd) => prd.store_id == storeData.id)
                .reduce((acc, curr) => acc + curr.product_quantity, 0)}
            </div>
          </Box>
        </div>
        {!productData && (
          <div className={styles.image_slider}>
            <Skeleton height="50vh" width="100%" borderRadius="6px" />
          </div>
        )}

        <div className={styles.image_slider}>
          {productData?.products_images.length == 1 ? (
            <Image
              w="100%"
              objectFit="cover"
              objectPosition="top"
              onClick={() => {
                setPopupImage(
                  `${productImagesRoot}/${productData.products_images[0].product_image}`
                );
                onImageOpen();
              }}
              src={
                productData.products_images[0] ? (
                  `${productImagesRoot}/${productData.products_images[0].product_image}`
                ) : (
                  <Skeleton height="50vh" borderRadius="6px" />
                )
              }
            />
          ) : (
            productData?.products_images.map((image) => (
              <Image
                onClick={() => {
                  setPopupImage(`${productImagesRoot}/${image.product_image}`);
                  onImageOpen();
                }}
                mr="5px"
                minWidth="80%"
                objectFit="cover"
                objectPosition="top left"
                src={
                  image.product_image ? (
                    `${productImagesRoot}/${image.product_image}`
                  ) : (
                    <Skeleton height="50vh" borderRadius="6px" />
                  )
                }
              />
            ))
          )}
        </div>
      </div>

      {/* <div className={styles.button_back} onClick={() => history.goBack()}>
        <img src={BackIcon} width="25px" />
      </div> */}

      {/* right grid */}
      <div className={styles.rightGrid}>
        {!productData ? (
          <Stack direction="column" mt="20px" p="12px">
            <Skeleton height="30px" w="50%" />
            <Skeleton height="30px" mt="10px" w="30%" mb="18px" />
            <Stack direction="row" mt="30px">
              <Skeleton height="45px" borderRadius="48px" w="60px" mb="18px" />
              <Skeleton
                height="45px"
                borderRadius="48px"
                ml="5%"
                w="70px"
                mb="18px"
              />
              <Skeleton height="45px" borderRadius="48px" w="80px" mb="18px" />
            </Stack>
            <Skeleton height="60px" w="98%" borderRadius="48px" />
            <Skeleton height="60px" mt="15px" w="98%" borderRadius="48px" />
          </Stack>
        ) : (
          <>
            <div className={styles.product_details_container}>
              <h1 className={styles.product_name}>
                {productData.product_name}
              </h1>
              <Stack direction="row" justifyContent="space-between">
                <div className={styles.price_container}>
                  <>
                    {selectedVariant ? (
                      selectedVariant.variant_price ===
                      selectedVariant.variant_sale_price ? (
                        <h1 className={styles.product_price}>
                          ₹{selectedVariant.variant_sale_price}
                        </h1>
                      ) : (
                        <DiscountPriceText
                          price={selectedVariant.variant_price}
                          sale={selectedVariant.variant_sale_price}
                        />
                      )
                    ) : priceLast.price === priceLast.sale ? (
                      <h1 className={styles.product_price}>
                        ₹{priceLast.sale}
                      </h1>
                    ) : (
                      <DiscountPriceText
                        price={priceLast.price}
                        sale={priceLast.sale}
                      />
                    )}
                  </>
                </div>
                <Stack direction="row" ml="10px">
                  <IconButton
                    icon={
                      <img
                        src={Whatsapp}
                        width="25px"
                        onClick={() => {
                          window.location.replace(
                            `https://api.whatsapp.com/send/?text=Checkout this ${productData.product_name} on ${storeData.account_store} online store 🎉. %0D%0A%0D%0A ${window.location.href}`
                          );
                        }}
                      />
                    }
                    borderRadius="full"
                  />
                  <IconButton
                    icon={<UilShareAlt size="20" />}
                    borderRadius="full"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: productData.product_name,
                          url: window.location.href,
                        });
                      }
                    }}
                  />
                </Stack>
              </Stack>
              {productData?.products_variants?.length > 0 && (
                <>
                  <h3 className={styles.sub_heading}>Variants:</h3>
                  <div className={styles.variant_container}>
                    {productData.products_variants.map((variant) => (
                      <div
                        key={variant.id}
                        className={
                          selectedVariant.id == variant.id
                            ? styles.variant_item_selected
                            : styles.variant_item
                        }
                        onClick={() => {
                          setIsError(false);
                          setSelectedVariant(variant);
                        }}
                      >
                        {variant.variant_name}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {isError && (
                <Text
                  mt="6px"
                  ml="10px"
                  color="red.500"
                  fontSize="20px"
                  fontFamily="elemen"
                  className={styles.shake_horizontal}
                >
                  Plese Select a option
                </Text>
              )}
            </div>
            <div className={styles.divider_gray}></div>

            <div
              className={styles.product_desc_container}
              style={{ whiteSpace: "pre-wrap" }}
            >
              <div className={styles.product_desc_title}>Description</div>

              <p className={styles.product_desc_body}>
                {productData.product_desc
                  ? productData.product_desc
                  : "No Description Available"}
              </p>
            </div>

            <div className={styles.divider_gray}></div>

            <div
              className={styles.product_desc_container}
              style={{ paddingBottom: "100px" }}
            >
              <div className={styles.product_desc_title}>About This Seller</div>

              <p className={styles.product_desc_body}>
                This item is sold by{" "}
                <span
                  style={{ color: "blue" }}
                  onClick={() =>
                    history.push(`/store/${storeData.account_store_link}`)
                  }
                >
                  {storeData.account_store}
                </span>
                <br />
                {storeData.account_store_address}
              </p>
            </div>
          </>
        )}
      </div>
      {productData?.product_stock !== 0 ? (
        <Stack
          direction="row"
          backgroundColor="#fff"
          padding="5px"
          w="100%"
          position="fixed"
          pb="10px"
          bottom="0px"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        >
          <Button
            // leftIcon={
            //   <img src={CartIconBlack} className={styles.add_cart_icon} />
            // }
            alignSelf="center"
            fontSize="18px"
            w="75%"
            color="#141414"
            h="58px"
            fontFamily="elemen"
            onClick={() => validateBuy(addToCart)}
          >
            Add to Bag
          </Button>
          <Button
            alignSelf="center"
            size="lg"
            w="100%"
            onClick={() => validateBuy(whatsappBuy)}
            leftIcon={
              <img src={WhatsappClean} className={styles.buy_now_icon} />
            }
            h="58px"
            backgroundColor="#08BD80"
            color="white"
            fontFamily="elemen"
            _hover={{ bg: "#048c5e" }}
          >
            Buy On Whatsapp
          </Button>
        </Stack>
      ) : (
        <Stack
          direction="row"
          backgroundColor="#fff"
          padding="5px"
          w="100%"
          display="flex"
          justifyContent="center"
          position="fixed"
          pb="10px"
          bottom="0px"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        >
          <Button
            alignSelf="center"
            size="lg"
            w="95%"
            p="10px"
            h="60px"
            backgroundColor="#ff8763"
            color="white"
            fontFamily="elemen"
          >
            Out Of Stock
          </Button>
        </Stack>
      )}
    </div>
  );
};

export default ProductDetail;
