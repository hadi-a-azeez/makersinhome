import { useDisclosure } from "@chakra-ui/hooks";
import { Image } from "@chakra-ui/image";
import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { productImagesRoot } from "../config";
import styles from "./css/product_card.module.css";

const ProductCard = ({ product }) => {
  console.log(product);
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
        className={styles.product_card}
        onClick={() =>
          history.push({
            pathname: `/product/${product.id}`,
            state: { ...product },
          })
        }
        key={product.id}
      >
        {
          <Image
            src={`${productImagesRoot}/min/${product?.products_images[0]?.product_image}`}
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
        }
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
