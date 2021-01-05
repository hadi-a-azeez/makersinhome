import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./css/categories.module.css";
import { getCategoriesAPI, deleteCategoryAPI } from "../api/sellerCategoryAPI";
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
  Button,
  Skeleton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Categories = () => {
  const [isLogin, setIsLogin] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [categoryDeleteId, setCategoryDeleteId] = useState(); //for accessing category id in modal
  const cancelRef = useRef();

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

  const handleDeleteClick = async () => {
    console.log(categoryDeleteId);
    const result = await deleteCategoryAPI(categoryDeleteId);
    console.log(result);
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <LabelHeader label={"Categories"} />
        {isLoading && (
          <>
            <Skeleton height="75px" w="90%" mt="3" />
            <Skeleton height="75px" w="90%" mt="3" />
            <Skeleton height="75px" w="90%" mt="3" />
          </>
        )}
        {isLogin &&
          categoriesArray.map((item, index) => (
            <Box
              w="90%"
              h="auto"
              mt="10px"
              position="relative"
              backgroundColor="white"
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              onClick={() =>
                history.push(`/products_category/${item.cat_name}/${item.id}`)
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
                  <MenuItem
                    color="tomato"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(true);
                      setCategoryDeleteId(item.id);
                    }}
                  >
                    Delte Category
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          ))}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => setIsOpen(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent w="90%">
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Category
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? All products under this category will be deleted.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDeleteClick} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <Link to="/add_category" className={styles.btn}>
          ADD CATEGORIES
        </Link>

        <div className={styles.blank}></div>
      </div>
    </>
  );
};

export default Categories;
