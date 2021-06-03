import React, { useState, useEffect } from "react";
import styles from "./css/nux.module.css";
import Tick from "../assets/checkmark.svg";
import { useHistory } from "react-router-dom";

const Nux = ({ userInfo, countData }) => {
  const history = useHistory();
  /* const Item = () => {
    return (
      <div className={styles.card_body}>
        <div className={styles.left_section}>
          <div className={styles.circle}>
            <h1>1</h1>
          </div>
          <div className={styles.line}></div>
        </div>

        <div className={styles.right_section}>
          <div className={styles.child_section}>
            <h1 className={styles.profile_heading}>
              {userInfo.account_store_image === null
                ? "Add store image"
                : "Congratulations"}
            </h1>
            <h1 className={styles.profile_sub_heading}>
              Your store image will be visible to your viewers
            </h1>
            <button className={styles.profile_button}>Add store image</button>
          </div>
        </div>
      </div>
    );
  }; */
  return (
    <>
      {/* complete profile section */}
      <div className={styles.nux_card}>
        <div className={styles.left_section}>
          <div
            className={
              userInfo.account_store_image === null
                ? styles.circle_outline
                : styles.circle
            }
          >
            {userInfo.account_store_image === null ? (
              <h1>1</h1>
            ) : (
              <img src={Tick} className={styles.tick} width="auto" alt="s" />
            )}
          </div>
          <div className={styles.line}></div>

          <div
            className={
              countData.cat_count === 0 ? styles.circle_outline : styles.circle
            }
          >
            {countData.cat_count === 0 ? (
              <h1>2</h1>
            ) : (
              <img src={Tick} className={styles.tick} width="auto" alt="s" />
            )}
          </div>
          <div className={styles.line}></div>

          <div
            className={
              countData.products_count === 0
                ? styles.circle_outline
                : styles.circle
            }
          >
            {countData.products_count < 2 ? (
              <h1>3</h1>
            ) : (
              <img src={Tick} className={styles.tick} width="auto" alt="s" />
            )}
          </div>
        </div>

        <div className={styles.right_section}>
          <div className={styles.child_section}>
            <h1 className={styles.profile_heading}>
              {userInfo.account_store_image === null
                ? "Add store image"
                : "Great!"}
            </h1>
            <h1 className={styles.profile_sub_heading}>
              Your store image will be visible to your viewers
            </h1>
            {userInfo.account_store_image === null ? (
              <button
                className={styles.profile_button}
                onClick={() => history.push("/app/edit_account")}
              >
                Add store image
              </button>
            ) : (
              <button
                className={styles.profile_button_disabled}
                onClick={() => history.push("/app/edit_account")}
                disabled
              >
                Add store image
              </button>
            )}
          </div>

          <div
            className={`${styles.child_section} ${styles.margin_top_profile}`}
          >
            <h1 className={styles.profile_heading}>
              {countData.cat_count === 0
                ? "Add category"
                : "Great, You added categories"}
            </h1>
            <h1 className={styles.profile_sub_heading}>
              Your customers can view products in various categories
            </h1>
            {countData.cat_count === 0 ? (
              <button
                className={styles.profile_button}
                onClick={() => history.push("/app/categories")}
              >
                Add category
              </button>
            ) : (
              <button
                className={styles.profile_button_disabled}
                onClick={() => history.push("/app/categories")}
                disabled
              >
                Add category
              </button>
            )}
          </div>

          <div
            className={`${styles.child_section} ${styles.margin_top_profile}`}
          >
            <h1 className={styles.profile_heading}>
              {countData.products_count < 2
                ? "Add products"
                : "Great, You added products"}
            </h1>
            <h1 className={styles.profile_sub_heading}>
              You need to add atleast 2 products in your store
            </h1>
            {countData.products_count < 2 ? (
              <button
                className={styles.profile_button}
                onClick={() => history.push("/app/products")}
              >
                Add product
              </button>
            ) : (
              <button
                className={styles.profile_button_disabled}
                onClick={() => history.push("/app/products")}
                disabled
              >
                Add product
              </button>
            )}
          </div>
        </div>
      </div>
      ) ){/* complete profile section ends here */}
    </>
  );
};

export default Nux;
