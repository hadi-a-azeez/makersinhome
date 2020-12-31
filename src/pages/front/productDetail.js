import React, { useState, useEffect } from "react";
import styles from "./css/productDetail.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import WhatsappLogo from "../../assets/logo-whatsapp.svg";
import FavouritesIcon from "../../assets/heart-outline.svg";
import { getSingleProductAPI } from "../../api/custStoreAPI";
import { productImagesRoot } from "../../config";
import { Helmet, HelmetProvider } from "react-helmet-async";

const ProductDetail = (props) => {
  const [productData, setProductData] = useState({});
  const productId = props.match.params.productId;
  useEffect(() => {
    const getProduct = async () => {
      const productResponse = await getSingleProductAPI(productId);
      setProductData(productResponse.data.data[0]);
      console.log(productResponse);
    };
    getProduct();
  }, []);
  const whatsappBuy = () => {
    window.location.replace(
      `https://api.whatsapp.com/send?text=Product%20Name%20%20%3A%20${productData.product_name}%0A%0AI%20want%20this%20item`
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
                content={`${productImagesRoot}/${
                  productData.images.split(",")[0]
                }`}
              />
            )}
          </Helmet>
        )}
        <Carousel
          className={styles.image_slider}
          infiniteLoop
          dynamicHeight
          showThumbs={false}
          showStatus={false}
        >
          {productData.images &&
            productData.images.split(",").map((image) => {
              return (
                <div
                  key={image.split(":")[0]}
                  style={{ height: 300, backgroundColor: `white` }}
                >
                  <img
                    src={`${productImagesRoot}/${image}`}
                    style={{
                      objectFit: "cover",
                      borderRadius: 20,
                      height: 300,
                    }}
                  />
                </div>
              );
            })}
        </Carousel>
        <div className={styles.product_details}>
          <h1 className={styles.product_name}>{productData.product_name}</h1>
          <h1 className={styles.product_price}>
            {" "}
            ₹{productData.product_price}
          </h1>
          <h1 className={styles.desc_heading}>Description</h1>
          <h1 className={styles.description}>{productData.product_desc}</h1>
        </div>
        <button className={styles.btn_whatsapp} onClick={whatsappBuy}>
          <img src={WhatsappLogo} alt="w" className={styles.whatsappicon} />
          Buy on whatsapp
        </button>
        <button className={styles.btn_favourites}>
          <img src={FavouritesIcon} alt="w" className={styles.favouritesicon} />
          Add to favourites
        </button>
      </div>
    </HelmetProvider>
  );
};

export default ProductDetail;
