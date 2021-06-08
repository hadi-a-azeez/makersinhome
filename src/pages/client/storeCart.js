import React, { useEffect, useState } from "react";
import styles from "./css/favourites.module.css";
import { useHistory } from "react-router-dom";
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import Whatsapp from "../../assets/logo-whatsapp.svg";
import {
  IconButton,
  Button,
  Flex,
  Stack,
  Text,
  Image,
  Heading,
  Alert,
  AlertIcon,
  Box,
  Grid,
  CircularProgress,
} from "@chakra-ui/react";
import DeepDiff from "deep-diff";

import CartIcon from "../../assets/shopping_bag_empty.png";
//import CartIconFilled from "../../assets/cart-filled.svg";
import {
  getStoreDataByIdAPI,
  getStoreProductsByArray,
} from "../../api/custStoreAPI";
import useStore from "../../cartState";
import _ from "lodash";
import { productImagesRoot } from "../../config";
import { updateMessagesStarted } from "../../api/custAnalyticsAPI";
import ProductCardCart from "./components/ProductCardCart";

const StoreCart = (props) => {
  const history = useHistory();
  const [storeData, setStoreData] = useState({});
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [priceUpdatedProducts, setPriceUpdatedProducts] = useState([]);
  const cartProducts = useStore((state) => state.products);
  const setCartProducts = useStore((state) => state.setCartProducts);
  const [cartProductsUpdated, setCartProductsUpdated] = useState([]);

  let storeId = props.match.params.store_id;

  const cartActions = {
    deleteProduct: (product) => {
      setCartProductsUpdated((old) =>
        old.filter((prd) => prd.product_id_gen != product.product_id_gen)
      );
    },
    addQuantity: (product) => {
      const productIndex = cartProductsUpdated.findIndex(
        (productInState) =>
          productInState.product_id_gen === product.product_id_gen
      );

      const productsArr = [...cartProductsUpdated];
      productsArr[productIndex] = {
        ...productsArr[productIndex],
        product_quantity: ++productsArr[productIndex].product_quantity,
      };

      setCartProductsUpdated(productsArr);
    },
    removeQuantity: (product) => {
      const productIndex = cartProductsUpdated.findIndex(
        (productInState) =>
          productInState.product_id_gen === product.product_id_gen
      );

      const productsArr = [...cartProductsUpdated];
      if (productsArr[productIndex].product_quantity !== 1)
        productsArr[productIndex] = {
          ...productsArr[productIndex],
          product_quantity: --productsArr[productIndex].product_quantity,
        };

      setCartProductsUpdated(productsArr);
    },
  };
  // get store details from server
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getStoreDataByIdAPI(storeId);
      console.log(response);
      setStoreData(response.data.data);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: productsFetched } = await getStoreProductsByArray(
        cartProducts
          .filter((prd) => prd.store_id == storeId)
          .map((item) => item.product_id)
      );

      if (!cartProducts[0]?.product_sale_price) {
        return setCartProducts([]);
      }

      let mergedProducts = cartProducts
        .filter((prd) => prd.store_id == storeId)
        .map((item) => [
          item,
          productsFetched.data.find(
            (element) => item.product_id === element.id
          ),
        ]);

      //compare in cart and products from server
      let filteredProducts = mergedProducts.map((item) => {
        if (item[1] && item[1].product_stock === 1) {
          if (item[1].products_variants.length > 0) {
            const selectedVariant = item[1].products_variants.find(
              (element) => element.id === item[0].product_variant.id
            );
            if (selectedVariant) {
              if (
                selectedVariant.variant_sale_price !==
                item[0].product_variant.variant_sale_price
              ) {
                setPriceUpdatedProducts((old) => [
                  ...old,
                  {
                    name: item[0].product_name,
                    old: item[0].product_variant.variant_sale_price,
                    new: selectedVariant.variant_sale_price,
                  },
                ]);
              }
              return {
                ...item[0],
                ...item[1],
                product_variant: selectedVariant,
                valid: true,
              };
            }
            return { ...item[0], valid: false };
          } else {
            if (item[0].product_sale_price !== item[1].product_sale_price) {
              setPriceUpdatedProducts((old) => [
                ...old,
                {
                  name: item[0].product_name,
                  old: item[0].product_sale_price,
                  new: item[1].product_sale_price,
                },
              ]);
            }
            return { ...item[0], ...item[1], valid: true };
          }
        } else return { ...item[0], valid: false };
      });

      setIsCartEmpty(filteredProducts.length < 1);

      setCartProductsUpdated(filteredProducts);
    };

    cartProducts.filter((prd) => prd.store_id == storeId).length > 0 &&
    cartProductsUpdated.length < 1
      ? fetchData()
      : setIsCartEmpty(true);
  }, [cartProducts]);

  const whatsappBuy = async () => {
    updateMessagesStarted(storeId);

    const productsMsg = cartProductsUpdated
      .filter((prd) => prd.valid)
      .map(
        (item) =>
          `• ${item.product_name} ${
            item.product_variant && `(${item.product_variant.variant_name})`
          }   x   ${item.product_quantity} - ₹${
            item.product_quantity *
            (item.products_variants.length > 0
              ? item.product_variant.variant_sale_price
              : item.product_sale_price)
          }%0D%0A `
      );
    const whatsappMessage = `Hey👋 %0D%0AI want to place an order %0D%0A%0D%0A*Order*%0D%0A${productsMsg.join(
      ""
    )}%0D%0A Total: ₹${cartProductsUpdated
      .filter((prd) => prd.valid)
      .reduce(
        (acc, curr) =>
          acc +
          curr.product_quantity *
            (curr.products_variants.length > 0
              ? curr.product_variant.variant_sale_price
              : curr.product_sale_price),
        0
      )}%0D%0A_______________________%0D%0A%0D%0A Powered by Saav.in`;
    window.location.replace(
      `https://api.whatsapp.com/send/?phone=91${storeData.account_whatsapp}&text=${whatsappMessage}`
    );
  };

  //check if current store has any favourates saved by user

  return (
    <div className={styles.container}>
      <IconButton
        backgroundColor="#f8f9fd"
        borderRadius="30px"
        aria-label="Search database"
        icon={<ArrowBackIcon color="black" w={8} h={8} />}
        pos="fixed"
        top="3"
        left="3"
        onClick={() => history.goBack()}
      />
      <Stack direction="row" w="90%" mt="60px" justifyContent="space-between">
        <h1 className={styles.heading}>Bag</h1>
        <Stack direction="row" alignItems="center">
          <Text
            fontFamily="elemen"
            fontWeight="600"
            fontSize="20px"
            color="gray.600"
          >
            Total :{" "}
          </Text>
          <div
            style={{
              fontFamily: "elemen",
              fontWeight: "800",
              fontSize: "30px",
              color: "#00b140",
            }}
          >
            ₹
            {cartProductsUpdated
              .filter((prd) => prd.valid)
              .reduce(
                (acc, curr) =>
                  acc +
                  curr.product_quantity *
                    (curr.products_variants.length > 0
                      ? curr.product_variant.variant_sale_price
                      : curr.product_sale_price),
                0
              )}
          </div>
        </Stack>
      </Stack>
      {cartProductsUpdated.filter((prd) => !prd.valid).length > 0 && (
        <Alert status="warning" w="90%" borderRadius="10px">
          <AlertIcon />
          To order please remove products that are out of stock.
        </Alert>
      )}

      {priceUpdatedProducts?.map((item) => {
        return (
          <Alert status="info" w="90%" borderRadius="10px" mt="10px">
            <AlertIcon />
            {` The price of ${item.name} is updated from ₹${item.old} to ₹${item.new} `}
          </Alert>
        );
      })}
      <Flex flexDirection="column" w="95%" mb="140px">
        {cartProductsUpdated.length > 0 ? (
          cartProductsUpdated.map((product) => {
            return (
              <ProductCardCart
                isDisabled={!product.valid}
                product={product}
                key={product.product_id_gen}
                actions={cartActions}
              />
            );
          })
        ) : !isCartEmpty ? (
          <Stack w="100%" h="80vh" justifyContent="center" alignItems="center">
            <CircularProgress color="green.500" isIndeterminate />
          </Stack>
        ) : (
          <Flex direction="column" alignItems="center" mt="40px">
            <Image src={CartIcon} w="70%" />
            <Heading fontWeight="bold" fontFamily="elemen">
              Bag Is Empty
            </Heading>
            <Text
              w="80%"
              color="gray.400"
              textAlign="center"
              fontWeight="normal"
              mb="15px"
            >
              Your cart is empty please add some products to order.
            </Text>
            <Button
              fontFamily="elemen"
              size="lg"
              w="60%"
              bgColor="#08bd80"
              textColor="#fff"
              height="60px"
              onClick={() =>
                history.push(`/store/${storeData.account_store_link}`)
              }
            >
              Shop Now
            </Button>
          </Flex>
        )}
        {/* product item ends here */}
      </Flex>

      {cartProductsUpdated.filter((prd) => prd.valid).length > 0 && (
        <Button
          position="fixed"
          isDisabled={
            cartProductsUpdated.filter((prd) => !prd.valid).length > 0
          }
          bottom="35px"
          isLoading={_.isEmpty(storeData)}
          mt="5"
          size="lg"
          colorScheme="green"
          w="90%"
          h="60px"
          borderRadius="48px"
          leftIcon={<img src={Whatsapp} className={styles.whatsapp_icon} />}
          onClick={whatsappBuy}
        >
          Place Order on Whatsapp
        </Button>
      )}
    </div>
  );
};

export default StoreCart;
