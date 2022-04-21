import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import tw, { styled } from "twin.macro";
import { useHeader } from "@/utils/useHeader";
import {
  deleteCategoryAPI,
  getCategoriesAPI,
} from "../../api/sellerCategoryAPI";
import { Container } from "../../components/Container";
import styles from "../css/categories.module.css";
import AddNewCategoryDrawer from "./addCategoryModel";
import CategoryCard from "./CategoryCard";

const CategoriesContainer = styled.div`
  ${tw`w-full grid gap-4`}
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonContainer = styled.div`
  ${tw`flex flex-row justify-end items-end w-full py-2`}
  @media (max-width: 768px) {
    position: fixed;
    bottom: 100px;
    width: 100%;
    ${tw`justify-center`}
    z-index: 1000;
  }
`;

const Categories = () => {
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [categoryDeleteId, setCategoryDeleteId] = useState(); //for accessing category id in modal
  const cancelRef = useRef();
  const [isAddCategoryDrawerOpen, setIsAddCategoryDrawerOpen] = useState(false);
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader({ title: "Categories" });
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    const response = await getCategoriesAPI();
    setCategoriesArray(response?.data?.data);
    setUserInfo(response?.data?.user);
    setIsLoading(false);
  };

  const handleDeleteClick = async () => {
    const result = await deleteCategoryAPI(categoryDeleteId);
    const modifiedCategoryArray = categoriesArray.filter(
      (category) => category.id !== categoryDeleteId
    );
    setCategoriesArray(modifiedCategoryArray);
    setIsOpen(false);
  };

  return (
    <>
      <AddNewCategoryDrawer
        isDrawerOpen={isAddCategoryDrawerOpen}
        setIsDrawerOpen={setIsAddCategoryDrawerOpen}
        fetchCategories={fetchCategories}
      />
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
      <Container>
        <ButtonContainer>
          <Button
            onClick={() => setIsAddCategoryDrawerOpen(true)}
            bgColor="#08bd80"
            textColor="#fff"
            paddingY={3}
          >
            ADD CATEGORY
          </Button>
        </ButtonContainer>

        <CategoriesContainer>
          {!isLoading ? (
            categoriesArray.length > 0 &&
            categoriesArray.map((item, index) => (
              <CategoryCard
                item={item}
                setIsOpen={setIsOpen}
                setCategoryDeleteId={setCategoryDeleteId}
                userInfo={userInfo}
              />
            ))
          ) : (
            <>
              <Skeleton height="75px" w="100%" mt="3" />
              <Skeleton height="75px" w="100%" mt="3" />
              <Skeleton height="75px" w="100%" mt="3" />
            </>
          )}
        </CategoriesContainer>
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
      </Container>
    </>
  );
};

export default Categories;
