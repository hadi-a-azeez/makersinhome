import React, { useEffect, useState } from "react";
import styles from "./css/account.module.css";
import theme from "./css/theme/theme.module.css";
import { Link, useHistory } from "react-router-dom";
import LabelHeader from "../components/labelHeader";
import { getStoreInfoAPI } from "../api/sellerAccountAPI";
import Placeholder from "../assets/placeholder.png";
import { profileImagesRoot } from "../config";

const Account = () => {
  const [storeInfo, setStoreInfo] = useState({});

  let history = useHistory();
  const logOut = () => {
    localStorage.removeItem("loginExpiry");
    localStorage.removeItem("token");
    history.push("./");
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
        <div className={styles.card}>
          <div className={styles.image_block}>
            <div className={styles.thumbnail}>
              <img
                src={
                  storeInfo.account_store_image
                    ? `${profileImagesRoot}/${storeInfo.account_store_image}`
                    : Placeholder
                }
                alt="image"
                className={styles.thumbnail_image}
              />
            </div>
          </div>
          <div className={styles.account_details}>
            <h1 className={styles.heading_bold_account}>
              {storeInfo.account_store}
            </h1>
            <Link to="/edit_account" className={styles.link}>
              Edit business details
            </Link>
          </div>
        </div>

        <div
          className={styles.menuRow}
          onClick={() => (window.location = "https://wa.link/t25r2b")}
        >
          Whatsapp Support
        </div>

        <div
          className={styles.menuRow}
          onClick={() => (window.location = "tel:9496742190")}
        >
          Call us
        </div>

        <Link to="/about" className={styles.link}>
          <div className={styles.menuRow}>About us</div>
        </Link>

        <div className={styles.menuRow} onClick={logOut}>
          Logout
        </div>
      </div>
    </>
  );
};

export default Account;
