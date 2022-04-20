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
import {
  addCatogoriesAPI,
  getParentCategoriesApi,
} from "../../../api/sellerCategoryAPI";
import DrawerMain from "../../../components/DrawerMain";
import styles from "../css/addNewCategory.module.css";

const AddNewCategoryDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  fetchCategories,
}) => {
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [selected, setSelected] = useState([]);
  const [newCategory, setNewCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidated, setIsValidated] = useState(true);
  const toast = useToast();

  useEffect(() => {
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
      await addCatogoriesAPI(newCategory, selected);
      setIsLoading(false);
      toast({
        title: "New Category added.",
        description: "Category added successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setIsDrawerOpen(false);
      await fetchCategories();
    }
  };

  return (
    <>
      <DrawerMain
        isDrawer={isDrawerOpen}
        setIsDrawer={setIsDrawerOpen}
        title="Add New Category"
        onDrawerClose={() => {}}
      >
        {!isValidated && (
          <Box
            borderRadius="md"
            bg="tomato"
            color="white"
            p="3"
            w="100%"
            mb="3"
            mt="4"
          >
            {errorMessage}
          </Box>
        )}
        <FormControl isRequired w="100%" mt="4">
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
        <FormControl isRequired w="100%" mt="4">
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
          w="100%"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          ADD CATEGORY
        </Button>

        <div className={styles.blank}></div>
      </DrawerMain>
    </>
  );
};

export default AddNewCategoryDrawer;
