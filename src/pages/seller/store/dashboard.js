import React, { useEffect, useState } from "react";
import styles from "../css/dashboard.module.css";
import VisibleIcon from "../../../assets/eye.svg";
import MessagesIcon from "../../../assets/chatbubble-ellipses.svg";
import ProductsIcon from "../../../assets/layersFilled.svg";
import CategoriesIcon from "../../../assets/gridFilled.svg";
import WhatsappLogo from "../../../assets/logo-whatsapp.svg";
import { getCountAPI } from "../../../api/sellerProductAPI";
import { getUserInfo } from "../../../api/sellerAccountAPI";
import { SimpleGrid, Box, Flex, Image } from "@chakra-ui/react";
import Switch from "react-switch";

const Dashboard = () => {
  const [countData, setCountData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const shareToWhatsapp = () => {
    window.location.replace(
      `https://api.whatsapp.com/send?text=%F0%9F%91%8B%20Hello%0AWe%20have%20launched%20our%20online%20store%20${userInfo.account_store}.%20Now%20you%20can%20order%20products%20from%20us%20using%20this%20link%3A%20%0Amakersinhome.netlify.app/${userInfo.account_store_link}%0A%0AFeel%20free%20to%20contact%20us%20for%20any%20help %20at%20${userInfo.account_whatsapp}.%20%0AThank%20You%F0%9F%98%8D%0A%0Amade%20using%20Shopwhats`
    );
  };

  useEffect(() => {
    //get count of products and catgories of the current user
    const getCount = async () => {
      const response = await getCountAPI();
      setCountData(response.data.data[0]);
    };
    const getUser = async () => {
      const response = await getUserInfo();
      setUserInfo(response.data.data);
    };
    getCount();
    getUser();
    console.log(userInfo);
  }, []);
  return (
    <>
      <div className={styles.container}>
        <Box
          className={styles.topdiv}
          shadow="md"
          d="flex"
          justifyContent="center"
          style={{ backgroundColor: " #00b140" }}
        >
          <Switch
            onColor="#ffffff"
            width={36}
            height={21}
            style={{ position: "absolute", right: "3" }}
          />
          <Flex direction="row" w="90%" mt="8">
            <Image
              borderRadius="full"
              boxSize="80px"
              src="https://mindbodygreen-res.cloudinary.com/images/w_767,q_auto:eco,f_auto,fl_lossy/usr/RetocQT/sarah-fielding.jpg"
              alt="Segun Adebayo"
            />
            <Flex direction="column" ml="4" mt="2">
              <h1 className={styles.welcome}>Welcome back,</h1>
              <h1 className={styles.shopname}>Naaz Shop</h1>
            </Flex>
          </Flex>
        </Box>
        <SimpleGrid columns={2} spacing={3} w="90%" mt="-10" zIndex="1">
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
                {countData.message_clicks ? countData.message_clicks : 0}
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
                {countData.message_clicks ? countData.message_clicks : 0}
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
                {countData.products_count}
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
              src={CategoriesIcon}
              className={styles.iconFilled}
              width="7"
              height="5"
              mt="4"
              ml="3"
            />
            <Flex direction="column" mt="4" ml="1">
              <h1 className={styles.card_heading}>Categories</h1>
              <h1 className={styles.card_data_bold}>{countData.cat_count}</h1>
            </Flex>
          </Box>
        </SimpleGrid>
        <div className={styles.cardPlain} onClick={shareToWhatsapp}>
          <h1 className={styles.cardPlainHeading}>
            Share link on Social Media
          </h1>
          <h1 className={styles.cardPlainSubHeading}>
            Your customers can visit your online store and see your products
            from this link
          </h1>
          <button className={styles.btn_whatsapp}>
            <img src={WhatsappLogo} alt="w" className={styles.whatsappicon} />
            Share
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
