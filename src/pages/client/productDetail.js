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
} from "@chakra-ui/react";

import styles from "../../components/css/product_detailed.module.css";
import { ArrowBackIcon, CheckCircleIcon, EmailIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { updateMessagesStarted } from "../../api/custAnalyticsAPI";
import { Skeleton, useToast } from "@chakra-ui/react";

const ProductDetail = (props) => {
  const [productData, setProductData] = useState({});
  const [storeData, setStoreData] = useState({});

  const [selectedUnit, setSelectedUnit] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [similarProducts, setSimilarProducts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [isAddedCart, setIsAddedCart] = useState(false);
  const productId = props.match.params.productId;
  const history = useHistory();
  const toast = useToast();
  const [selectedVariant, setSelectedVariant] = useState("S");
  const sizesArr = ["S", "M", "L", "XL"];
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

      setStoreData(productResponse.data.data.storeinfo);
      setSimilarProducts(productResponse.data.data.similarproducts);

      //get all items in cart from localstorage
      let cartArr = await JSON.parse(localStorage.getItem("cart"));
      if (cartArr) {
        let filteredArr = cartArr.filter(
          (product) =>
            product.store_id == productResponse.data.data.storeinfo.id
        );
        setCartProducts(filteredArr);
      }

      setIsLoading(false);
    };
    getProduct();
  }, []);

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
      position: "top-left",
      isClosable: true,
    });
    onOpenCart();
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
    <div className={styles.container}>
      <div className={styles.header}>
        <Popover
          placement="bottom-start"
          isOpen={isOpenCart}
          onOpen={onOpenCart}
          onClose={onCloseCart}
        >
          <PopoverTrigger>
            <IconButton
              width="60px"
              height="60px"
              icon={<img src={CartIconBlack} width="40px" />}
              position="fixed"
              top="30px"
              right="25px"
              zIndex="1"
              borderRadius="100%"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Cart</PopoverHeader>
            <PopoverBody>
              <ol>
                {cartProducts.map((cartProduct) => (
                  <li>{cartProduct.product_name}</li>
                ))}
              </ol>
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
      <h3 className={styles.sub_heading}>SIZE:</h3>
      <div className={styles.variant_container}>
        {sizesArr.map((size) => (
          <div
            className={
              selectedVariant == size
                ? styles.variant_item_selected
                : styles.variant_item
            }
            onClick={() => setSelectedVariant(size)}
          >
            {size}
          </div>
        ))}
      </div>
      <div
        className={styles.add_cart_button}
        style={{ backgroundColor: "#ffc400", marginTop: "25px" }}
      >
        <img src={BuyIcon} className={styles.buy_now_icon} />
        <div className={styles.add_cart_text}>Buy Now</div>
      </div>
      <div
        className={styles.add_cart_button}
        onClick={() =>
          addToCart(
            storeData.id,
            productData.id,
            productData.product_name,
            productData.products_images[0].product_image
          )
        }
      >
        <img src={CartIcon} className={styles.add_cart_icon} />
        <div className={styles.add_cart_text}>Add to Cart</div>
      </div>

      <div className={styles.product_desc_container}>
        <div className={styles.product_desc_title}>
          <h3>Description</h3>
        </div>

        <p className={styles.product_desc_body}>{productData.product_desc}</p>
      </div>
      <div className={styles.product_desc_container}>
        <div className={styles.product_desc_title}>
          <h3>Seller Details</h3>
        </div>

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
