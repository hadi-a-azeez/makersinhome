import React, { useEffect, useState } from "react";
import styles from "./bottomNavigation.module.css";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../assets/home-outline.svg";
import HomeIconFilled from "../assets/homeFilled.svg";
import ProductsIcon from "../assets/layers-outline.svg";
import ProductsIconFilled from "../assets/layersFilled.svg";
import CategoriesIcon from "../assets/grid-outline.svg";
import CategoriesIconFilled from "../assets/gridFilled.svg";
import AccountIcon from "../assets/person-outline.svg";
import AccountIconFilled from "../assets/personFilled.svg";

const BottomNavigationMenu = () => {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname.substring(1));
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
              to="/dashboard"
              value="dashboard"
            />
            <BottomNavigationAction
              className={
                value == "products" ? styles.navItemSelected : styles.navItem
              }
              label="Products"
              icon={
                value == "products" ? (
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
              to="/products"
              value="products"
            />
            <BottomNavigationAction
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
              to="/categories"
              value="categories"
            />
            <BottomNavigationAction
              label="Account"
              icon={
                value == "account" ? (
                  <img
                    src={AccountIconFilled}
                    alt="home"
                    className={styles.iconFilled}
                  />
                ) : (
                  <img
                    src={AccountIcon}
                    alt="home"
                    className={styles.iconOutlined}
                  />
                )
              }
              className={
                value == "account" ? styles.navItemSelected : styles.navItem
              }
              component={Link}
              to="/account"
              value="account"
            />
          </BottomNavigation>
        </nav>
      </div>
    </>
  );
};

export default BottomNavigationMenu;
