import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./css/categories.module.css";
import { getCategoriesAPI } from "../api/sellerCategoryAPI";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LabelHeader from "../components/labelHeader";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Categories = () => {
  const [isLogin, setIsLogin] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getCategoriesData = async () => {
      setIsLoading(true);
      const Data = await getCategoriesAPI();
      setIsLogin(Data.data.login);
      setCategoriesArray(Data.data.data);
      setIsLoading(false);
      console.log(Data);
    };
    getCategoriesData();
  }, []);
  return (
    <>
      <div className={styles.container}>
        <LabelHeader label={"Categories"} />
        {isLoading ? (
          <div className={styles.loaderwraper}>
            <Loader
              type="Oval"
              color="#00b140"
              height={50}
              width={50}
              visible={isLoading}
            />
          </div>
        ) : (
          <div></div>
        )}
        {isLogin &&
          categoriesArray.map((item, index) => (
            <Box
              w="90%"
              h="auto"
              mt="10px"
              position="relative"
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              onClick={() =>
                history.push(`/products/${item.cat_name}/${item.id}`)
              }
            >
              <h1 className={styles.heading_bold}>{item.cat_name}</h1>
              <h1 className={styles.heading_normal}>
                {item.product_count < 1 ? "No" : item.product_count} Products
              </h1>
              <Menu>
                <MenuButton
                  position="absolute"
                  top="3"
                  right="3"
                  bg="white"
                  as={Button}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("button clicked");
                  }}
                  rightIcon={<HamburgerIcon />}
                ></MenuButton>
                <MenuList>
                  <MenuItem>Edit Category</MenuItem>
                  <MenuItem color="tomato">Delte Category</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          ))}

        <Link to="/add_category" className={styles.btn}>
          ADD CATEGORIES
        </Link>

        <div className={styles.blank}></div>
      </div>
    </>
  );
};

export default Categories;
