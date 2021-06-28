import React, { useEffect, useState } from "react";
import styles from "./bottomNavigation.module.css";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../assets/home-outline.svg";
import HomeIconFilled from "../assets/homeFilled.svg";
import ProductsIcon from "../assets/layers-outline.svg";
import OrdersIcon from "../assets/archive-outline.svg";
import OrdersIconFilled from "../assets/archive.svg";

import ProductsIconFilled from "../assets/layersFilled.svg";
import CategoriesIcon from "../assets/grid-outline.svg";
import CategoriesIconFilled from "../assets/gridFilled.svg";
import SettingsIcon from "../assets/settings-outline.svg";
import SettingsIconFilled from "../assets/settings.svg";

const BottomNavigationMenu = () => {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname.split("/")[2]);

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.bottom_nav}>
          <BottomNavigation
            showLabels
            className={styles.navItem}
            value={value}
            onChange={(event, value) => {
              setValue(value);
            }}
          >
            <BottomNavigationAction
              className={
                value == "dashboard" ? styles.navItemSelected : styles.navItem
              }
              label="Home"
              icon={
                value == "dashboard" ? (
                  <img
                    src={HomeIconFilled}
                    alt="home"
                    className={styles.iconFilled}
                  />
                ) : (
                  <img
                    src={HomeIcon}
                    alt="home"
                    className={styles.iconOutlined}
                  />
                )
              }
              component={Link}
              to="/app/dashboard"
              value="dashboard"
            />
            <BottomNavigationAction
              className={
                value == "orders" ? styles.navItemSelected : styles.navItem
              }
              label="Orders"
              icon={
                value === "orders" ? (
                  <img
                    src={OrdersIconFilled}
                    alt="home"
                    className={styles.iconFilled}
                  />
                ) : (
                  <img
                    src={OrdersIcon}
                    alt="home"
                    className={styles.iconOutlined}
                  />
                )
              }
              component={Link}
              to="/app/orders/"
              value="orders"
            />
            <BottomNavigationAction
              className={
                value == "products" ? styles.navItemSelected : styles.navItem
              }
              label="Products"
              icon={
                ["products", "categories"].includes(value) ? (
                  <img
                    src={ProductsIconFilled}
                    alt="home"
                    className={styles.iconFilled}
                  />
                ) : (
                  <img
                    src={ProductsIcon}
                    alt="home"
                    className={styles.iconOutlined}
                  />
                )
              }
              component={Link}
              to="/app/products/"
              value="products"
            />
            {/* <BottomNavigationAction
              className={
                value == "categories" ? styles.navItemSelected : styles.navItem
              }
              label="Categories"
              icon={
                value == "categories" ? (
                  <img
                    src={CategoriesIconFilled}
                    alt="home"
                    className={styles.iconFilled}
                  />
                ) : (
                  <img
                    src={CategoriesIcon}
                    alt="home"
                    className={styles.iconOutlined}
                  />
                )
              }
              component={Link}
              to="/app/categories"
              value="categories"
            /> */}
            <BottomNavigationAction
              label="Settings"
              icon={
                value == "settings" ? (
                  <img
                    src={SettingsIconFilled}
                    alt="home"
                    className={styles.iconFilled}
                  />
                ) : (
                  <img
                    src={SettingsIcon}
                    alt="home"
                    className={styles.iconOutlined}
                  />
                )
              }
              className={
                value == "settings" ? styles.navItemSelected : styles.navItem
              }
              component={Link}
              to="/app/settings"
              value="settings"
            />
          </BottomNavigation>
        </nav>
      </div>
    </>
  );
};

export default BottomNavigationMenu;
