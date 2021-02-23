import React, { useEffect, useState } from "react";
import styles from "./css/favourites.module.css";
import { useHistory } from "react-router-dom";
import { productImagesRoot } from "../../config";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { SimpleGrid, IconButton, Image } from "@chakra-ui/react";
import FavouritesIcon from "../../assets/heart-outline.svg";
import FavouritesIconFilled from "../../assets/heart_filled.svg";

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
      <IconButton
        backgroundColor="#f8f9fd"
        borderRadius="30px"
        aria-label="Search database"
        icon={<ArrowBackIcon color="black" w={8} h={8} />}
        pos="fixed"
        top="3"
        left="3"
        onClick={() => history.goBack()}
      />
      <h1 className={styles.heading}>My favourites</h1>
      <SimpleGrid columns={2} spacing={2} w="95%">
        {productsData ? (
          productsData.map((product) => {
            return (
              <>
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
                    <h1 className={styles.product_price}>
                      ₹{product.product_price}
                    </h1>
                  </div>
                  <IconButton
                    backgroundColor="#f8f9fd"
                    borderRadius="30px"
                    aria-label="Search database"
                    icon={
                      <Image
                        src={FavouritesIconFilled}
                        width={5}
                        height={5}
                        className={styles.favouritesFilled}
                      />
                    }
                    pos="absolute"
                    bottom="3"
                    right="3"
                    onClick={() => history.goBack()}
                  />
                </div>
              </>
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
