import React, { useEffect, useState } from "react";
import styles from "./css/store.module.css";
import { SearchIcon } from "@chakra-ui/icons";
import { useHistory, Link, withRouter } from "react-router-dom";
import { getStoreProducts, getStoreDataAll } from "../../api/custStoreAPI";
import { productImagesRoot } from "../../config";
import { updateStoreViews } from "../../api/custAnalyticsAPI";
import Whatsapp from "../../assets/logo-whatsapp.svg";
import CartIcon from "../../assets/cart-outline.svg";
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
    history.push(`/cart/${storeId}`);
  };
  const handleWhatsappSupport = () => {
    window.location.replace(
      `https://api.whatsapp.com/send?phone=${storeData.account_whatsapp}&text=Hi%20I%20came%20from%20your%20store%20%E2%9C%8B`
    );
  };
  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const storeResponse = await getStoreDataAll(storeLink);
      console.log(storeResponse);
      if (storeResponse.status !== 404) {
        console.log(storeResponse);
        setStoreData(storeResponse.data.data.storeinfo);
        setStoreProducts(storeResponse.data.data.products);
        setStoreCategories(storeResponse.data.data.categories);
        setIsLoading(false);
        //update store views analytics
        const analyticResponse = await updateStoreViews(
          storeResponse.data.data.storeinfo.id
        );
        console.log(analyticResponse);
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
        onClick={handleWhatsappSupport}
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
              src={CartIcon}
              className={styles.carticon}
              height="20px"
              width="20px"
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
          onClick={() => history.push(`/store/search/${storeData.id}`)}
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
                {product.products_images && (
                  <img
                    src={`https://firebasestorage.googleapis.com/v0/b/saav-9c29f.appspot.com/o/product_images%2Fmin%2F${product.products_images[0].product_image}?alt=media`}
                    alt="img"
                    className={styles.product_image}
                  />
                )}
                <div className={styles.product_details}>
                  <h1 className={styles.product_name}>
                    {product.product_name}
                  </h1>
                  {product.product_is_sale == 0 ? (
                    <h1 className={styles.product_price}>
                      ₹{product.product_price}
                    </h1>
                  ) : (
                    <Stack direction="row" w="95%" mt="2">
                      <h1 className={styles.product_price_strike}>
                        ₹{product.product_price}
                      </h1>
                      <h1 className={styles.product_price}>
                        ₹{product.product_sale_price}
                      </h1>
                    </Stack>
                  )}
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
