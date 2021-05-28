import React, { useEffect, useRef, useState } from "react";
import styles from "../css/account.module.css";
import { Link, useHistory } from "react-router-dom";
import LabelHeader from "../../../components/labelHeader";
import { getStoreInfoAPI } from "../../../api/sellerAccountAPI";
import Placeholder from "../../../assets/placeholder.png";
import { profileImagesRoot } from "../../../config";
import BottomNavigationMenu from "../../../components/bottomNavigation";

import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Stack,
  Image,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Box,
  Heading,
  Text,
  IconButton,
} from "@chakra-ui/react";
import WhatsappLogo from "../../../assets/logo-whatsapp.svg";
import ContactUs from "../../../assets/call_outline.svg";
import AboutUs from "../../../assets/about_outline.svg";
import LogOut from "../../../assets/logout_outline.svg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { CloseIcon } from "@chakra-ui/icons";
import FocusLock from "@chakra-ui/focus-lock";

const Account = () => {
  const [storeInfo, setStoreInfo] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();

  let history = useHistory();
  const logOut = () => {
    localStorage.removeItem("loginExpiry");
    localStorage.removeItem("token");
    history.push("/login");
  };

  useEffect(() => {
    (async () => {
      const response = await getStoreInfoAPI();
      setStoreInfo(response.data.data);
    })();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <LabelHeader label={"Account"} />
        <div style={{ marginTop: "70px" }} />
        <Flex direction="row" w="85%" mt="3" mb="3">
          <Image
            src={
              storeInfo.account_store_image
                ? `${profileImagesRoot}/${storeInfo.account_store_image}`
                : Placeholder
            }
            borderRadius="full"
            boxSize="80px"
            objectFit="cover"
            fallback={<SkeletonCircle size="20" />}
          />
          <Flex direction="column" mt="3" ml="3">
            {storeInfo.account_store ? (
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                {storeInfo.account_store}
              </h1>
            ) : (
              <SkeletonText noOfLines={1} height="20px" />
            )}
            <Link to="/app/edit_account" className={styles.link}>
              Edit store details
            </Link>
          </Flex>
        </Flex>
        <hr style={{ height: "1px", width: "80%" }} />
        <div className={styles.nav_container}>
          <div
            className={styles.nav_item}
            onClick={() =>
              window.location.replace(
                `https://api.whatsapp.com/send?phone=916282672467&text=Hi%20i%20have%20some%20doubts%20about%20Saav%20%E2%9C%8B`
              )
            }
          >
            <img src={WhatsappLogo} alt="w" />
            <h1>Whatsapp Support</h1>
          </div>
          <div
            className={styles.nav_item}
            onClick={() => (window.location = "tel:9496742190")}
          >
            <img src={ContactUs} alt="w" />
            <h1>Call Us</h1>
          </div>
          <Popup
            lockScroll={true}
            modal
            contentStyle={{
              width: "80vw",
              borderRadius: "10px",
              padding: "10px",
            }}
            trigger={
              <div className={styles.nav_item}>
                <img src={AboutUs} alt="w" />
                <h1>About </h1>
              </div>
            }
          >
            {(close) => (
              <Stack>
                <FocusLock />
                <IconButton
                  alignSelf="flex-end"
                  icon={<CloseIcon />}
                  w="40px"
                  h="40px"
                  onClick={close}
                />
                <Heading size="sm" alignSelf="center">
                  About Us
                </Heading>
                <Text alignSelf="center" mt="10px" p="10px" textAlign="center">
                  We are Saav, we provide online entrepreneurs and small
                  business owners with the technology, services, and support to
                  succeed online.
                </Text>
              </Stack>
            )}
          </Popup>

          <div className={styles.nav_item} onClick={() => setIsOpen(true)}>
            <img src={LogOut} alt="w" />
            <h1>Logout </h1>
          </div>
          <AlertDialog
            isCentered
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={() => setIsOpen(false)}
          >
            <AlertDialogOverlay>
              <AlertDialogContent w="90%">
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Logout Confirmation
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to Logout?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={logOut} ml={3}>
                    Logout
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </div>
        <BottomNavigationMenu />
      </div>
    </>
  );
};

export default Account;
