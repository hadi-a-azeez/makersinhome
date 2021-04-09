import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import WhatsappLogo from "../../assets/logo-whatsapp.svg";
import CartIcon from "../../assets/cartIcon.svg";
import CartIconBlack from "../../assets/cartIconblack.svg";
import BuyIcon from "../../assets/buynow.svg";
import { getProductDetailAPI } from "../../api/custStoreAPI";
import BackIcon from "../../assets/angle-left.svg";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  IconButton,
  useDisclosure,
  Box,
  Text,
  AvatarBadge,
  Stack,
} from "@chakra-ui/react";

import styles from "../../components/css/product_detailed.module.css";
import { useHistory } from "react-router-dom";
import { updateMessagesStarted } from "../../api/custAnalyticsAPI";
import { Skeleton, useToast } from "@chakra-ui/react";
import useStore from "../../cartState";

const ProductDetail = (props) => {
  const [productData, setProductData] = useState({});
  const [storeData, setStoreData] = useState({});
  const [similarProducts, setSimilarProducts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const [cartProducts, setCartProducts] = useState([]);
  const [isAddedCart, setIsAddedCart] = useState(false);
  const productId = props.match.params.productId;
  const history = useHistory();
  const [selectedVariant, setSelectedVariant] = useState("");

  const cartProducts = useStore((state) => state.products);
  const addToCartState = useStore((state) => state.addProduct);

  const {
    onOpen: onOpenCart,
    onClose: onCloseCart,
    isOpen: isOpenCart,
  } = useDisclosure();

  //get product data from server
  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      const productResponse = await getProductDetailAPI(productId);
      console.log(productResponse);
      setProductData(productResponse.data.data.product);
      //set default variant value if available
      {
        productResponse.data.data.product.products_variants.length > 0 &&
          setSelectedVariant(
            productResponse.data.data.product.products_variants[0]
          );
      }
      setStoreData(productResponse.data.data.storeinfo);
      setSimilarProducts(productResponse.data.data.similarproducts);

      // await getCartProducts(productResponse.data.data.storeinfo.id);

      setIsLoading(false);
    };
    getProduct();
  }, []);

  const addToCart = async (
    store_id,
    product_id,
    product_name,
    product_image,
    product_price
  ) => {
    let productObject = {
      store_id,
      product_id,
      product_image,
      product_name,
      product_quantity: 1,
      product_variant: selectedVariant,
      product_price,
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
        //increment quanitity of product
        const productsOther = storedArr.filter(
          (product) => product.product_id !== parseInt(productId)
        );
        let productAdded = storedArr.filter(
          (product) => product.product_id === parseInt(productId)
        );
        productAdded[0].product_quantity = ++productAdded[0].product_quantity;
        let cartArr = [...productAdded, ...productsOther];
        localStorage.setItem("cart", JSON.stringify(cartArr));
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([productObject]));
    }

    // await getCartProducts(store_id);
    setIsAddedCart(true);

    onOpenCart();
  };
  const whatsappBuy = async () => {
    updateMessagesStarted(storeData.id);
    const productsMsg = `• ${productData.product_name} ${
      productData.product_variant && `(${productData.product_variant})`
    }  x ${productData.product_quantity}  %0D%0A`;
    const whatsappMessage = `Hey👋 %0D%0AI want to place an order %0D%0A%0D%0A*Order*%0D%0A${productsMsg}_______________________%0D%0A%0D%0A Powered by Shopwhats`;
    window.location.replace(
      `https://api.whatsapp.com/send/?phone=919496742190&text=${whatsappMessage}`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Popover
          placement="bottom-start"
          isOpen={isOpenCart}
          onOpen={onOpenCart}
          onClose={onCloseCart}
        >
          <PopoverTrigger>
            <Box
              width="60px"
              height="60px"
              position="fixed"
              top="30px"
              right="25px"
              zIndex="1"
            >
              <IconButton
                width="60px"
                height="60px"
                icon={<img src={CartIconBlack} width="40px" />}
                borderRadius="100%"
              />
              <div className={styles.cart_count}>
                {cartProducts.reduce(
                  (acc, curr) => acc + curr.product_quantity,
                  0
                )}
              </div>
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Cart</PopoverHeader>
            <PopoverBody>
              <div className={styles.cart_popup_container}>
                {cartProducts.map((cartProduct) => (
                  <div className={styles.cart_popup_item}>
                    {cartProduct.product_name} x {cartProduct.product_quantity}
                  </div>
                ))}
              </div>
              <Button
                w="100%"
                onClick={() => history.push(`/cart/${storeData.id}`)}
              >
                Go To Cart
              </Button>
              <Button w="100%" mt="10px" colorScheme="green">
                Checkout On Whatsapp
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>

      {isLoading && (
        <Skeleton
          height="50vh"
          marginTop="10px"
          marginLeft="5%"
          marginRight="5%"
          width="90%"
          borderRadius="15px"
        />
      )}
      <Carousel
        className={styles.image_slider}
        infiniteLoop
        dynamicHeight
        showThumbs={false}
        showStatus={false}
        showArrows={false}
      >
        {productData.products_images &&
          productData.products_images.map((image) => {
            return (
              <div
                key={image.id}
                style={{
                  height: "50vh",
                  backgroundColor: `white`,
                }}
              >
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/saav-9c29f.appspot.com/o/product_images%2F${image.product_image}?alt=media`}
                  style={{
                    objectFit: "cover",
                    height: "50vh",
                    borderRadius: "15px",
                  }}
                />
              </div>
            );
          })}
      </Carousel>
      <div className={styles.button_back} onClick={() => history.goBack()}>
        <img src={BackIcon} width="25px" />
      </div>

      <h1 className={styles.product_name}>{productData.product_name}</h1>
      <div className={styles.price_container}>
        {productData.product_is_sale == 0 ? (
          <h1 className={styles.product_price}>₹{productData.product_price}</h1>
        ) : (
          <>
            <h1 className={styles.product_price}>
              ₹{productData.product_sale_price}
            </h1>
            <h1 className={styles.product_price_strike}>
              ₹{productData.product_price}
            </h1>
          </>
        )}
      </div>
      {productData.products_variants &&
        productData.products_variants.length > 0 && (
          <>
            <h3 className={styles.sub_heading}>Variants:</h3>
            <div className={styles.variant_container}>
              {productData.products_variants.map((variant) => (
                <div
                  className={
                    selectedVariant.id == variant.id
                      ? styles.variant_item_selected
                      : styles.variant_item
                  }
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant.variant_name}
                </div>
              ))}
            </div>
          </>
        )}
      {/* <div
        className={styles.add_cart_button}
        style={{ backgroundColor: "#ffc400", marginTop: "25px" }}
      >
        <img src={BuyIcon} className={styles.buy_now_icon} />
        <div className={styles.add_cart_text}>Buy Now</div>
      </div>
      <div
        className={styles.add_cart_button}
        onClick={() => {
          const productFinalPrice = productData.product_is_sale
            ? productData.product_sale_price
            : productData.product_price;
          addToCartState({
            store_id: storeData.id,
            product_id: productData.id,
            product_name: productData.product_name,
            product_image: productData.products_images[0].product_image,
            product_price: productFinalPrice,
            product_variant: selectedVariant,
            product_quantity: 1,
          });
        }}
      >
        <img src={CartIcon} className={styles.add_cart_icon} />
        <div className={styles.add_cart_text}>Add to Cart</div>
      </div> */}

      <Button
        alignSelf="center"
        size="lg"
        ml="5%"
        w="90%"
        p="10px"
        leftIcon={<img src={BuyIcon} className={styles.buy_now_icon} />}
        h="60px"
        mt="20px"
        backgroundColor="#ff5826"
        color="white"
        fontFamily="elemen"
      >
        Buy Now
      </Button>
      <Button
        ml="5%"
        mt="15px"
        leftIcon={<img src={CartIconBlack} className={styles.add_cart_icon} />}
        alignSelf="center"
        size="lg"
        w="90%"
        h="60px"
        fontFamily="elemen"
        mb="20px"
      >
        Add to Cart
      </Button>

      <div className={styles.product_desc_container}>
        <div className={styles.product_desc_title}>Description</div>

        <p className={styles.product_desc_body}>{productData.product_desc}</p>
      </div>
      <div className={styles.product_desc_container}>
        <div className={styles.product_desc_title}>Seller Details</div>

        <p className={styles.product_desc_body}>
          This item is sold by{" "}
          <span style={{ color: "blue" }}>{storeData.account_store}</span>
          <br />
          {storeData.account_store_address}
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
