import React from "react";
import styles from "./css/nux.module.css";
import Tick from "../assets/checkmark.svg";
import { useHistory } from "react-router-dom";

const Nux = ({ storeImage, catCount, productCount }) => {
  const history = useHistory();
  const Item = ({
    isLine,
    isCompleted,
    number,
    heading,
    subHeading,
    btnText,
    onClick,
  }) => {
    return (
      <div className={styles.card_body}>
        <div className={styles.left_section}>
          <div className={isCompleted ? styles.circle : styles.circle_outline}>
            {isCompleted ? (
              <img src={Tick} className={styles.tick} alt="tick" />
            ) : (
              <h1>{number}</h1>
            )}
          </div>
          {isLine && <div className={styles.line}></div>}
        </div>

        <div className={styles.right_section}>
          <div className={styles.child_section}>
            <h1 className={styles.profile_heading}>
              {isCompleted ? heading.success : heading.incomplete}
            </h1>
            <h1 className={styles.profile_sub_heading}>{subHeading}</h1>
            {isCompleted ? (
              <button
                className={styles.profile_button_disabled}
                onClick={onClick}
                disabled
              >
                {btnText}
              </button>
            ) : (
              <button className={styles.profile_button} onClick={onClick}>
                {btnText}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {/* complete profile section */}
      <div className={styles.nux_card}>
        <Item
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
        <Item
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
        <Item
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
