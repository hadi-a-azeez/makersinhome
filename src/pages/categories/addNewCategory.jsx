import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useHeader } from "@/utils/hooks/useHeader";
import {
  addCatogoriesAPI,
  getParentCategoriesApi,
} from "../../api/sellerCategoryAPI";
import { Container } from "../../components/Container";
import styles from "../css/addNewCategory.module.css";

const AddNewCategory = () => {
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [selected, setSelected] = useState([]);
  const [newCategory, setNewCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidated, setIsValidated] = useState(true);

  const { setHeader } = useHeader();

  let history = useHistory();
  const toast = useToast();

  useEffect(() => {
    setHeader({ title: "Add Category", isBackButton: true });
    const getCategoriesData = async () => {
      const Data = await getParentCategoriesApi();
      console.log(Data);
      setCategoriesArray(Data.data.data);
    };
    getCategoriesData();
  }, []);

  const handleCategoryClick = (id) => {
    setSelected(id);
  };

  const validation = () => {
    if (selected.length === 0) {
      setErrorMessage("Select a parent category");
      setIsValidated(false);
      return false;
    }
    if (newCategory.length === 0) {
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
      const response = await addCatogoriesAPI(newCategory, selected);
      setIsLoading(false);
      toast({
        title: "New Category added.",
        description: "Category added successfully.",
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
    <Container>
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
        backgroundColor="#08bd80"
        colorScheme="green"
        color="white"
        mt="4"
        size="lg"
        w="90%"
        isLoading={isLoading}
        onClick={handleSubmit}
      >
        ADD CATEGORY
      </Button>

      <div className={styles.blank}></div>
    </Container>
  );
};

export default AddNewCategory;
