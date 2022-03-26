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
import "../../../../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  deleteCategoryAPI,
  getCategoriesAPI,
} from "../../../api/sellerCategoryAPI";
import CategoryCard from "../../../components/CategoryCard";
import LabelHeader from "../../../components/labelHeader";
import SellerPageLayout from "../../../layouts/Seller";
import styles from "../css/categories.module.css";

const Container = styled.div`
  ${tw`flex flex-col items-center bg-gray-100 w-full p-4`}
  min-height: 100vh;
`;

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

  useEffect(() => {
    const getCategoriesData = async () => {
      setIsLoading(true);
      const response = await getCategoriesAPI();
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
    <SellerPageLayout>
      <Container>
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

        <ButtonContainer>
          <Button
            onClick={() => history.push("/app/add_category")}
            bgColor="#08bd80"
            textColor="#fff"
            paddingY={3}
          >
            ADD PRODUCT
          </Button>
        </ButtonContainer>
        {isLoading && (
          <>
            <Skeleton height="75px" w="90%" mt="3" />
            <Skeleton height="75px" w="90%" mt="3" />
            <Skeleton height="75px" w="90%" mt="3" />
          </>
        )}
        <CategoriesContainer>
          {categoriesArray.length > 0 &&
            categoriesArray.map((item, index) => (
              <CategoryCard
                category={item.cat_name}
                count={item.product_count}
              />
            ))}
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
    </SellerPageLayout>
  );
};

export default Categories;
