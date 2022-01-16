import React, { useState, useEffect } from "react";
import styles from "../css/products.module.css";
import { useHistory } from "react-router-dom";
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

const Container = styled.div`
  ${tw`flex flex-col items-center bg-gray-100 w-full p-4`}
  min-height: 100vh;
`;

const ProductsContainer = styled.div`
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
  const flipProductStock = async (a, b, id) => {
    let product = productsArray[id];
    let newProductsArray = [...productsArray];
    newProductsArray[id] = {
      ...newProductsArray[id],
      product_stock: !newProductsArray[id].product_stock ? 1 : 0,
    };
    setProductsArray(newProductsArray);
    let response = await updateProductStock(parseInt(product.id));
  };

  return (
    <SellerPageLayout>
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

        {/* card one */}
        <ProductsContainer>
          {!isLoading ? (
            productsArray.map((item, index) => (
              <ProductCard
                title={item.product_name}
                image={getProductImage(item.products_images)}
                price={getProductPrice(item)}
                stock={item.product_stock}
                id={item.id}
                // onStockToggle={flipProductStock}
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
        {/* card one ends here */}
        {productsArray.length === 0 && !isLoading && (
          <>
            <img src={Empty} className={styles.emptyImage} />
            <h1 className={styles.heading}>
              Your products list is empty!<br></br>
              Add products to your list
            </h1>
          </>
        )}

        {/* <Link to="/add_product" className={styles.btn}>
          ADD PRODUCTS
        </Link> */}
        {/* <Button
          onClick={() => history.push("/app/add_product")}
          position="fixed"
          zIndex="1000"
          mb="70"
          bottom="0"
          size="lg"
          w="90%"
          bgColor="#08bd80"
          textColor="#fff"
          height="60px"
        >
          ADD PRODUCTS
        </Button> */}
        <div className={styles.blank}></div>
      </Container>
    </SellerPageLayout>
  );
};

export default Products;
