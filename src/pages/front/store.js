import React, { useEffect, useState } from "react";
import styles from "./css/store.module.css";
import { SearchIcon } from "@chakra-ui/icons";
import { useHistory, Link, withRouter } from "react-router-dom";
import { getStoreProducts, getStoreDataAll } from "../../api/custStoreAPI";
import { productImagesRoot } from "../../config";
import { updateStoreViews } from "../../api/custAnalyticsAPI";
import Whatsapp from "../../assets/logo-whatsapp.svg";
import Favourites from "../../assets/heart-outline.svg";
import {
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

const Store = (props) => {
  let history = useHistory();
  const storeLink = props.match.params.storelink;
  const [storeData, setStoreData] = useState({});
  const [storeProducts, setStoreProducts] = useState([]);
  const [storeCategories, setStoreCategories] = useState([]);
  const [catSelected, setCatSelected] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isStoreExists, setIsStoreExists] = useState(true);

  const handleFavouratesClick = (storeId) => {
    history.push(`/store-favourates/${storeId}`);
  };
  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const storeResponse = await getStoreDataAll(storeLink);
      if (storeResponse.status != 404) {
        console.log(storeResponse.status);
        setStoreData(storeResponse.data.data.storeinfo);
        setStoreProducts(storeResponse.data.data.products);
        setStoreCategories(storeResponse.data.data.categories);
        setIsLoading(false);
        //update store views analytics
        const analyticResponse = await updateStoreViews(
          storeResponse.data.data.storeinfo.id
        );
      } else {
        setIsStoreExists(false);
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const getSelectedProducts = async () => {
      const productsResponse = await getStoreProducts(
        storeData.id,
        catSelected
      );
      productsResponse && setStoreProducts(productsResponse.data.data);
    };
    storeData.id && getSelectedProducts();
  }, [catSelected]);

  return isStoreExists ? (
    <div className={styles.container}>
      <Button
        backgroundColor="#25D366"
        borderRadius="100%"
        position="fixed"
        bottom="8"
        right="8"
        height="60px"
        width="60px"
      >
        <img
          src={Whatsapp}
          className={styles.iconWhatsapp}
          height="30px"
          width="30px"
        />
      </Button>
      {storeData && (
        <div className={styles.store_card}>
          <h1 className={styles.store_name}>{storeData.account_store}</h1>
          <h1 className={styles.store_location}>
            {storeData.account_store_address}
          </h1>
          <Button
            onClick={() => handleFavouratesClick(storeData.id)}
            backgroundColor="white"
            borderRadius="100%"
            position="absolute"
            height="40px"
            width="40px"
            bottom="2"
            right="3"
            padding="0"
          >
            <img
              src={Favourites}
              className={styles.iconFavourites}
              height="25px"
              width="25px"
            />
          </Button>
        </div>
      )}
      <InputGroup
        w="90%"
        mb="3"
        size="lg"
        backgroundColor="white"
        borderRadius="30px"
      >
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input
          type="text"
          placeholder="search in this store"
          borderRadius="30px"
          borderColor="white"
          onClick={() => history.push("/store/shafi/search")}
        />
      </InputGroup>

      <div className={styles.categories}>
        <div className={styles.margin_left}></div>
        <div
          className={
            catSelected == "all"
              ? styles.category_item_selected
              : styles.category_item
          }
          onClick={() => setCatSelected("all")}
        >
          All
        </div>
        {storeCategories &&
          storeCategories.map((cat) => (
            <div
              key={cat.id}
              className={
                catSelected == cat.id
                  ? styles.category_item_selected
                  : styles.category_item
              }
              onClick={() => setCatSelected(cat.id)}
            >
              {cat.cat_name}
            </div>
          ))}
      </div>
      {/* <div className={styles.products}> */}
      {/* product item starts here */}
      {isLoading && (
        <>
          <SimpleGrid columns={2} spacing={2} w="95%" mt="2">
            <Skeleton
              height="160px"
              w="100%"
              style={{ borderRadius: "15px" }}
            />
            <Skeleton
              height="160px"
              w="100%"
              style={{ borderRadius: "15px" }}
            />
            <Skeleton
              height="160px"
              w="100%"
              style={{ borderRadius: "15px" }}
            />
            <Skeleton
              height="160px"
              w="100%"
              style={{ borderRadius: "15px" }}
            />
          </SimpleGrid>
        </>
      )}
      <SimpleGrid columns={2} spacing={2} w="95%">
        {!isLoading &&
          storeProducts.map((product) => {
            return (
              <div
                className={styles.product_item}
                onClick={() => history.push(`/product_detail/${product.id}`)}
                key={product.id}
              >
                {product.images && (
                  <img
                    src={`${productImagesRoot}/min/${
                      product.images.split(",")[0]
                    }`}
                    alt="img"
                    className={styles.product_image}
                  />
                )}
                <div className={styles.product_details}>
                  <h1 className={styles.product_name}>
                    {product.product_name}
                  </h1>
                  <h1 className={styles.product_price}>
                    ₹{product.product_price}
                  </h1>
                </div>
              </div>
            );
          })}
        {/* product item ends here */}
      </SimpleGrid>
      {/* </div> */}
    </div>
  ) : (
    <p>No STore BY That Name</p>
  );
};

export default withRouter(Store);
