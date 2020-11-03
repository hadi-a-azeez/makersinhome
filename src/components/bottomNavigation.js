import React, { useEffect, useState } from "react";
import styles from "./bottomNavigation.module.css";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Link } from "react-router-dom";
import HomeIcon from "../assets/home-outline.svg";
import HomeIconFilled from "../assets/homeFilled.svg";
import ProductsIcon from "../assets/layers-outline.svg";
import ProductsIconFilled from "../assets/layersFilled.svg";
import CategoriesIcon from "../assets/grid-outline.svg";
import CategoriesIconFilled from "../assets/gridFilled.svg";
import AccountIcon from "../assets/person-outline.svg";
import AccountIconFilled from "../assets/personFilled.svg";

const BottomNavigationMenu = () => {
  const [value, setValue] = useState("home");
  const [isHomeSelected, setIsHomeSelected] = useState(true);
  const [isProductsSelected, setIsProductsSelected] = useState(false);
  const [isCategoriesSelected, setIsCategorieSelected] = useState(false);
  const [isAccountSelected, setIsAccountSelected] = useState(false);

  useEffect(() => {
    switch (value) {
      case "home":
        setIsHomeSelected(true);
        setIsProductsSelected(false);
        setIsCategorieSelected(false);
        setIsAccountSelected(false);
        break;
      case "products":
        setIsHomeSelected(false);
        setIsProductsSelected(true);
        setIsCategorieSelected(false);
        setIsAccountSelected(false);
        break;
      case "categories":
        setIsHomeSelected(false);
        setIsProductsSelected(false);
        setIsCategorieSelected(true);
        setIsAccountSelected(false);
        break;
      case "account":
        setIsHomeSelected(false);
        setIsProductsSelected(false);
        setIsCategorieSelected(false);
        setIsAccountSelected(true);
        break;
    
      default:
        break;
    }
  }, [value]);
  

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
              className={isHomeSelected ? styles.navItemSelected 
                : styles.navItem}
              label="Home"
              icon={isHomeSelected ? <img src={HomeIconFilled} alt="home" className={styles.iconFilled} /> 
              : <img src={HomeIcon} alt="home" className={styles.iconOutlined} />}
              component={Link}
              to="/dashboard"
              value="home"
            />
            <BottomNavigationAction
              className={isProductsSelected ? styles.navItemSelected 
                : styles.navItem}
              label="Products"
              icon={isProductsSelected ? <img src={ProductsIconFilled} alt="home" className={styles.iconFilled} /> 
              : <img src={ProductsIcon} alt="home" className={styles.iconOutlined} />}
              component={Link}
              to="/products"
              value="products"
            />
            <BottomNavigationAction
              className={isCategoriesSelected ? styles.navItemSelected 
                : styles.navItem}
              label="Categories"
              icon={isCategoriesSelected ? <img src={CategoriesIconFilled} alt="home" className={styles.iconFilled} /> 
              : <img src={CategoriesIcon} alt="home" className={styles.iconOutlined} />}
              component={Link}
              to="/categories"
              value="categories"
            />
            <BottomNavigationAction
              label="Account"
              icon={isAccountSelected ? <img src={AccountIconFilled} alt="home" className={styles.iconFilled} /> 
              : <img src={AccountIcon} alt="home" className={styles.iconOutlined} />}
              className={isAccountSelected ? styles.navItemSelected 
                : styles.navItem}
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
