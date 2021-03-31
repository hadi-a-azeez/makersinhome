import React, { useEffect, useState } from "react";
import styles from "./css/favourites.module.css";
import { useHistory } from "react-router-dom";
import { ArrowBackIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { SimpleGrid, IconButton, Image, Button } from "@chakra-ui/react";
import Placeholder from "../../assets/placeholder.png";
import CartIconFilled from "../../assets/cart-filled.svg";
import { getStoreDataByIdAPI } from "../../api/custStoreAPI";

const StoreCart = (props) => {
  const history = useHistory();
  const [productsData, setProductsData] = useState([]);
  const [isProducts, setIsProducts] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  let storeId = props.match.params.store_id;

  useEffect(() => {
    const getStoreDetails = async () => {
      const response = await getStoreDataByIdAPI(storeId);
      console.log(response);
      setUserInfo(response.data.data);
    };
    getStoreDetails();
  }, []);
  const whatsappBuy = async () => {
    const productsMsg = productsData.map(
      (item) => `• ${item.product_name}   -   ${item.product_quantity} %0D%0A`
    );
    const whatsappMessage = `Hey👋 %0D%0AI want to place an order %0D%0A%0D%0A*Order*%0D%0A${productsMsg.join(
      ""
    )}_______________________%0D%0A%0D%0A Powered by Shopwhats`;
    window.location.replace(
      `https://api.whatsapp.com/send/?phone=91${userInfo.account_whatsapp}&text=${whatsappMessage}`
    );
  };

  const removeCartProduct = async (productId) => {
    const newProductsInCart = productsData.filter(
      (product) => product.product_id !== productId
    );
    let cartArr = await JSON.parse(localStorage.getItem("cart"));
    if (cartArr) {
      let filteredArr = cartArr.filter(
        (product) => product.product_id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(filteredArr));
    }
    setProductsData(newProductsInCart);
  };
  useEffect(() => {
    const getProducts = async () => {
      let cartArr = await JSON.parse(localStorage.getItem("cart"));
      if (cartArr) {
        let filteredArr = cartArr.filter(
          (product) => product.store_id == storeId
        );
        filteredArr.length > 0
          ? setProductsData(filteredArr)
          : setIsProducts(false);
      }

      console.log(cartArr);
    };
    getProducts();
  }, []);
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
      <h1 className={styles.heading}>Cart</h1>
      <SimpleGrid columns={2} spacing={2} w="95%">
        {productsData.length > 0 ? (
          productsData.map((product) => {
            return (
              <>
                <div
                  className={styles.product_item}
                  onClick={() =>
                    history.push(`/product_detail/${product.product_id}`)
                  }
                  key={product.product_id}
                >
                  <img
                    src={
                      product.product_image
                        ? `https://firebasestorage.googleapis.com/v0/b/saav-9c29f.appspot.com/o/product_images%2Fmin%2F${product.product_image}?alt=media`
                        : Placeholder
                    }
                    alt="img"
                    className={styles.product_image}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCartProduct(product.product_id);
                    }}
                    icon={<SmallCloseIcon color="black" w={4} h={4} />}
                  />
                  <div className={styles.product_details}>
                    <h1 className={styles.product_name}>
                      {product.product_name}
                    </h1>
                    <h1 className={styles.product_name}>
                      {product.product_quantity}
                    </h1>
                  </div>
                  <IconButton
                    backgroundColor="#f8f9fd"
                    borderRadius="30px"
                    aria-label="Search database"
                    icon={
                      <Image
                        src={CartIconFilled}
                        width={5}
                        height={5}
                        className={styles.favouritesFilled}
                      />
                    }
                    pos="absolute"
                    bottom="3"
                    right="3"
                    onClick={() => history.goBack()}
                  />
                </div>
              </>
            );
          })
        ) : (
          <h1>No Products</h1>
        )}
        {/* product item ends here */}
      </SimpleGrid>
      {userInfo.account_whatsapp && (
        <Button
          mt="5"
          size="lg"
          colorScheme="green"
          w="90%"
          onClick={whatsappBuy}
          mb="10"
        >
          Place Order on Whatsapp
        </Button>
      )}
    </div>
  );
};

export default StoreCart;
