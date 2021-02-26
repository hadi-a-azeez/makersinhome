import React, { useState, useEffect } from "react";
import styles from "./css/productDetail.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import WhatsappLogo from "../../assets/logo-whatsapp.svg";
import FavouritesIcon from "../../assets/heart-outline.svg";
import { getProductDetailAPI } from "../../api/custStoreAPI";
import { productImagesRoot } from "../../config";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  IconButton,
  Skeleton,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { updateMessagesStarted } from "../../api/custAnalyticsAPI";

const ProductDetail = (props) => {
  const [productData, setProductData] = useState({});
  const [storeData, setStoreData] = useState({});
  const [selectedUnit, setSelectedUnit] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [similarProducts, setSimilarProducts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const productId = props.match.params.productId;
  const history = useHistory();
  const unitsObject = {
    kg: ["gm", "kg"],
    litre: ["ml", "litre"],
    piece: ["piece"],
  };

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      const productResponse = await getProductDetailAPI(productId);
      setProductData(productResponse.data.data.product);
      setSelectedUnit(productResponse.data.data.product.product_unit);
      setStoreData(productResponse.data.data.storeinfo);
      setSimilarProducts(productResponse.data.data.similarproducts);
      setIsLoading(false);
      console.log(productResponse);
    };
    getProduct();
  }, []);

  //handle add to favourates button click
  const handleFavourates = (
    store_id,
    product_id,
    product_name,
    product_image
  ) => {
    if (localStorage.getItem("favourates")) {
      let storedArr = JSON.parse(localStorage.getItem("favourates"));
      let isContains = storedArr.some(
        (product) => product.product_id == product_id
      );
      if (!isContains) {
        let favouratesArr = [
          { store_id, product_id, product_image, product_name },
          ...storedArr,
        ];
        localStorage.setItem("favourates", JSON.stringify(favouratesArr));
      }
    } else {
      localStorage.setItem(
        "favourates",
        JSON.stringify([{ store_id, product_id, product_image, product_name }])
      );
    }
  };
  const handleCart = (store_id, product_id, product_name, product_image) => {
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
        (product) => product.product_id == product_id
      );
      if (!isContains) {
        let cartArr = [productObject, ...storedArr];
        localStorage.setItem("cart", JSON.stringify(cartArr));
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([productObject]));
    }
  };
  const whatsappBuy = async () => {
    updateMessagesStarted(storeData.id);
    window.location.replace(
      `https://api.whatsapp.com/send?phone=919496742190&text=I%20want%20to%20know%20about%20this%20product%20%F0%9F%9B%92%0AProduct%20Name%3A%20${productData.product_name}%0AProduct%20Link%20%3A%20${window.location.href}`
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

        <h1 className={styles.product_name}>{productData.product_name}</h1>
        {productData.product_is_sale == 0 ? (
          <h1 className={styles.product_price}>₹{productData.product_price}</h1>
        ) : (
          <h1 className={styles.product_price}>
            ₹{productData.product_price} ₹{productData.product_sale_price}
          </h1>
        )}
        <Stack direction="row" w="90%" mt="4" mb="4">
          <FormControl isRequired w="60%">
            <Input
              type="text"
              name="product_price"
              variant="filled"
              size="lg"
              placeholder="quantity"
              onChange={(e) => setProductQuantity(e.target.value)}
            />
          </FormControl>

          <FormControl w="40%">
            <Select
              name="product_unit"
              value={selectedUnit || ""}
              variant="filled"
              size="lg"
              onChange={(e) => setSelectedUnit(e.target.value)}
            >
              {productData.product_unit &&
                unitsObject[productData.product_unit].map((unit, index) => (
                  <option value={unit} key={index}>
                    {unit}
                  </option>
                ))}
            </Select>
          </FormControl>
        </Stack>

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
        {productData.id && (
          <button
            className={styles.btn_favourites}
            onClick={() =>
              handleCart(
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
            Add to Cart
          </button>
        )}
        <button className={styles.btn_whatsapp} onClick={whatsappBuy}>
          <img src={WhatsappLogo} alt="w" className={styles.whatsappicon} />
          Buy on whatsapp
        </button>
        <h1 className={styles.desc_heading}>Description</h1>
        <h1 className={styles.description}>{productData.product_desc}</h1>
        <h1 className={styles.desc_heading}>More products on this store</h1>
        <div className={styles.similarProducts}>
          <div className={styles.margin_left}></div>
          <div className={styles.category_item_selected}>All</div>
          <div className={styles.category_item_selected}>All do there</div>
          <div className={styles.category_item_selected}>All hey</div>
          <div className={styles.category_item_selected}>All</div>
          <div className={styles.category_item_selected}>All</div>
          <div className={styles.product_item_s}>
            <img
              src={WhatsappLogo}
              alt="img"
              className={styles.product_image_s}
            />
            <div className={styles.product_details_s}>
              <h1 className={styles.product_name_s}>hey</h1>
              <h1 className={styles.product_price_s}>₹3434</h1>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default ProductDetail;
