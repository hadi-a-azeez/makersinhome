import React, { useState, useEffect } from "react";
import styles from "../css/products.module.css";
import { useHistory } from "react-router-dom";
import {
  getProductsApi,
  updateProductStock,
} from "../../../api/sellerProductAPI";
import { Button, Skeleton } from "@chakra-ui/react";
import SellerPageLayout from "../../../layouts/Seller";
import { Container } from "../../../components/Container";
import { getProductImage, getProductPrice } from "../../../utils/product.util";
import ProductCard from "../../../components/ProductsCardSeller";
import { ProductsContainer } from "./products";
import tw, { styled } from "twin.macro";

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
  const productsCat = props.match.params.id;
  const productsCatName = props.match.params.cat_name;
  const [productsArray, setProductsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    const getProductsData = async () => {
      const productsData = await getProductsApi(productsCat);
      setProductsArray(productsData.data.data);
      setIsLoading(false);
      console.log(productsData.data);
      // if (productsData.data.login === false) {
      //   history.push("/");
      // }
    };
    getProductsData();
  }, [productsCat]);

  //in stock,out of stock update
  const flipProductStock = async (a, b, id) => {
    let product = productsArray[id];
    let newProductsArray = [...productsArray];
    newProductsArray[id] = {
      ...newProductsArray[id],
      product_stock: !newProductsArray[id].product_stock ? 1 : 0,
    };
    setProductsArray(newProductsArray);
    let response = await updateProductStock(parseInt(product.id));
    console.log(response);
  };

  return (
    <>
      <SellerPageLayout label={productsCatName} isBackButton>
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
          {isLoading && (
            <>
              <Skeleton height="100px" w="90%" mt="3" borderRadius="9" />
              <Skeleton height="100px" w="90%" mt="3" borderRadius="9" />
              <Skeleton height="100px" w="90%" mt="3" borderRadius="9" />
            </>
          )}
          {/* card one */}
          <ProductsContainer>
            {!isLoading &&
              productsArray.map((item, index) => (
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
              ))}
            {/* card one ends here */}
          </ProductsContainer>
          <div className={styles.blank}></div>
        </Container>
      </SellerPageLayout>
    </>
  );
};

export default Products;
