import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LinkInBioIcon from "../assets/albums-outline.svg";
import LinkInBioIconFilled from "../assets/albums.svg";
import HomeIcon from "../assets/home-outline.svg";
import HomeIconFilled from "../assets/homeFilled.svg";
import ProductsIcon from "../assets/layers-outline.svg";
import ProductsIconFilled from "../assets/layersFilled.svg";
import SettingsIcon from "../assets/settings-outline.svg"; //ionicons
import SettingsIconFilled from "../assets/settings.svg";
import styles from "./bottomNavigation.module.css";

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
                value == "links" ? styles.navItemSelected : styles.navItem
              }
              label="Links"
              icon={
                value == "links" ? (
                  <img
                    src={LinkInBioIconFilled}
                    alt="home"
                    className={styles.iconFilled}
                  />
                ) : (
                  <div style={{ position: "relative" }}>
                    <img
                      src={LinkInBioIcon}
                      alt="home"
                      className={styles.iconOutlined}
                    />
                    <span className={styles.button__badge}>&nbsp;</span>
                  </div>
                )
              }
              component={Link}
              to="/app/links/"
              value="links"
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
              to="/app/products/"
              value="products"
            />

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
