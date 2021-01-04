import React, { useState, useEffect } from "react";
import styles from "./css/addNewCategory.module.css";
import { fetchParentCategoriesApi } from "../api";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LabelHeader from "../components/labelHeader";
import { addCatogoriesAPI } from "../api/sellerCategoryAPI";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Select,
  Box,
} from "@chakra-ui/react";

const AddNewCategory = () => {
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [selected, setSelected] = useState([]);
  const [newCategory, setNewCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidated, setIsValidated] = useState(true);
  let history = useHistory();
  const toast = useToast();

  useEffect(() => {
    const getCategoriesData = async () => {
      const Data = await fetchParentCategoriesApi();
      setCategoriesArray(Data.data.data);
    };
    getCategoriesData();
  }, []);

  const handleCategoryClick = (id) => {
    setSelected(id);
    console.log(id);
  };

  const validation = () => {
    if (newCategory === "") {
      setErrorMessage("Enter a category name");
      setIsValidated(false);
      return false;
    }
    if (selected.length === 0) {
      setErrorMessage("Select a parent category");
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
      const response = await addCatogoriesAPI(newCategory, selected);
      setIsLoading(false);
      console.log(response);
      toast({
        title: "Product added.",
        description: "Product added successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      //delay for toast
      setTimeout(() => history.push("/categories"), 2000);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <LabelHeader label={"Add new category"} isBackButton={true} />
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
            name="parent category"
            id="parentcategory"
            variant="filled"
            size="lg"
            defaultValue={"DEFAULT"}
            onChange={(e) => handleCategoryClick(e.target.value)}
          >
            <option value="DEFAULT" disabled>
              parent category
            </option>
            {categoriesArray.map((item, index) => (
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
            placeholder="Category name"
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="green"
          mt="4"
          size="lg"
          w="90%"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          ADD CATEGORY
        </Button>

        <div className={styles.blank}></div>
      </div>
    </>
  );
};

export default AddNewCategory;
