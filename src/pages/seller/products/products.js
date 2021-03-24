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
import Placeholder from "../../../assets/placeholder.png";
import Empty from "../../../assets/empty.svg";
import { Box, StatNumber, Stat, Button, Skeleton } from "@chakra-ui/react";

const Products = (props) => {
  const [productsArray, setProductsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    const getProductsData = async () => {
      const productsData = await getProductsApi("all");
      setProductsArray(productsData.data.data);
      console.log(productsArray);
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
    <>
      <div className={styles.container}>
        <LabelHeader label="All Products" />
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
              to={`/product_edit/${item.id}`}
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
                        src={`https://firebasestorage.googleapis.com/v0/b/saav-9c29f.appspot.com/o/product_images%2Fmin%2F${item.products_images[0].product_image}?alt=media`}
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
        <Button
          onClick={() => history.push("/add_product")}
          position="fixed"
          zIndex="1000"
          mb="70"
          bottom="0"
          size="lg"
          w="90%"
          bgColor="#00B140"
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
