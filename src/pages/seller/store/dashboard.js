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
import Nux from "../../../components/nux/index";
import PwaInstall from "../../../components/PwaInstall";

import {
  CircularProgress,
  SimpleGrid,
  Box,
  Flex,
  Image,
  SkeletonCircle,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Placeholder from "../.../../../../assets/placeholder.png";
import { profileImagesRoot } from "../../../config";
import { Switch } from "@chakra-ui/react";
import { updateStoreStatusAPI } from "../../../api/sellerStoreAPI";
import { useHistory } from "react-router-dom";
import { CopyIcon, LockIcon } from "@chakra-ui/icons";
import copyText from "../../../components/copyText";
import tw, { styled } from "twin.macro";
import MetricsCard from "../../../components/MetricsCard";
import SellerPageLayout from "../../../layouts/Seller";

const Container = styled.div`
  ${tw`flex flex-col items-center w-full bg-gray-100`}
  min-height: 100vh;
`;

const Dashboard = () => {
  const [countData, setCountData] = useState({});
  const [userInfo, setUserInfo] = useState({ account_store_status: true });
  const [isLoading, setIsLoading] = useState(true);
  const [isTasksCompleted, setIsTasksCompleted] = useState(false);
  const history = useHistory();
  const toast = useToast();

  const shareToWhatsapp = () => {
    window.location.replace(
      `https://api.whatsapp.com/send?text=%F0%9F%91%8B%20Hello%0AWe%20have%20launched%20our%20online%20store%20${userInfo.account_store}.%20Now%20you%20can%20order%20products%20from%20us%20using%20this%20link%3A%20%0Ahttps://saav.in/store/${userInfo.account_store_link}%0A%0AFeel%20free%20to%20contact%20us%20for%20any%20help %20at%20${userInfo.account_whatsapp}.%20%0AThank%20You%F0%9F%98%8D%0A%0Amade%20using%20Saav.in`
    );
  };

  useEffect(() => {
    setIsLoading(true);
    const getDataAll = async () => {
      //get count of products and catgories of the current user
      const responseCount = await getCountAPI();
      setCountData(responseCount?.data?.data);
      const responseUser = await getUserInfo();
      console.log(responseUser);
      setUserInfo(responseUser?.data?.data);

      if (
        responseCount?.data.data.products_count < 1 ||
        !responseUser?.data.data.account_store_image ||
        !responseUser?.data.data.cat_count === 0
      ) {
        setIsTasksCompleted(false);
      } else setIsTasksCompleted(true);
      setIsLoading(false);
    };
    getDataAll();
  }, []);
  return isLoading ? (
    <Stack w="100%" h="100vh" justifyContent="center" alignItems="center">
      <CircularProgress color="#00b140" isIndeterminate />
    </Stack>
  ) : (
    <>
      <SellerPageLayout>
        <Container>
          {/* <Box
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
          </Box> */}
          <PwaInstall />
          {!isTasksCompleted && (
            <Nux
              storeImage={userInfo.account_store_image}
              notifToken={userInfo.account_notif_token}
              productCount={countData.products_count}
              catCount={countData.cat_count}
            />
          )}
          <Box
            mt="30px"
            w="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            {!isTasksCompleted && (
              <Stack
                direction="column"
                backgroundColor="#fff"
                justifyContent="center"
                alignItems="center"
                h="120px"
                borderRadius="10px"
                p="10px"
                w="60%"
                position="absolute"
                zIndex="2"
                boxShadow="rgba(180, 181, 187, 0.2) 0px 8px 24px"
              >
                <LockIcon boxSize="40px" />
                <Text textAlign="center" fontFamily="elemen">
                  Please Complete all tasks to unlock user data.
                </Text>
              </Stack>
            )}
            <SimpleGrid
              position="relative"
              columns={{ sm: 2, md: 3, lg: 4 }}
              spacing={3}
              w="90%"
              zIndex="1"
              filter={isTasksCompleted ? "" : "blur(4px)"}
            >
              <MetricsCard
                title="Store visits"
                value={countData?.store_views || 0}
                icon={VisibleIcon}
                link=""
              />

              <MetricsCard
                title="Messages Started"
                value={countData?.message_clicks || 0}
                icon={MessagesIcon}
                link=""
              />

              <MetricsCard
                title="Products"
                value={countData?.products_count}
                icon={ProductsIcon}
                link=""
              />

              <MetricsCard
                title="Categories"
                value={countData?.cat_count}
                icon={CategoriesIcon}
                link=""
              />
            </SimpleGrid>
          </Box>
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
        </Container>
      </SellerPageLayout>
    </>
  );
};

export default Dashboard;
