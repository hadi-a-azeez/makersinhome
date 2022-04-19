import React, { useState, useEffect } from "react";
import styles from "../css/products.module.css";
import { Link, useHistory } from "react-router-dom";
import {
  getProductsApi,
  updateProductStock,
} from "../../../api/sellerProductAPI";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Empty from "../../../assets/empty.svg";
import { Button, Skeleton } from "@chakra-ui/react";
import SellerPageLayout from "../../../layouts/Seller";
import tw, { styled } from "twin.macro";
import ProductCard from "../../../components/ProductsCardSeller";
import { getProductImage, getProductPrice } from "../../../utils/product.util";
import { Container } from "../../../components/Container";

export const ProductsContainer = styled.div`
  ${tw`w-full grid gap-4`}
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonContainer = styled.div`
  ${tw`flex flex-row justify-end items-end w-full py-2`}
  @media (max-width: 768px) {
    position: fixed;
    bottom: 100px;
    width: 100%;
    ${tw`justify-center`}
    z-index: 1000;
  }
`;

const Products = (props) => {
  const [productsArray, setProductsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    const getProductsData = async () => {
      const productsData = await getProductsApi("all");
      setProductsArray(productsData?.data?.data);
      console.log(productsData);
      setIsLoading(false);
    };
    getProductsData();
  }, []);

  //in stock,out of stock update
  const flipProductStock = async (stock, type, id) => {
    const newProductsArray = productsArray.map((product) => {
      if (product.id === id) {
        if (type === "stock") {
          product.product_inventory_count = 0;
          product.products_variants = product.products_variants.map(
            (variant) => {
              variant.variant_inventory_count = 0;
              return variant;
            }
          );
        }
        if (type === "visible") product.product_stock = !stock;
      }
      return product;
    });
    setProductsArray(newProductsArray);
    await updateProductStock(parseInt(id), type);
  };

  return (
    <SellerPageLayout label="Products">
      <div className={styles.tab_parent}>
        <div
          onClick={() => history.push("/app/products")}
          className={styles.tab_child}
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "3px solid #08bd80",
          }}
        >
          Products
        </div>
        <div
          className={styles.tab_child}
          onClick={() => history.push("/app/categories")}
        >
          Categories
        </div>
      </div>
      <Container>
        <ButtonContainer>
          <Button
            onClick={() => history.push("/app/add_product")}
            bgColor="#08bd80"
            textColor="#fff"
            paddingY={3}
          >
            ADD PRODUCT
          </Button>
        </ButtonContainer>

        <ProductsContainer>
          {!isLoading ? (
            productsArray.map((item) => (
              <ProductCard
                title={item.product_name}
                image={getProductImage(item.products_images)}
                price={getProductPrice(item)}
                stock={item.product_stock}
                id={item.id}
                onStockToggle={flipProductStock}
                inventory_count={item.product_inventory_count}
                products_variants={item.products_variants}
              />
            ))
          ) : (
            <>
              <Skeleton height="100px" w="100%" borderRadius="9" />
              <Skeleton height="100px" w="100%" borderRadius="9" />
              <Skeleton height="100px" w="100%" borderRadius="9" />
            </>
          )}
        </ProductsContainer>
        {productsArray.length === 0 && !isLoading && (
          <>
            <img src={Empty} className={styles.emptyImage} />
            <h1 className={styles.heading}>
              Your products list is empty!<br></br>
              Add products to your list
            </h1>
          </>
        )}
        <div className={styles.blank}></div>
      </Container>
    </SellerPageLayout>
  );
};

export default Products;
