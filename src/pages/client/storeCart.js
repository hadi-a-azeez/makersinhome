import React, { useEffect, useState } from "react";
import styles from "./css/favourites.module.css";
import { useHistory } from "react-router-dom";
import { ArrowBackIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { SimpleGrid, IconButton, Image, Button } from "@chakra-ui/react";
import Placeholder from "../../assets/placeholder.png";
import CartIconFilled from "../../assets/cart-filled.svg";
import { getStoreDataByIdAPI } from "../../api/custStoreAPI";
import useStore from "../../cartState";

const StoreCart = (props) => {
  const history = useHistory();
  const [productsData, setProductsData] = useState([]);
  const [isProducts, setIsProducts] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const cartProducts = useStore((state) => state.products);
  const deleteCartProduct = useStore((state) => state.deleteProduct);

  let storeId = props.match.params.store_id;

  // get store details from server
  useEffect(() => {
    const getStoreDetails = async () => {
      const response = await getStoreDataByIdAPI(storeId);
      console.log(response);
      setUserInfo(response.data.data);
    };
    getStoreDetails();
  }, []);

  const whatsappBuy = async () => {
    const productsMsg = cartProducts.map(
      (item) =>
        `• ${item.product_name}   x   ${item.product_quantity} - ₹${
          item.product_quantity * item.product_price
        }%0D%0A `
    );
    const whatsappMessage = `Hey👋 %0D%0AI want to place an order %0D%0A%0D%0A*Order*%0D%0A${productsMsg.join(
      ""
    )}%0D%0A Total: ₹${cartProducts.reduce(
      (acc, curr) => acc + curr.product_quantity * curr.product_price,
      0
    )}%0D%0A_______________________%0D%0A%0D%0A Powered by Saav.in`;
    window.location.replace(
      `https://api.whatsapp.com/send/?phone=91${userInfo.account_whatsapp}&text=${whatsappMessage}`
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
      <h1 className={styles.heading}>Cart</h1>
      <SimpleGrid columns={2} spacing={2} w="95%">
        {cartProducts.length > 0 ? (
          cartProducts.map((product) => {
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
                      deleteCartProduct(product);
                    }}
                    icon={<SmallCloseIcon color="black" w={4} h={4} />}
                  />
                  <div className={styles.product_details}>
                    <h1 className={styles.product_name}>
                      {product.product_name}
                    </h1>
                    <h1 className={styles.product_quantity}>
                      {product.product_quantity}
                    </h1>
                  </div>
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
