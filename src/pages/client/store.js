import React, { useEffect, useState } from "react";
import styles from "./css/store.module.css";
import { ArrowDownIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useHistory, withRouter } from "react-router-dom";
import { getStoreDataAll } from "../../api/custStoreAPI";
//import { productImagesRoot } from "../../config";
import { updateStoreViews } from "../../api/custAnalyticsAPI";
import Whatsapp from "../../assets/whatsapp_filled.svg";
import Placeholder from "../../assets/placeholder.png";
import CartIcon from "../../assets/cartIcon.svg";
//import MenuIcon from "../../assets/bars.svg";

import {
  Popover,
  PopoverCloseButton,
  PopoverArrow,
  PopoverTrigger,
  SkeletonText,
  Text,
  PopoverContent,
  PopoverHeader,
} from "@chakra-ui/react";

import {
  Button,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Stack,
  Image,
  IconButton,
  Box,
} from "@chakra-ui/react";
import ProductCard from "../../components/ProductCard";
import useStore from "../../cartState";
import { profileImagesRoot } from "../../config";
import useFrontStore from "../../storeFrontState";
import FocusLock from "@chakra-ui/focus-lock";
import StoreShut from "./storeShut";

const Store = (props) => {
  let history = useHistory();

  const storeLink = props.match.params.storelink;
  const [storeData, setStoreData] = useState({});
  const [storeCategories, setStoreCategories] = useState([]);

  const [isStoreExists, setIsStoreExists] = useState(true);
  const { isLastPage, setIsLastPage } = useFrontStore();
  const cartProducts = useStore((state) => state.products);

  const { isMoreLoading, setIsMoreLoading } = useFrontStore();
  const { storeIdCurrent, setStoreIdCurrent } = useFrontStore();
  const { isLoading, setIsLoading } = useFrontStore();
  const { catSelected, setCatSelected } = useFrontStore();
  const { pageNo, incrementPageNo } = useFrontStore();
  const fetchProducts = useFrontStore((state) => state.fetchProducts);
  const { storeProducts, setStoreProducts } = useFrontStore();
  const { sortName, setSortName } = useFrontStore();

  useEffect(() => {
    const getData = async () => {
      storeProducts.length < 1 && setIsLoading(true);
      const storeResponse = await getStoreDataAll(storeLink);
      if (storeResponse.status !== 404) {
        setStoreData(storeResponse.data.data.storeinfo);
        setStoreCategories(storeResponse.data.data.categories);
        if (storeIdCurrent !== storeResponse.data.data.storeinfo.id) {
          setStoreProducts([]);
          setIsLoading(true);
          await fetchProducts(storeResponse.data.data.storeinfo.id);
          setStoreIdCurrent(storeResponse.data.data.storeinfo.id);
          setIsLoading(false);
        }
        //update store views analytics
        await sendStoreAnalytics(storeResponse.data.data.storeinfo.id);
      } else {
        setIsStoreExists(false);
      }
    };

    getData();
  }, []);

  const sendStoreAnalytics = async (storeId) => {
    //check if storeid is in array and date is today if not add and increment store visit
    const todayDate = "22/04/2021";
    const visits = JSON.parse(localStorage.getItem("visits"));
    if (visits) {
      if (visits.date !== todayDate) {
        localStorage.removeItem("visits");
        await updateStoreViews(storeId);
        localStorage.setItem(
          "visits",
          JSON.stringify({ array: [storeId], date: todayDate })
        );
      } else {
        const isVisited = visits.array.some((visit) => visit === storeId);
        if (!isVisited) {
          await updateStoreViews(storeId);
          localStorage.setItem(
            "visits",
            JSON.stringify({
              array: [...visits.array, storeId],
              date: todayDate,
            })
          );
        }
      }
    } else {
      await updateStoreViews(storeId);
      localStorage.setItem(
        "visits",
        JSON.stringify({ array: [storeId], date: todayDate })
      );
    }
  };

  return isStoreExists ? (
    storeData.account_store_status === 0 ? (
      <StoreShut storeData={storeData} />
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
          <div className={styles.header_container}>
            <div className={styles.logo_container}>
              <Image
                src={
                  storeData.account_store_image
                    ? `${profileImagesRoot}/${storeData.account_store_image}`
                    : Placeholder
                }
                borderRadius="full"
                boxSize="46px"
                objectFit="cover"
                fallback={
                  <Image src={Placeholder} borderRadius="full" boxSize="46px" />
                }
              />
              <h2 className={styles.logo_name}>{storeData.account_store}</h2>
            </div>
            <div className={styles.whatsapp_support_button}>
              <img
                src={Whatsapp}
                onClick={() =>
                  window.location.replace(
                    `https://api.whatsapp.com/send?phone=+91${storeData.account_whatsapp}&text=Hi%20I%20came%20from%20your%20store%20%E2%9C%8B`
                  )
                }
              />
            </div>
          </div>
        </div>
        <InputGroup
          w={{ base: "92%", lg: "40%" }}
          mb="6"
          size="lg"
          backgroundColor="white"
          borderRadius="30px"
          fontFamily="elemen"
          alignSelf={{ lg: "flex-start" }}
          ml={{ lg: "2.5%" }}
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

        <div className={styles.categories_container}>
          {storeCategories.length < 1 ? (
            <div
              className={
                catSelected == "all"
                  ? styles.category_item_selected
                  : styles.category_item
              }
              onClick={() => setCatSelected("all", storeData.id)}
            >
              All
            </div>
          ) : (
            <>
              <div
                className={
                  catSelected == "all"
                    ? styles.category_item_selected
                    : styles.category_item
                }
                onClick={() => setCatSelected("all", storeData.id)}
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
                  onClick={() => setCatSelected(cat.id, storeData.id)}
                >
                  {cat.cat_name}
                </div>
              ))}
            </>
          )}
          {isLoading && storeCategories.length < 1 && (
            <>
              <Skeleton w="60px" h="40px" borderRadius="40px" ml="8px" />
              <Skeleton w="90px" h="40px" borderRadius="40px" ml="8px" />
              <Skeleton w="80px" h="40px" borderRadius="40px" ml="8px" />
              <Skeleton w="80px" h="40px" borderRadius="40px" ml="8px" />
            </>
          )}
        </div>

        {/* product item starts here */}

        {isLoading && (
          <Skeleton
            mt="10px"
            height={{ base: "45px" }}
            borderRadius="5px"
            ml="4%"
            alignSelf="flex-start"
            w="40%"
          />
        )}

        {!isLoading && storeProducts.length > 0 && (
          <Popover>
            {({ isOpen, onClose }) => (
              <>
                <PopoverTrigger>
                  <Stack
                    alignSelf="flex-start"
                    direction="column"
                    ml={{ base: "5%", lg: "3%" }}
                    mt={{ base: "10px", lg: "20px" }}
                    spacing="0"
                  >
                    <Button
                      p="0px"
                      height="18px"
                      backgroundColor="#fff"
                      rightIcon={<ChevronDownIcon boxSize="25px" />}
                      fontFamily="elemen"
                      fontSize="18px"
                      _hover={{ bg: "#fff" }}
                      _active={{ bg: "#fff" }}
                      _focus={{ bg: "#fff" }}
                    >
                      Sort Products
                    </Button>
                    <Text fontSize="15px" color="#828282">
                      {sortName[2]}
                    </Text>
                  </Stack>
                </PopoverTrigger>

                <PopoverContent mt="-10px" w="180px" ml="20px">
                  <Stack direction="column" p="10px">
                    <Text
                      p="6px"
                      onClick={() => {
                        setSortName(
                          ["id", "desc", "Newest First"],
                          storeData.id
                        );
                        onClose();
                      }}
                      fontFamily="elemen"
                      _hover={{ bg: "#e0e0e0" }}
                    >
                      Newest First
                    </Text>
                    <Text
                      p="6px"
                      fontFamily="elemen"
                      onClick={() => {
                        setSortName(
                          ["product_sale_price", "asc", "Price - Low to High"],
                          storeData.id
                        );
                        onClose();
                      }}
                      _hover={{ bg: "#e0e0e0" }}
                    >
                      Price - Low to High
                    </Text>
                    <Text
                      p="6px"
                      fontFamily="elemen"
                      onClick={() => {
                        setSortName(
                          ["product_sale_price", "desc", "Price - High to Low"],
                          storeData.id
                        );
                        onClose();
                      }}
                      _hover={{ bg: "#e0e0e0" }}
                    >
                      Price - High to Low
                    </Text>
                  </Stack>
                </PopoverContent>
              </>
            )}
          </Popover>
        )}

        {!isLoading && storeProducts.length < 1 && (
          <Text mt="40px">No Products</Text>
        )}
        <SimpleGrid columns={{ base: 2, lg: 4 }} spacing={1} w="95%">
          {isLoading && (
            <>
              <Stack
                direction="column"
                width="100%"
                paddingLeft="5px"
                marginTop="5%"
                paddingRight="5px"
              >
                <Skeleton
                  height={{ base: "180px", lg: "290px" }}
                  borderRadius="5px"
                  w="98%"
                  style={{ borderRadius: "5px" }}
                />
                <SkeletonText mt="10px" noOfLines={2} spacing="1" width="90%" />
              </Stack>
              <Stack
                paddingLeft="5px"
                marginTop="5%"
                paddingRight="5px"
                direction="column"
                width="100%"
              >
                <Skeleton
                  height={{ base: "180px", lg: "290px" }}
                  borderRadius="5px"
                  w="98%"
                  style={{ borderRadius: "5px" }}
                />
                <SkeletonText mt="10px" noOfLines={2} spacing="1" width="90%" />
              </Stack>
              <Stack
                paddingLeft="5px"
                marginTop="5%"
                paddingRight="5px"
                direction="column"
                width="100%"
              >
                <Skeleton
                  height={{ base: "180px", lg: "290px" }}
                  borderRadius="5px"
                  w="98%"
                  style={{ borderRadius: "5px" }}
                />
                <SkeletonText mt="10px" noOfLines={2} spacing="1" width="90%" />
              </Stack>
            </>
          )}

          {!isLoading &&
            storeProducts.map((product) => {
              return (
                <ProductCard
                  product={product}
                  store={storeData}
                  key={product.id}
                />
              );
            })}
          {/* product item ends here */}
        </SimpleGrid>

        {storeProducts.length > 0 && !isLastPage && (
          <Button
            mt="20px"
            onClick={() => incrementPageNo(storeData.id)}
            isLoading={isMoreLoading}
          >
            Load More
          </Button>
        )}

        <div style={{ marginBottom: "30px" }} />
        {/* </div> */}
      </div>
    )
  ) : (
    <p>No STore BY That Name</p>
  );
};

export default withRouter(Store);
