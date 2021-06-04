import React from "react";
import styles from "../css/nux.module.css";
import { useHistory } from "react-router-dom";
import Task from "./task";

const Nux = ({ storeImage, catCount, productCount }) => {
  const history = useHistory();

  return (
    <>
      {/* complete profile section */}
      <div className={styles.nux_card}>
        <Task
          isLine={true}
          isCompleted={storeImage === null ? false : true}
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
