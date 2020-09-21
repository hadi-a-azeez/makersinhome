import React, { useState } from "react";
import styles from "./bottomNavigation.module.css";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/HomeRounded";
import LayersIcon from "@material-ui/icons/LayersRounded";
import DashboardIcon from "@material-ui/icons/DashboardRounded";
import PersonIcon from "@material-ui/icons/PersonRounded";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 0,
  },
  element: {
    width: "100%",
    padding: 3,
    margin: "100%",
    color: "#616161",
    "&$selected": {
      color: "red",
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
            onChange={(event, newValue) => {
              setValue(event);
            }}
          >
            <BottomNavigationAction
              className={classes.element}
              label="Home"
              icon={<HomeIcon />}
              component={Link}
              to="/dashboard"
            />
            <BottomNavigationAction
              className={classes.element}
              label="Products"
              icon={<LayersIcon />}
              component={Link}
              to="/products"
            />
            <BottomNavigationAction
              className={classes.element}
              label="Categories"
              icon={<DashboardIcon />}
              component={Link}
              to="/categories"
            />
            <BottomNavigationAction
              label="Account"
              icon={<PersonIcon />}
              className={classes.element}
              component={Link}
              to="/signin"
            />
          </BottomNavigation>
        </nav>
      </div>
    </>
  );
};

export default BottomNavigationMenu;
