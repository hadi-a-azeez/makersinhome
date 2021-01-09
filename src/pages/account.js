import React, { useEffect, useState } from "react";
import styles from "./css/account.module.css";
import theme from "./css/theme/theme.module.css";
import { Link, useHistory } from "react-router-dom";
import LabelHeader from "../components/labelHeader";
import { getStoreInfoAPI } from "../api/sellerAccountAPI";
import Placeholder from "../assets/placeholder.png";
import { profileImagesRoot } from "../config";
import { Stack, Image, Flex } from "@chakra-ui/react";
import WhatsappLogo from "../assets/logo-whatsapp.svg";
import ContactUs from "../assets/call_outline.svg";
import AboutUs from "../assets/about_outline.svg";
import LogOut from "../assets/logout_outline.svg";

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
      setStoreInfo(response.data.data[0]);
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
                ? `${profileImagesRoot}/${storeInfo.account_store_image}`
                : Placeholder
            }
            borderRadius="full"
            boxSize="80px"
            objectFit="cover"
          />
          <Flex direction="column" mt="3" ml="3">
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              {storeInfo.account_store}
            </h1>
            <Link to="/edit_account" className={styles.link}>
              Edit business details
            </Link>
          </Flex>
        </Flex>
        <hr style={{ height: "1px", width: "80%" }} />

        <Stack
          spacing={2}
          direction="row"
          ml="8"
          mt="3"
          alignSelf="flex-start"
          onClick={() => (window.location = "https://wa.link/t25r2b")}
        >
          <img
            src={WhatsappLogo}
            alt="w"
            style={{ width: "24px", height: "24px", alignSelf: "center" }}
          />
          <h1 style={{ fontSize: "20px" }}>Whatsapp Support</h1>
        </Stack>
        <Stack
          spacing={2}
          direction="row"
          ml="8"
          mt="4"
          alignSelf="flex-start"
          onClick={() => (window.location = "tel:9496742190")}
        >
          <img
            src={ContactUs}
            alt="w"
            style={{ width: "24px", height: "24px", alignSelf: "center" }}
          />
          <h1 style={{ fontSize: "20px" }}>Call us</h1>
        </Stack>
        <Stack
          spacing={2}
          direction="row"
          ml="8"
          mt="4"
          alignSelf="flex-start"
          onClick={() => (window.location = "tel:9496742190")}
        >
          <img
            src={AboutUs}
            alt="w"
            style={{ width: "24px", height: "24px", alignSelf: "center" }}
          />
          <h1 style={{ fontSize: "20px" }}>About Us</h1>
        </Stack>
        <Stack
          spacing={2}
          direction="row"
          alignSelf="flex-start"
          ml="8"
          mt="4"
          onClick={logOut}
        >
          <img
            src={LogOut}
            alt="w"
            style={{ width: "24px", height: "24px", alignSelf: "center" }}
          />
          <h1 style={{ fontSize: "20px" }}>Log Out</h1>
        </Stack>
      </div>
    </>
  );
};

export default Account;
