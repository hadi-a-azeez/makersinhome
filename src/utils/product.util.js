import { productImagesRoot } from "../config";
import Placeholder from "../assets/placeholder.png";

export const getProductImage = (images = []) => {
  if (images.length > 0) {
    return `${productImagesRoot}/min/${images[0].product_image}`;
  } else {
    return Placeholder;
  }
};

export const getProductPrice = (product = {}) => {
  return `₹${
    product?.products_variants?.length > 0
      ? Math.min(
          ...product?.products_variants.map(
            (variant) => variant?.variant_sale_price
          )
        )
      : product?.product_sale_price
  }`;
};
