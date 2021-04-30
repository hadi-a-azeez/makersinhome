import React, { useEffect, useState } from "react";
import styles from "./css/favourites.module.css";
import { useHistory } from "react-router-dom";
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import Whatsapp from "../../assets/logo-whatsapp.svg";
import { IconButton, Button, Flex, Stack, Text } from "@chakra-ui/react";
import Placeholder from "../../assets/placeholder.png";
//import CartIconFilled from "../../assets/cart-filled.svg";
import { getStoreDataByIdAPI } from "../../api/custStoreAPI";
import useStore from "../../cartState";
import _ from "lodash";
import { productImagesRoot } from "../../config";
import { updateMessagesStarted } from "../../api/custAnalyticsAPI";

const StoreCart = (props) => {
  const history = useHistory();
  const [productsData, setProductsData] = useState([]);
  const [isProducts, setIsProducts] = useState(true);
  const [storeData, setStoreData] = useState({});

  const cartProducts = useStore((state) => state.products);
  const deleteCartProduct = useStore((state) => state.deleteProduct);
  const addCartQuantity = useStore((state) => state.addQuantity);
  const removeCartQuantity = useStore((state) => state.removeQuantity);

  let storeId = props.match.params.store_id;

  // get store details from server
  useEffect(() => {
    const getStoreDetails = async () => {
      const response = await getStoreDataByIdAPI(storeId);
      console.log(response);
      setStoreData(response.data.data);
    };
    getStoreDetails();
  }, []);

  const whatsappBuy = async () => {
    updateMessagesStarted(storeId);

    const productsMsg = cartProducts
      .filter((prd) => prd.store_id == storeId)
      .map(
        (item) =>
          `• ${item.product_name} ${
            item.product_variant && `(${item.product_variant.variant_name})`
          }   x   ${item.product_quantity} - ₹${
            item.product_quantity * item.product_price
          }%0D%0A `
      );
    const whatsappMessage = `Hey👋 %0D%0AI want to place an order %0D%0A%0D%0A*Order*%0D%0A${productsMsg.join(
      ""
    )}%0D%0A Total: ₹${cartProducts
      .filter((prd) => prd.store_id == storeId)
      .reduce(
        (acc, curr) => acc + curr.product_quantity * curr.product_price,
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
            {cartProducts
              .filter((prd) => prd.store_id == storeId)
              .reduce(
                (acc, curr) => acc + curr.product_quantity * curr.product_price,
                0
              )}
          </div>
        </Stack>
      </Stack>

      <Flex flexDirection="column" w="95%" mb="140px">
        {cartProducts.filter((prd) => prd.store_id == storeId).length > 0 ? (
          cartProducts
            .filter((prd) => prd.store_id == storeId)
            .map((product) => {
              return (
                <>
                  <div className={styles.product_item} key={product.product_id}>
                    <IconButton
                      colorScheme="gray"
                      borderRadius="100%"
                      size="sm"
                      position="absolute"
                      right="8px"
                      top="8px"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCartProduct(product);
                      }}
                      icon={<DeleteIcon color="red.400" w={4} h={4} />}
                    />
                    <img
                      src={
                        product.product_image
                          ? `${productImagesRoot}/min/${product.product_image}`
                          : Placeholder
                      }
                      alt="img"
                      onClick={() =>
                        history.push(`/product/${product.product_id}`)
                      }
                      className={styles.product_image}
                    />

                    <div className={styles.product_details}>
                      <h1
                        onClick={() =>
                          history.push(`/product/${product.product_id}`)
                        }
                        className={styles.product_name}
                      >
                        {product.product_name}
                      </h1>
                      <h1 className={styles.product_price}>
                        ₹{product.product_price}
                      </h1>
                      {product.product_variant.variant_name && (
                        <h1 className={styles.subheading}>
                          Variant: {product.product_variant.variant_name}
                        </h1>
                      )}
                      <div className={styles.quantity_container}>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCartQuantity(product);
                          }}
                          className={styles.small_circle}
                        >
                          -
                        </div>
                        <Text p="6px">{product.product_quantity}</Text>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            addCartQuantity(product);
                          }}
                          className={styles.small_circle}
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
        ) : (
          <h1>No Products</h1>
        )}
        {/* product item ends here */}
      </Flex>

      <Button
        position="fixed"
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
    </div>
  );
};

export default StoreCart;
