import { Button, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useHeader } from "utils/hooks/useHeader";
import { getProductsApi, updateProductStock } from "../../api/sellerProductAPI";
import { Container } from "../../components/Container";
import ProductCard from "../../components/ProductsCardSeller";
import { getProductImage, getProductPrice } from "../../utils/product.util";
import styles from "../css/products.module.css";
import { ButtonContainer, ProductsContainer } from "./products";

const Products = (props) => {
  const productsCat = props.match.params.id;
  const [productsArray, setProductsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setHeader } = useHeader();

  let history = useHistory();

  useEffect(() => {
    setHeader({
      title: props.match.params.cat_name,
      isBackButton: true,
      rightIcon: (
        <ButtonContainer>
          <Button
            onClick={() => history.push("/app/products/add")}
            bgColor="#08bd80"
            textColor="#fff"
            paddingY={3}
          >
            ADD PRODUCT
          </Button>
        </ButtonContainer>
      ),
    });
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
    <Container>
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
  );
};

export default Products;
