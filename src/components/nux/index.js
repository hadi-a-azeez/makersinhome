import React from "react";
import styles from "../css/nux.module.css";
import { useHistory } from "react-router-dom";
import Task from "./task";
// import firebase from "../../firebase";
// import { updateStoreNotifTokenAPI } from "../../api/sellerStoreAPI";
// import ReactGA from "react-ga";
// import { useState } from "react";

const Nux = ({ storeImage, notifToken, productCount, catCount }) => {
  const history = useHistory();
  // const [isNotification, setIsNotification] = useState(
  //   notifToken ? true : false
  // );

  // const requestNotification = async () => {
  //   const requestResponse = await Notification.requestPermission();
  //   if (requestResponse === "granted") {
  //     setIsNotification(true);
  //     ReactGA.event({
  //       category: "Notification",
  //       action: `From NUX`,
  //     });
  //     const messaging = firebase.messaging();
  //     const token = await messaging.getToken();
  //     console.log(token);
  //     const response = await updateStoreNotifTokenAPI(token);
  //     console.log(response);
  //   }
  // };

  return (
    <>
      {/* complete profile section */}
      <div className={styles.nux_card}>
        <p className={styles.card_title}>Tasks</p>
        {/* <Task
          isLine={true}
          isCompleted={isNotification}
          number="1"
          heading={{
            success: "You will Get Order Notifications.",
            incomplete: "Allow Order Notifications",
          }}
          subHeading="You will get notification in your phone when order is placed."
          btnText="Allow Now"
          onClick={requestNotification}
        /> */}
        <Task
          isLine={true}
          isCompleted={!storeImage ? false : true}
          number="1"
          heading={{
            success: "Great, You have store image",
            incomplete: "Add store image",
          }}
          subHeading="Your store image will be visible to your viewers"
          btnText="Add store image"
          onClick={() => history.push("/app/edit_account")}
        />
        <Task
          isLine={true}
          isCompleted={catCount === 0 ? false : true}
          number="2"
          heading={{
            success: "Great, You added category",
            incomplete: "Add category",
          }}
          subHeading="Your customers can view products in various categories"
          btnText="Add category"
          onClick={() => history.push("/app/categories")}
        />
        <Task
          isLine={false}
          isCompleted={productCount < 2 ? false : true}
          number="3"
          heading={{
            success: "Great, You added products",
            incomplete: "Add products",
          }}
          subHeading="You need to add atleast 2 products in your store"
          btnText="Add products"
          onClick={() => history.push("/app/products")}
        />
      </div>
    </>
  );
};

export default Nux;
