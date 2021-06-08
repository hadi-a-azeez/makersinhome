import React, { useEffect, useState } from "react";
import styles from "../css/favourites.module.css";
import { useHistory } from "react-router-dom";
import useStore from "../../../cartState";
import { ArrowBackIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { UilTimes } from "@iconscout/react-unicons";
import Placeholder from "../../../assets/placeholder.png";
import { IconButton, Text } from "@chakra-ui/react";
import { productImagesRoot } from "../../../config";

const ProductCardCart = ({ product, actions, isDisabled }) => {
  const history = useHistory();

  const deleteCartProduct = useStore((state) => state.deleteProduct);
  const addCartQuantity = useStore((state) => state.addQuantity);
  const removeCartQuantity = useStore((state) => state.removeQuantity);
  return (
    <div className={styles.product_item} key={product.product_id_gen}>
      <IconButton
        colorScheme="gray"
        borderRadius="100%"
        size="sm"
        position="absolute"
        right="8px"
        top="8px"
        onClick={(e) => {
          e.stopPropagation();
          deleteCartProduct(product);
          actions.deleteProduct(product);
        }}
        icon={<UilTimes color="#f23d30" />}
      />
      <img
        src={
          product.products_images[0]
            ? `${productImagesRoot}/min/${product?.products_images[0]?.product_image}`
            : Placeholder
        }
        alt="img"
        onClick={() => history.push(`/product/${product.product_id}`)}
        className={styles.product_image}
      />

      <div
        className={
          isDisabled
            ? `${styles.product_details} ${styles.disabled}`
            : styles.product_details
        }
      >
        <h1
          onClick={() => history.push(`/product/${product.product_id}`)}
          className={styles.product_name}
        >
          {product.product_name}
        </h1>
        <h1 className={styles.product_price}>
          ₹
          {product.products_variants.length > 0
            ? product.product_variant.variant_sale_price
            : product.product_sale_price}
        </h1>
        {product.product_variant && (
          <h1 className={styles.subheading}>
            Variant: {product.product_variant.variant_name}
          </h1>
        )}
        {!isDisabled && (
          <div className={styles.quantity_container}>
            <div
              onClick={(e) => {
                e.stopPropagation();

                removeCartQuantity(product);
                actions.removeQuantity(product);
              }}
              className={styles.small_circle}
            >
              -
            </div>
            <Text p="6px">{product.product_quantity}</Text>
            <div
              onClick={(e) => {
                e.stopPropagation();
                addCartQuantity(product);
                actions.addQuantity(product);
              }}
              className={styles.small_circle}
            >
              +
            </div>
          </div>
        )}
        {isDisabled && (
          <Text
            className={styles.out_of_stock}
            fontWeight="600"
            fontFamily="elemen"
            fontSize="15px"
          >
            OUT OF STOCK
          </Text>
        )}
      </div>
    </div>
  );
};

export default ProductCardCart;
