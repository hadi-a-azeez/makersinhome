import React, { useState, useEffect } from "react";
import styles from "../css/products.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { productImagesRoot } from "../../../config";
import Switch from "react-switch";
import {
  getProductsApi,
  updateProductStock,
} from "../../../api/sellerProductAPI";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LabelHeader from "../../../components/labelHeader";
import { Box, StatNumber, Stat, Button, Skeleton } from "@chakra-ui/react";

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
      <div className={styles.container}>
        <LabelHeader label={productsCatName} isBackButton />
        {isLoading && (
          <>
            <Skeleton height="100px" w="90%" mt="3" borderRadius="9" />
            <Skeleton height="100px" w="90%" mt="3" borderRadius="9" />
            <Skeleton height="100px" w="90%" mt="3" borderRadius="9" />
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
                    {item.products_images && (
                      <img
                        src={`${productImagesRoot}/min/${item.products_images[0].product_image}`}
                        alt="product"
                        className={styles.thumbnail_image}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.product_details}>
                  <h1 className={styles.heading_bold_product}>
                    {item.product_name}
                  </h1>
                  <Stat>
                    <StatNumber
                      mt="2px"
                      fontSize="18px"
                      fontWeight="500"
                    >{`₹${item.product_price}`}</StatNumber>
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

        <Button
          onClick={() => history.push("/app/add_product")}
          position="fixed"
          zIndex="1000"
          mb="10"
          bottom="0"
          size="lg"
          w="90%"
          bgColor="#08bd80"
          textColor="#fff"
          height="60px"
        >
          ADD PRODUCTS
        </Button>
        <div className={styles.blank}></div>
      </div>
    </>
  );
};

export default Products;
