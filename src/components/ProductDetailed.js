import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Button,
  Stack,
} from "@chakra-ui/react";
import CartIcon from "../assets/cartIcon.svg";
import React, { useEffect, useRef, useState } from "react";
import styles from "./css/product_detailed.module.css";
import BackIcon from "../assets/angle-left.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductDetailed = ({ isOpen, onClose, btnRef, product }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay>
        <DrawerContent h="100%">
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.button_cart}>
                <img src={CartIcon} width="35px" />
              </div>
            </div>

            <Carousel
              className={styles.image_slider}
              infiniteLoop
              dynamicHeight
              showThumbs={false}
              showStatus={false}
              showArrows={false}
            >
              {product.products_images.map((image) => {
                return (
                  <div
                    key={image.id}
                    style={{ height: 380, backgroundColor: `white` }}
                  >
                    <img
                      src={`https://firebasestorage.googleapis.com/v0/b/saav-9c29f.appspot.com/o/product_images%2F${image.product_image}?alt=media`}
                      style={{
                        objectFit: "cover",
                        height: 380,
                      }}
                    />
                  </div>
                );
              })}
            </Carousel>
            <div className={styles.button_back} onClick={onClose}>
              <img src={BackIcon} width="25px" />
            </div>
            <div className={styles.product_top_container}>
              <h1 className={styles.product_name}>{product.product_name}</h1>
              <div className={styles.price_container}>
                {product.product_is_sale == 0 ? (
                  <h1 className={styles.product_price}>
                    ₹{product.product_price}
                  </h1>
                ) : (
                  <>
                    <h1 className={styles.product_price}>
                      ₹{product.product_sale_price}
                    </h1>
                    <h1 className={styles.product_price_strike}>
                      ₹{product.product_price}
                    </h1>
                  </>
                )}
              </div>
            </div>
            <h3 className={styles.sub_heading}>Size</h3>
            <div className={styles.variant_container}>
              <div className={styles.variant_item}>S</div>
              <div className={styles.variant_item}>S</div>
              <div className={styles.variant_item}>S</div>
            </div>
            <div className={styles.add_cart_button}>
              <img src={CartIcon} className={styles.add_cart_icon} />
              <div className={styles.add_cart_text}>Add to Cart</div>
            </div>
          </div>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default ProductDetailed;
