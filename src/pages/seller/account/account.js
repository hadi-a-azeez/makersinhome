import React, { useEffect, useState } from "react";
import styles from "../css/account.module.css";
import { Link, useHistory } from "react-router-dom";
import LabelHeader from "../../../components/labelHeader";
import { getStoreInfoAPI } from "../../../api/sellerAccountAPI";
import Placeholder from "../../../assets/placeholder.png";
import { profileImagesRoot } from "../../../config";
import {
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

  let history = useHistory();
  const logOut = () => {
    localStorage.removeItem("loginExpiry");
    localStorage.removeItem("token");
    history.push("./login");
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

        <Flex direction="row" w="85%" mt="3" mb="3">
          <Image
            src={
              storeInfo.account_store_image
                ? `https://firebasestorage.googleapis.com/v0/b/saav-9c29f.appspot.com/o/profile_images%2F${storeInfo.account_store_image}?alt=media`
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
            <Link to="/edit_account" className={styles.link}>
              Edit store details
            </Link>
          </Flex>
        </Flex>
        <hr style={{ height: "1px", width: "80%" }} />
        <div className={styles.nav_container}>
          <div
            className={styles.nav_item}
            onClick={() => (window.location = "https://wa.link/t25r2b")}
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

          <div className={styles.nav_item} onClick={logOut}>
            <img src={LogOut} alt="w" />
            <h1>Logout</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
