import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../css/categories.module.css";
import {
  getCategoriesAPI,
  deleteCategoryAPI,
} from "../../../api/sellerCategoryAPI";
import "../../../../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LabelHeader from "../../../components/labelHeader";
import Ellipse from "../../../assets/ellipse_outline.svg";
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
import BottomNavigationMenu from "../../../components/bottomNavigation";

const Categories = () => {
  const [isLogin, setIsLogin] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [categoryDeleteId, setCategoryDeleteId] = useState(); //for accessing category id in modal
  const cancelRef = useRef();

  useEffect(() => {
    const getCategoriesData = async () => {
      setIsLoading(true);
      const response = await getCategoriesAPI();
      setIsLogin(response.data.login);
      setCategoriesArray(response.data.data);
      setUserInfo(response.data.user);
      setIsLoading(false);
      console.log(response);
    };
    getCategoriesData();
  }, []);

  const handleDeleteClick = async () => {
    console.log(categoryDeleteId);
    const result = await deleteCategoryAPI(categoryDeleteId);
    const modifiedCategoryArray = categoriesArray.filter(
      (category) => category.id !== categoryDeleteId
    );
    setCategoriesArray(modifiedCategoryArray);
    console.log(result);
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <LabelHeader label={"Categories"} />
        <div className={styles.tab_parent}>
          <div
            onClick={() => history.push("/app/products")}
            className={styles.tab_child}
          >
            Products
          </div>
          <div
            className={styles.tab_child}
            onClick={() => history.push("/app/categories")}
            style={{
              backgroundColor: "#ffffff",
              borderBottom: "3px solid #08bd80",
            }}
          >
            Categories
          </div>
        </div>
        {isLoading && (
          <>
            <Skeleton height="75px" w="90%" mt="3" />
            <Skeleton height="75px" w="90%" mt="3" />
            <Skeleton height="75px" w="90%" mt="3" />
          </>
        )}
        {categoriesArray.length > 0 &&
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
                history.push(
                  `/app/products_category/${item.cat_name}/${item.id}`
                )
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
                >
                  <img
                    src={Ellipse}
                    alt="w"
                    style={{
                      width: "22px",
                      height: "22px",
                      alignSelf: "center",
                    }}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`/app/edit_category/${item.id}`);
                    }}
                  >
                    Edit Category
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      if (navigator.share) {
                        navigator.share({
                          title: item.cat_name,
                          url: `https://saav.in/store/${userInfo.account_store_link}/${item.id}`,
                        });
                      }
                    }}
                  >
                    Share Category
                  </MenuItem>
                  <MenuItem
                    color="tomato"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(true);
                      setCategoryDeleteId(item.id);
                    }}
                  >
                    Delete Category
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

        {/* <Link to="/add_category" className={styles.btn}>
          ADD CATEGORIES
        </Link> */}
        <Button
          onClick={() => history.push("/app/add_category")}
          position="fixed"
          zIndex="1000"
          mb="70"
          bottom="0"
          size="lg"
          w="90%"
          bgColor="#08bd80"
          textColor="#fff"
          height="60px"
        >
          ADD CATEGORIES
        </Button>

        <div className={styles.blank}></div>
        <BottomNavigationMenu />
      </div>
    </>
  );
};

export default Categories;
