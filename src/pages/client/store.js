import React, { useEffect, useRef, useState } from "react";
import styles from "./css/store.module.css";
import { SearchIcon } from "@chakra-ui/icons";
import { useHistory, Link, withRouter } from "react-router-dom";
import { getStoreProducts, getStoreDataAll } from "../../api/custStoreAPI";
import { productImagesRoot } from "../../config";
import { updateStoreViews } from "../../api/custAnalyticsAPI";
import Whatsapp from "../../assets/logo-whatsapp.svg";
import Placeholder from "../../assets/placeholder.png";
import CartIcon from "../../assets/cartIcon.svg";
import MenuIcon from "../../assets/bars.svg";
import {
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Skeleton,
  Stack,
  Image,
  SkeletonCircle,
  useDisclosure,
  IconButton,
  Box,
} from "@chakra-ui/react";
import ProductCard from "../../components/ProductCard";
import useStore from "../../cartState";

const Store = (props) => {
  let history = useHistory();
  const storeLink = props.match.params.storelink;
  const [storeData, setStoreData] = useState({});
  const [storeProducts, setStoreProducts] = useState([]);
  const [storeCategories, setStoreCategories] = useState([]);
  const [catSelected, setCatSelected] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isStoreExists, setIsStoreExists] = useState(true);
  const cartProducts = useStore((state) => state.products);

  const handleWhatsappSupport = () => {
    window.location.replace(
      `https://api.whatsapp.com/send?phone=+91${storeData.account_whatsapp}&text=Hi%20I%20came%20from%20your%20store%20%E2%9C%8B`
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
      <Box
        width="65px"
        height="65px"
        position="fixed"
        bottom="30px"
        right="25px"
        zIndex="1"
        onClick={() => history.push(`/cart/${storeData.id}`)}
      >
        <IconButton
          width="65px"
          height="65px"
          icon={<img src={CartIcon} width="40px" />}
          borderRadius="100%"
          backgroundColor="#000"
        />
        <div className={styles.cart_count}>
          {cartProducts.reduce((acc, curr) => acc + curr.product_quantity, 0)}
        </div>
      </Box>

      <div className={styles.store_header}>
        <div className={styles.logo_container}>
          <Image
            src={
              storeData.account_store_image
                ? `https://firebasestorage.googleapis.com/v0/b/saav-9c29f.appspot.com/o/profile_images%2F${storeData.account_store_image}?alt=media`
                : Placeholder
            }
            borderRadius="full"
            boxSize="35px"
            objectFit="cover"
            fallback={<SkeletonCircle size="15" />}
          />
          <h2 className={styles.logo_name}>{storeData.account_store}</h2>
        </div>
        <img
          src={Whatsapp}
          className={styles.whatsapp_support_button}
          height="30px"
          width="30px"
          onClick={handleWhatsappSupport}
        />
      </div>
      <InputGroup
        w="90%"
        mb="6"
        size="lg"
        backgroundColor="white"
        borderRadius="30px"
      >
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input
          type="text"
          placeholder="Search for products"
          borderRadius="30px"
          border="2px solid black"
          height="50px"
          onClick={() => history.push(`/store/search/${storeData.id}`)}
        />
      </InputGroup>

      <div className={styles.categories_container}>
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
      <SimpleGrid columns={2} spacing={2} w="100%" p="12px">
        {!isLoading &&
          storeProducts.map((product) => {
            return <ProductCard product={product} store={storeData} />;
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
