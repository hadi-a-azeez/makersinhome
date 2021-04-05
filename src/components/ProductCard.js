import { useDisclosure } from "@chakra-ui/hooks";
import { Stack } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./css/product_card.module.css";
import ProductDetailed from "./ProductDetailed";

const ProductCard = ({ product }) => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <ProductDetailed
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        product={product}
      />
      <div
        className={styles.product_card}
        // onClick={() => history.push(`/product_detail/${product.id}`)}
        onClick={onOpen}
        key={product.id}
      >
        {product.products_images && (
          <img
            src={`https://firebasestorage.googleapis.com/v0/b/saav-9c29f.appspot.com/o/product_images%2Fmin%2F${product.products_images[0].product_image}?alt=media`}
            alt="img"
            className={styles.product_image}
          />
        )}
        <div className={styles.product_details}>
          <div className={styles.price_container}>
            {product.product_is_sale == 0 ? (
              <h1 className={styles.product_price}>₹{product.product_price}</h1>
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
          <h1 className={styles.product_name}>{product.product_name}</h1>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
