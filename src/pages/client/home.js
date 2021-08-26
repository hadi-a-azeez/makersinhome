import React from "react";
import styles from "./css/home.module.css";
import mockupmain from "../../assets/mockone.png";
import { useHistory } from "react-router-dom";
import Header from "../../components/header";
import { Text } from "@chakra-ui/layout";
import Whatsapp from "../../assets/whatsapp_filled.svg";
import { IconButton } from "@chakra-ui/button";
import { Badge } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/layout";

const Home = () => {
  const history = useHistory();

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.gridLeft}>
          <h1 className={styles.main_heading}>
            Build an online store for your Instagram business.
          </h1>
          <h1 className={styles.sub_heading}>
            An online store for your Instagram business will make you stand
            alone among your competitors.
          </h1>
          <button
            className={styles.register_btn}
            onClick={() => history.push("/signup")}
          >
            Create My Store
          </button>

          <Text
            mt="12px"
            color="#008aed"
            fontSize="15px"
            fontFamily="elemen"
            borderBottom="1.5px solid #008aed"
            onClick={() => history.push("/store/jungle")}
            className={styles.example_link}
          >
            See An Example Store
          </Text>
        </div>
        <Stack
          onClick={() =>
            window.location.replace(
              `https://api.whatsapp.com/send?phone=916282672467&text=Hi%20i%20have%20some%20doubts%20about%20Saav%20%E2%9C%8B`
            )
          }
          className={styles.whatsappbtn_wraper}
        >
          <IconButton
            alignSelf="flex-end"
            className={styles.whatsapp_button}
            icon={<img src={Whatsapp} alt="whatsapp" width="35px" />}
            boxSize="50px"
            borderRadius="full"
          />
          <Badge
            backgroundColor="yellow.300"
            paddingRight="8px"
            paddingLeft="8px"
            borderRadius="12px"
          >
            {" "}
            Message Us
          </Badge>
        </Stack>
        <div className={styles.gridRight}>
          <img
            src={mockupmain}
            alt="storedemo"
            className={styles.main_mockup}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
