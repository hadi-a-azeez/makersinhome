import React from "react";
import styles from "./css/home.module.css";
import mockupmain from "../../assets/mockone.png";
import { useHistory } from "react-router-dom";
import Header from "../../components/header";
import { Text } from "@chakra-ui/layout";
import Whatsapp from "../../assets/whatsapp_filled.svg";
import { IconButton } from "@chakra-ui/button";

const Home = () => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.main_heading}>
        Build an online store for your Instagram business .
      </h1>
      <h1 className={styles.sub_heading}>
        An online store for your Instagram business will make you stand alone
        among your competitors.
      </h1>
      <button
        className={styles.register_btn}
        onClick={() => history.push("/signup")}
      >
        Create My Store
      </button>
      <Text
        mt="12px"
        alignSelf="center"
        color="#008aed"
        fontSize="15px"
        fontFamily="elemen"
        borderBottom="1.5px solid #008aed"
        onClick={() => history.push("/store/jungle")}
      >
        See a Example Store
      </Text>

      <IconButton
        position="fixed"
        bottom="20px"
        right="20px"
        borderColor="#008aed"
        icon={<img src={Whatsapp} width="40px" />}
        boxSize="50px"
        borderRadius="full"
        onClick={() =>
          window.location.replace(
            `https://api.whatsapp.com/send?text=Hi%20I%20i%20have%20some%20doubts%20about%20Saav.%20%E2%9C%8B`
          )
        }
      />
      <img src={mockupmain} alt="s" className={styles.main_mockup} />
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
