import React, { useEffect, useState } from "react";
import styles from "./css/store.module.css";
import { useHistory, Link, withRouter } from "react-router-dom";
import { getStoreProducts, getStoreDataAll } from "../../api/custStoreAPI";
import { productImagesRoot } from "../../config";
import { updateStoreViews } from "../../api/custAnalyticsAPI";
import {
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

const StoreFavourates = (props) => {
  const history = useHistory();
  const [productsData, setProductsData] = useState([]);
  const [isProducts, setIsProducts] = useState(true);

  let storeId = props.match.params.store_id;

  useEffect(() => {
    const getProducts = async () => {
      let favouratesArr = await JSON.parse(localStorage.getItem("favourates"));
      if (favouratesArr) {
        let filteredArr = favouratesArr.filter(
          (product) => product.store_id == storeId
        );
        filteredArr.length > 0
          ? setProductsData(filteredArr)
          : setIsProducts(false);
      }

      console.log(favouratesArr);
    };
    getProducts();
  }, []);
  //check if current store has any favourates saved by user

  return (
    <div className={styles.container}>
      <SimpleGrid columns={2} spacing={2} w="95%">
        {productsData ? (
          productsData.map((product) => {
            return (
              <div
                className={styles.product_item}
                onClick={() =>
                  history.push(`/product_detail/${product.product_id}`)
                }
                key={product.product_id}
              >
                <img
                  src={`${productImagesRoot}/min/${product.product_image}`}
                  alt="img"
                  className={styles.product_image}
                />

                <div className={styles.product_details}>
                  <h1 className={styles.product_name}>
                    {product.product_name}
                  </h1>
                </div>
              </div>
            );
          })
        ) : !isProducts ? (
          <h1>No Favourates</h1>
        ) : (
          <h1>Loading..</h1>
        )}
        {/* product item ends here */}
      </SimpleGrid>
    </div>
  );
};

export default StoreFavourates;
