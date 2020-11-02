import React, { useState } from "react";
import styles from "./bottomNavigation.module.css";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
/* import HomeIcon from "@material-ui/icons/HomeOutlined"; */
/* import LayersIcon from "@material-ui/icons/LayersOutlined";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import PersonIcon from "@material-ui/icons/PersonOutlined"; */
import { Link } from "react-router-dom";
import HomeIcon from "../assets/home-outline.svg";
import ProductsIcon from "../assets/layers-outline.svg";
import CategoriesIcon from "../assets/grid-outline.svg";
import AccountIcon from "../assets/person-outline.svg";

const useStyles = makeStyles({
  root: {
    width: 0,
  },
  element: {
    width: "100%",
    padding: 0,
    margin: "100%",
    color: "#767676",
    "&$selected": {
      
    },
  },
});
const BottomNavigationMenu = () => {
  const classes = useStyles();
  const [value, setValue] = useState("");

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.bottom_nav}>
          <BottomNavigation
            showLabels
            className={classes.root}
            value={value}
            onChange={(event, value) => {
              setValue(value);
              console.log(value)
            }}
          >
            <BottomNavigationAction
              className={classes.element}
              label="Home"
              icon={<img src={HomeIcon} alt="home" className={styles.iconstyle} />}
              component={Link}
              to="/dashboard"
            />
            <BottomNavigationAction
              className={classes.element}
              label="Products"
              icon={<img src={ProductsIcon} alt="home" className={styles.iconstyle} />}
              component={Link}
              to="/products"
            />
            <BottomNavigationAction
              className={classes.element}
              label="Categories"
              icon={<img src={CategoriesIcon} alt="home" className={styles.iconstyle} />}
              component={Link}
              to="/categories"
            />
            <BottomNavigationAction
              label="Account"
              icon={<img src={AccountIcon} alt="home" className={styles.iconstyle} />}
              className={classes.element}
              component={Link}
              to="/account"
            />
          </BottomNavigation>
        </nav>
      </div>
    </>
  );
};

export default BottomNavigationMenu;
