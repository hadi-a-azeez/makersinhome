import React, { useEffect, useState } from "react";
import styles from "./css/favourites.module.css";
import { useHistory } from "react-router-dom";
import { productImagesRoot } from "../../config";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { SimpleGrid, IconButton, Image, Button } from "@chakra-ui/react";
import FavouritesIcon from "../../assets/heart-outline.svg";
import FavouritesIconFilled from "../../assets/heart_filled.svg";

const StoreCart = (props) => {
  const history = useHistory();
  const [productsData, setProductsData] = useState([]);
  const [isProducts, setIsProducts] = useState(true);

  let storeId = props.match.params.store_id;

  const [productsInCart, setProductsInCart] = useState([]);

  const whatsappBuy = async () => {
    const productsMsg = productsInCart.map(
      (item) => `• ${item.product_name}   -   ${item.product_quantity} %0D%0A`
    );
    const whatsappMessage = `Hey👋 %0D%0AI want to place an order %0D%0A%0D%0A*Order*%0D%0A${productsMsg.join(
      ""
    )}_______________________%0D%0A%0D%0A Powered by Shopwhats`;
    window.location.replace(
      `https://api.whatsapp.com/send/?phone=919496742190&text=${whatsappMessage}`
    );
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
      setProductsInCart(cartArr);
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
        {productsData ? (
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
                    src={`${productImagesRoot}/min/${product.product_image}`}
                    alt="img"
                    className={styles.product_image}
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
                        src={FavouritesIconFilled}
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
        ) : !isProducts ? (
          <h1>No Favourates</h1>
        ) : (
          <h1>Loading..</h1>
        )}
        {/* product item ends here */}
      </SimpleGrid>
      <Button mt="5" size="lg" colorScheme="green" onClick={whatsappBuy}>
        Buy On Whatsapp
      </Button>
    </div>
  );
};

export default StoreCart;
