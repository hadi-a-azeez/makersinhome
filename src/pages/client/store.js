import React, { useEffect, useRef, useState } from "react";
import styles from "./css/store.module.css";
import { SearchIcon } from "@chakra-ui/icons";
import { useHistory, Link, withRouter } from "react-router-dom";
import { getStoreProducts, getStoreDataAll } from "../../api/custStoreAPI";
import { productImagesRoot } from "../../config";
import { updateStoreViews } from "../../api/custAnalyticsAPI";
import Whatsapp from "../../assets/whatsapp_filled.svg";
import Placeholder from "../../assets/placeholder.png";
import CartIcon from "../../assets/cartIcon.svg";
import MenuIcon from "../../assets/bars.svg";

import {
  CircularProgress,
  CircularProgressLabel,
  SkeletonText,
} from "@chakra-ui/react";

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
    storeData.account_store_status === 0 ? (
      <p>Store Is Shut</p>
    ) : (
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
            {cartProducts
              .filter((prd) => prd.store_id == storeData.id)
              .reduce((acc, curr) => acc + curr.product_quantity, 0)}
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
              borderRadius="10px"
              boxSize="40px"
              objectFit="cover"
              fallback={<SkeletonCircle size="15" />}
            />
            <h2 className={styles.logo_name}>{storeData.account_store}</h2>
          </div>
          <div className={styles.whatsapp_support_button}>
            <img src={Whatsapp} onClick={handleWhatsappSupport} />
          </div>
        </div>
        <InputGroup
          w="92%"
          mb="6"
          size="lg"
          backgroundColor="white"
          borderRadius="30px"
          fontFamily="elemen"
        >
          <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
          <Input
            type="text"
            placeholder="Search for products"
            borderRadius="30px"
            border="1px solid black"
            height="50px"
            onClick={() => history.push(`/store/search/${storeData.id}`)}
          />
        </InputGroup>
        {storeCategories.length < 1 && (
          <Stack direction="row" w="95%" ml="5%" alignItems="flex-start">
            <Skeleton w="60px" h="40px" borderRadius="40px" />
            <Skeleton w="90px" h="40px" borderRadius="40px" />
            <Skeleton w="80px" h="40px" borderRadius="40px" />
            <Skeleton w="80px" h="40px" borderRadius="40px" />
          </Stack>
        )}
        {storeCategories.length > 0 && (
          <div className={styles.categories_container}>
            {storeCategories.length < 1 && (
              <>
                <Skeleton w="60px" h="40px" borderRadius="40px" />
                <Skeleton w="90px" h="40px" borderRadius="40px" />
                <Skeleton w="80px" h="40px" borderRadius="40px" />
                <Skeleton w="80px" h="40px" borderRadius="40px" />
              </>
            )}
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

            {storeCategories.map((cat) => (
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
        )}
        {/* <div className={styles.products}> */}
        {/* product item starts here */}

        <SimpleGrid columns={2} spacing={1} w="100%" p="10px">
          {storeProducts.length < 1 && (
            <>
              <Stack direction="column" width="100%">
                <Skeleton
                  marginTop="5%"
                  height="180px"
                  borderRadius="5px"
                  paddingLeft="5px"
                  paddingRight="5px"
                  w="90%"
                  style={{ borderRadius: "5px" }}
                />
                <SkeletonText mt="10px" noOfLines={2} spacing="1" width="90%" />
              </Stack>
              <Stack direction="column" width="100%">
                <Skeleton
                  marginTop="5%"
                  height="180px"
                  borderRadius="5px"
                  paddingLeft="5px"
                  paddingRight="5px"
                  w="90%"
                  style={{ borderRadius: "5px" }}
                />
                <SkeletonText mt="10px" noOfLines={2} spacing="1" width="90%" />
              </Stack>
              <Stack direction="column" width="100%">
                <Skeleton
                  marginTop="5%"
                  height="180px"
                  borderRadius="5px"
                  paddingLeft="5px"
                  paddingRight="5px"
                  w="90%"
                  style={{ borderRadius: "5px" }}
                />
                <SkeletonText mt="10px" noOfLines={2} spacing="1" width="90%" />
              </Stack>
            </>
          )}

          {!isLoading &&
            storeProducts.map((product) => {
              return <ProductCard product={product} store={storeData} />;
            })}
          {/* product item ends here */}
        </SimpleGrid>
        {/* </div> */}
      </div>
    )
  ) : (
    <p>No STore BY That Name</p>
  );
};

export default withRouter(Store);
