import React, { useEffect, useState } from "react";
import styles from "../css/dashboard.module.css";
import VisibleIcon from "../../../assets/eye.svg";
import MessagesIcon from "../../../assets/chatbubble-ellipses.svg";
import ProductsIcon from "../../../assets/layersFilled.svg";
import CategoriesIcon from "../../../assets/gridFilled.svg";
import WhatsappLogo from "../../../assets/logo-whatsapp.svg";
import { getCountAPI } from "../../../api/sellerProductAPI";
import { getUserInfo } from "../../../api/sellerAccountAPI";
import BottomNavigationMenu from "../../../components/bottomNavigation";

import {
  SimpleGrid,
  Box,
  Flex,
  Image,
  SkeletonCircle,
  Stack,
  Text,
  useToast,
  Button,
} from "@chakra-ui/react";
import Placeholder from "../.../../../../assets/placeholder.png";
import { profileImagesRoot } from "../../../config";
import { Switch } from "@chakra-ui/react";
import { updateStoreStatusAPI } from "../../../api/sellerStoreAPI";
import { useHistory } from "react-router-dom";
import { CopyIcon } from "@chakra-ui/icons";
import copyText from "../../../components/copyText";

const Dashboard = () => {
  const [countData, setCountData] = useState({});
  const [userInfo, setUserInfo] = useState({ account_store_status: true });
  const history = useHistory();
  const toast = useToast();

  const shareToWhatsapp = () => {
    window.location.replace(
      `https://api.whatsapp.com/send?text=%F0%9F%91%8B%20Hello%0AWe%20have%20launched%20our%20online%20store%20${userInfo.account_store}.%20Now%20you%20can%20order%20products%20from%20us%20using%20this%20link%3A%20%0Ahttps://saav.in/store/${userInfo.account_store_link}%0A%0AFeel%20free%20to%20contact%20us%20for%20any%20help %20at%20${userInfo.account_whatsapp}.%20%0AThank%20You%F0%9F%98%8D%0A%0Amade%20using%20Saav.in`
    );
  };

  const flipStoreStatus = async (storeId) => {
    const response = await updateStoreStatusAPI(storeId);
    const modifiedUserInfo = {
      ...userInfo,
      account_store_status: !userInfo.account_store_status,
    };
    setUserInfo(modifiedUserInfo);
    console.log(response);
  };

  useEffect(() => {
    //get count of products and catgories of the current user
    const getCount = async () => {
      const response = await getCountAPI();
      setCountData(response.data.data);
    };
    const getUser = async () => {
      const response = await getUserInfo();
      setUserInfo(response.data.data);
    };
    getCount();
    getUser();
  }, []);
  return (
    <>
      <div className={styles.container}>
        <Box
          className={styles.topdiv}
          shadow="md"
          d="flex"
          justifyContent="center"
          style={
            userInfo.account_store_status
              ? { backgroundColor: "#08bd80" }
              : { backgroundColor: "red" }
          }
        >
          <Switch
            size="lg"
            right="6"
            top="5"
            pos="absolute"
            isChecked={userInfo.account_store_status ? true : false}
            onChange={(e) => flipStoreStatus(userInfo.id)}
          />
          <Flex direction="row" w="90%" mt="5">
            <Image
              borderRadius="full"
              boxSize="80px"
              fallback={<SkeletonCircle size="20" />}
              src={
                userInfo.account_store_image
                  ? `${profileImagesRoot}/${userInfo.account_store_image}`
                  : Placeholder
              }
              alt="Segun Adebayo"
            />
            <Flex direction="column" ml="4" mt="2">
              <h1 className={styles.welcome}>Welcome back,</h1>
              <h1 className={styles.shopname}>{userInfo.account_store}</h1>
            </Flex>
          </Flex>
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          borderRadius="30px"
          w="90%"
          mt="-60px"
          zIndex="1"
          p="8px"
          backgroundColor="#fff"
        >
          <h1 className={styles.text}>🎉 Official Saav Sellers Group</h1>

          <button
            className={styles.btn_whatsapp}
            onClick={() =>
              window.location.replace(
                `https://chat.whatsapp.com/JWEKR2kuhpR81ZGB5aa4FQ`
              )
            }
          >
            <img src={WhatsappLogo} alt="w" className={styles.whatsappicon} />
            Join Now
          </button>
        </Stack>
        <SimpleGrid columns={2} spacing={3} w="90%" mt="5" zIndex="1">
          <Box
            height="100px"
            w="100%"
            shadow="base"
            backgroundColor="white"
            borderRadius="18px"
            display="flex"
            dir="row"
          >
            <Image
              src={VisibleIcon}
              className={styles.iconFilled}
              width="5"
              height="5"
              mt="4"
              ml="3"
            />
            <Flex direction="column" mt="4" ml="1">
              <h1 className={styles.card_heading}>Store visits</h1>
              <h1 className={styles.card_data_bold}>
                {countData && countData.store_views ? countData.store_views : 0}
              </h1>
            </Flex>
          </Box>
          <Box
            height="100px"
            w="100%"
            shadow="base"
            backgroundColor="white"
            borderRadius="18px"
            display="flex"
            dir="row"
          >
            <Image
              src={MessagesIcon}
              className={styles.iconFilled}
              width="5"
              height="5"
              mt="4"
              ml="3"
            />
            <Flex direction="column" mt="4" ml="1">
              <h1 className={styles.card_heading}>Messages Started</h1>
              <h1 className={styles.card_data_bold}>
                {countData && countData.message_clicks
                  ? countData.message_clicks
                  : 0}
              </h1>
            </Flex>
          </Box>
          <Box
            onClick={() => history.push("/app/products")}
            height="100px"
            w="100%"
            shadow="base"
            backgroundColor="white"
            borderRadius="18px"
            display="flex"
            dir="row"
          >
            <Image
              src={ProductsIcon}
              className={styles.iconFilled}
              width="5"
              height="5"
              mt="4"
              ml="3"
            />
            <Flex direction="column" mt="4" ml="1">
              <h1 className={styles.card_heading}>Products</h1>
              <h1 className={styles.card_data_bold}>
                {countData && countData.products_count}
              </h1>
            </Flex>
          </Box>
          <Box
            onClick={() => history.push("/app/categories")}
            height="100px"
            w="100%"
            shadow="base"
            backgroundColor="white"
            borderRadius="18px"
            display="flex"
            dir="row"
          >
            <Image
              src={CategoriesIcon}
              className={styles.iconFilled}
              width="7"
              height="5"
              mt="4"
              ml="3"
            />
            <Flex direction="column" mt="4" ml="1">
              <h1 className={styles.card_heading}>Categories</h1>
              <h1 className={styles.card_data_bold}>
                {countData && countData.cat_count}
              </h1>
            </Flex>
          </Box>
        </SimpleGrid>
        <div className={styles.cardPlain}>
          <h1 className={styles.cardPlainHeading}>
            Share link on Social Media
          </h1>
          <h1 className={styles.cardPlainSubHeading}>
            Your customers can visit your online store and see your products
            from this link
          </h1>
          <Stack
            direction="row"
            justifyContent="space-between"
            ml="6px"
            alignItems="center"
          >
            <Text
              color="#028ccc"
              textTransform="lowercase"
              onClick={() =>
                window.open(
                  `https://saav.in/store/${userInfo.account_store_link}`
                )
              }
            >
              saav.in/store/{userInfo.account_store_link}
            </Text>
            {userInfo?.account_store_link && (
              <Stack direction="row" alignItems="center">
                <CopyIcon
                  boxSize="25px"
                  onClick={() => {
                    copyText(
                      `https://saav.in/store/${userInfo.account_store_link}`
                    );
                    toast({
                      position: "bottom",
                      duration: 1000,
                      render: () => (
                        <Box
                          color="white"
                          p={3}
                          mb="80px"
                          ml="30%"
                          bg="green.500"
                          borderRadius="30px"
                          textAlign="center"
                          width="140px"
                        >
                          Copied
                        </Box>
                      ),
                    });
                  }}
                />
                <button
                  className={styles.btn_whatsapp}
                  onClick={shareToWhatsapp}
                >
                  <img
                    src={WhatsappLogo}
                    alt="w"
                    className={styles.whatsappicon}
                  />
                  Share
                </button>
              </Stack>
            )}
          </Stack>
        </div>
        <BottomNavigationMenu />
      </div>
    </>
  );
};

export default Dashboard;
