import { useDisclosure } from "@chakra-ui/hooks";
import { Image, Badge } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { productImagesRoot } from "../config";
import styles from "./css/product_card.module.css";

const ProductCard = ({ product, isGlow }) => {
  const history = useHistory();
  const [priceLast, setPriceLast] = useState({ price: "_", sale: "_" });

  useEffect(() => {
    if (product.products_variants.length > 0) {
      let minVariant = product.products_variants?.reduce((prev, curr) =>
        prev.variant_sale_price < curr.variant_sale_price ? prev : curr
      );
      setPriceLast({
        price: minVariant.variant_price,
        sale: minVariant.variant_sale_price,
      });
    } else {
      setPriceLast({
        price: product.product_price,
        sale: product.product_sale_price,
      });
    }
  }, []);

  const DiscountPriceText = ({ price, sale_price }) => {
    return (
      <>
        <h1 className={styles.product_price}>₹{sale_price}</h1>
        <h1 className={styles.product_price_strike}>₹{price}</h1>
        <div className={styles.product_discount}>
          {" "}
          {parseInt(100 - (100 * sale_price) / price)}% OFF
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className={`${styles.product_card}`}
        onClick={() =>
          history.push({
            pathname: `/product/${product.id}`,
            state: { ...product },
          })
        }
        key={product.id}
      >
        <div className={isGlow && `${styles.gradient_border}`}>
          {isGlow && (
            <Badge
              position="absolute"
              bottom="0"
              w="50%"
              ml="25%"
              p="2px"
              pb="0px"
              color="white"
              backgroundColor="#1fe81e"
              borderRadius="8px 8px 0px 0px"
              textAlign="center"
            >
              #Trending
            </Badge>
          )}
          <Image
            loading="lazy"
            src={`${productImagesRoot}/min/${product?.products_images[0]?.product_image}`}
            alt="img"
            className={styles.product_image}
            fallback={
              <Skeleton
                height={{ base: "180px", lg: "290px" }}
                width="98%"
                borderRadius="5px"
                marginTop="5%"
              />
            }
          />
        </div>
        <div className={styles.product_details}>
          <div className={styles.product_name}>{product.product_name}</div>
          <div className={styles.price_container}>
            {priceLast.price !== priceLast.sale ? (
              <DiscountPriceText
                price={priceLast.price}
                sale_price={priceLast.sale}
              />
            ) : (
              <h1 className={styles.product_price}>₹{priceLast.sale}</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
