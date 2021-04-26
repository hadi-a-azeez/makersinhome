import { useDisclosure } from "@chakra-ui/hooks";
import { Image } from "@chakra-ui/image";
import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { productImagesRoot } from "../config";
import styles from "./css/product_card.module.css";

const ProductCard = ({ product }) => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <div
        className={styles.product_card}
        onClick={() => history.push(`/product/${product.id}`)}
        key={product.id}
      >
        {product.products_images && (
          <Image
            src={`${productImagesRoot}/min/${product.products_images[0].product_image}`}
            alt="img"
            className={styles.product_image}
            fallback={
              <Skeleton
                height="180px"
                width="98%"
                borderRadius="5px"
                marginTop="5%"
              />
            }
          />
        )}
        <div className={styles.product_details}>
          <div className={styles.product_name}>{product.product_name}</div>
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
                {product.product_is_sale && (
                  <div className={styles.product_discount}>
                    {" "}
                    {parseInt(
                      100 -
                        (100 * product.product_sale_price) /
                          product.product_price
                    )}
                    % OFF
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
