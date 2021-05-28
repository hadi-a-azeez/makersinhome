import React, { useState, useEffect } from "react";
import styles from "../css/addNewCategory.module.css";

import { useHistory } from "react-router-dom";
import LabelHeader from "../../../components/labelHeader";
import {
  updateCatogoriesAPI,
  getParentCategoriesApi,
  getSingleCategoryAPI,
} from "../../../api/sellerCategoryAPI";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Select,
  Box,
} from "@chakra-ui/react";
import { useForm } from "../../../components/useForm";

const AddNewCategory = (props) => {
  const [parentCategoriesData, setparentCategoriesData] = useState([]);
  const [singleCategoryData, setSingleCategoryData, updateSingleCategory] =
    useForm({});

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidated, setIsValidated] = useState(true);
  let history = useHistory();
  const toast = useToast();
  const categoryId = props.match.params.category_id;

  useEffect(() => {
    const getCategoriesData = async () => {
      const responseParentCategory = await getParentCategoriesApi();
      setparentCategoriesData(responseParentCategory.data.data);
      const responseSingleCategory = await getSingleCategoryAPI(categoryId);
      console.log("cat Data", responseSingleCategory);
      setSingleCategoryData(responseSingleCategory.data.data);
    };
    getCategoriesData();
  }, []);

  const validation = () => {
    if (singleCategoryData.cat_parent.length === 0) {
      setErrorMessage("Select a parent category");
      setIsValidated(false);
      return false;
    }
    if (singleCategoryData.cat_name.length === 0) {
      setErrorMessage("Enter a category name");
      setIsValidated(false);
      return false;
    }
    setIsValidated(true);
    return true;
  };

  const handleSubmit = async () => {
    let isValidate = validation();
    if (isValidate) {
      setIsLoading(true);
      const response = await updateCatogoriesAPI(singleCategoryData);
      setIsLoading(false);
      toast({
        title: "Product added.",
        description: "Product added successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      //delay for toast
      setTimeout(() => history.push("/app/categories"), 2000);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <LabelHeader label={"Edit Category"} isBackButton={true} />
        <div style={{ marginTop: "70px" }} />
        {!isValidated && (
          <Box
            borderRadius="md"
            bg="tomato"
            color="white"
            p="3"
            w="90%"
            mb="3"
            mt="4"
          >
            {errorMessage}
          </Box>
        )}
        <FormControl isRequired w="90%" mt="4">
          <FormLabel>Parent category</FormLabel>
          <Select
            name="cat_parent"
            variant="filled"
            size="lg"
            value={singleCategoryData.cat_parent || ""}
            onChange={updateSingleCategory}
          >
            <option value="DEFAULT" disabled>
              parent category
            </option>
            {parentCategoriesData.map((item, index) => (
              <option value={item.id} key={index}>
                {item.cat_name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired w="90%" mt="4">
          <FormLabel>Category Name</FormLabel>
          <Input
            type="text"
            variant="filled"
            size="lg"
            name="cat_name"
            value={singleCategoryData.cat_name || ""}
            placeholder="Category name"
            onChange={updateSingleCategory}
          />
        </FormControl>
        <Button
          backgroundColor="#08bd80"
          colorScheme="green"
          color="white"
          mt="4"
          size="lg"
          w="90%"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          UPDATE CATEGORY
        </Button>

        <div className={styles.blank}></div>
      </div>
    </>
  );
};

export default AddNewCategory;
