import React, { useEffect, useState } from "react";
import styles from "./css/dashboard.module.css";
import LabelHeader from "../components/labelHeader";
import VisibleIcon from "../assets/eye.svg";
import MessagesIcon from "../assets/chatbubble-ellipses.svg";
import ProductsIcon from "../assets/layersFilled.svg";
import CategoriesIcon from "../assets/gridFilled.svg";
import WhatsappLogo from "../assets/logo-whatsapp.svg";
import { getCountAPI } from "../api/sellerProductAPI";
import { getUserInfo } from "../api/sellerAccountAPI";
import { SimpleGrid } from "@chakra-ui/react";

const Dashboard = () => {
  const [countData, setCountData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const shareToWhatsapp = () => {
    window.location.replace(
      `https://api.whatsapp.com/send?text=%F0%9F%91%8B%20Hello%0AWe%20have%20launched%20our%20online%20store%20${userInfo.account_store}.%20Now%20you%20can%20order%20products%20from%20us%20using%20this%20link%3A%20%0Amakersinhome.netlify.app/${userInfo.account_store_link}%0A%0AFeel%20free%20to%20contact%20us%20for%20any%20help %20at%20${userInfo.account_whatsapp}.%20%0AThank%20You%F0%9F%98%8D%0A%0Amade%20using%20Shopwhats`
    );
  };

  useEffect(() => {
    console.log("started");
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
        <LabelHeader label={"Home"} />
        <h1 className={styles.heading_bold}>Dashboard</h1>
        <SimpleGrid columns={2} spacing={5} w="90%">
          <div className={`${styles.card} ${styles.green}`}>
            <div className={styles.card_content}>
              <img src={VisibleIcon} alt="home" className={styles.iconFilled} />
              <h1 className={styles.card_heading}>Store visits</h1>
              <h1 className={styles.card_data_bold}>
                {countData.store_views ? countData.store_views : 0}
              </h1>
            </div>
          </div>
          <div className={`${styles.card} ${styles.blue}`}>
            <div className={styles.card_content}>
              <img
                src={MessagesIcon}
                alt="home"
                className={styles.iconFilled}
              />
              <h1 className={styles.card_heading}>Messages started</h1>
              <h1 className={styles.card_data_bold}>
                {countData.message_clicks ? countData.message_clicks : 0}
              </h1>
            </div>
          </div>

          <div className={`${styles.card} ${styles.yellow}`}>
            <div className={styles.card_content}>
              <img
                src={ProductsIcon}
                alt="home"
                className={styles.iconFilled}
              />
              <h1 className={styles.card_heading}>Total products</h1>
              <h1 className={styles.card_data_bold}>
                {countData.products_count}
              </h1>
            </div>
          </div>
          <div className={`${styles.card} ${styles.red}`}>
            <div className={styles.card_content}>
              <img
                src={CategoriesIcon}
                alt="home"
                className={styles.iconFilled}
              />
              <h1 className={styles.card_heading}>Categories</h1>
              <h1 className={styles.card_data_bold}>{countData.cat_count}</h1>
            </div>
          </div>
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
