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
        <LabelHeader label="Products" />
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
        {isLoading && (
          <>
            <Skeleton height="100px" w="90%" mt="3" borderRadius="6px" />
            <Skeleton height="100px" w="90%" mt="3" borderRadius="6px" />
            <Skeleton height="100px" w="90%" mt="3" borderRadius="6px" />
          </>
        )}
        {/* card one */}
        {!isLoading &&
          productsArray.map((item, index) => (
            <Link
              to={`/app/product_edit/${item.id}`}
              key={item.id}
              className={styles.link}
            >
              <Box
                w="90%"
                h="auto"
                d="flex"
                dir="row"
                mt="10px"
                backgroundColor="white"
                borderWidth="1px"
                borderRadius="lg"
              >
                <div className={styles.image_block}>
                  <div className={styles.thumbnail}>
                    {/* images are returned with image name and id with it seperated by : */}
                    {item.products_images[0] ? (
                      <img
                        src={`${productImagesRoot}/min/${item.products_images[0].product_image}`}
                        alt="image"
                        className={styles.thumbnail_image}
                      />
                    ) : (
                      <img
                        src={Placeholder}
                        className={styles.thumbnail_image}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.product_details}>
                  <h1 className={styles.heading_bold_product}>
                    {item.product_name}
                  </h1>
                  {/* <Stat>
                    <StatNumber mt="2px" fontSize="18px" fontWeight="500">{`₹${
                      item.products_variants.length > 0
                        ? item.products_variants?.reduce((prev, curr) =>
                            prev.variant_sale_price < curr.variant_sale_price
                              ? prev.variant_sale_price
                              : curr.variant_sale_price
                          )
                        : item.product_sale_price
                    }`}</StatNumber>
                  </Stat> */}
                  <Stat>
                    <StatNumber mt="2px" fontSize="18px" fontWeight="500">
                      {`₹${
                        item.products_variants.length > 0
                          ? Math.min(
                              ...item.products_variants.map(
                                (vari) => vari.variant_sale_price
                              )
                            )
                          : item.product_sale_price
                      }`}
                    </StatNumber>
                  </Stat>
                  <div className={styles.stock_block}>
                    {item.product_stock ? (
                      <h1 className={styles.heading_instock}>In stock</h1>
                    ) : (
                      <h1 className={styles.heading_outstock}>Out of stock</h1>
                    )}
                    <div className={styles.toggle}>
                      <Switch
                        id={index.toString()}
                        onChange={flipProductStock}
                        checked={item.product_stock ? true : false}
                        onColor="#00b140"
                        width={36}
                        height={21}
                      />
                    </div>
                  </div>
                </div>
              </Box>
            </Link>
          ))}
        {/* card one ends here */}

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
