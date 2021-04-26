import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import CartIcon from "../assets/cartIcon.svg";
import React, { useEffect, useRef, useState } from "react";
import styles from "./css/product_detailed.module.css";
import BackIcon from "../assets/angle-left.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Box, Button, Collapse } from "@material-ui/core";
import ArrowDown from "../assets/angle-down.svg";
import { productImagesRoot } from "../config";

const ProductDetailed = ({ isOpen, onClose, btnRef, product, store }) => {
  const [selectedVariant, setSelectedVariant] = useState("S");
  const sizesArr = ["S", "M", "L", "XL"];
  const { isOpen: isOpenDesc, onToggle: onToggleDesc } = useDisclosure();
  const { isOpen: isOpenAdress, onToggle: onToggleAddress } = useDisclosure();

  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay>
        <DrawerContent h="100%" overflow="auto">
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
                    style={{
                      height: "50vh",
                      backgroundColor: `white`,
                    }}
                  >
                    <img
                      src={`${productImagesRoot}/${image.product_image}`}
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
            <div className={styles.button_back} onClick={onClose}>
              <img src={BackIcon} width="25px" />
            </div>

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
            <div className={styles.add_cart_button}>
              <img src={CartIcon} className={styles.add_cart_icon} />
              <div className={styles.add_cart_text}>Add to Cart</div>
            </div>

            <div
              className={styles.product_desc_container}
              onClick={onToggleDesc}
            >
              <div className={styles.product_desc_title}>
                <h3>Description</h3>
              </div>

              <p className={styles.product_desc_body}>{product.product_desc}</p>
            </div>
            <div
              className={styles.product_desc_container}
              onClick={onToggleAddress}
            >
              <div className={styles.product_desc_title}>
                <h3>Seller Details</h3>
              </div>

              <p className={styles.product_desc_body}>
                This item is sold by{" "}
                <span style={{ color: "blue" }}>{store.account_store}</span>
                <br />
                {store.account_store_address}
              </p>
            </div>
          </div>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default ProductDetailed;
