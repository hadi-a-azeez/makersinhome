import React from "react";
import styles from "./css/search.module.css";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { SearchIcon } from "@chakra-ui/icons";
import FavouritesIcon from "../../assets/heart-outline.svg";
import {
  SimpleGrid,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Search = () => {
  const history = useHistory();
  return (
    <>
      <div className={styles.container}>
        <IconButton
          backgroundColor="#f8f9fd"
          borderRadius="30px"
          aria-label="Search database"
          icon={<ArrowBackIcon color="black" w={8} h={8} />}
          pos="fixed"
          top="3"
          left="3"
          onClick={() => history.goBack()}
        />
        <h1 className={styles.heading}>Search in this store</h1>
        <InputGroup
          w="90%"
          mb="3"
          mt="2"
          size="lg"
          backgroundColor="white"
          borderRadius="30px"
        >
          <InputRightElement
            children={
              <IconButton
                backgroundColor="white"
                borderRadius="30px"
                icon={<SearchIcon />}
              />
            }
          />
          <Input
            type="text"
            placeholder="search in this store"
            borderRadius="30px"
            borderColor="white"
          />
        </InputGroup>

        <SimpleGrid columns={2} spacing={2} w="95%">
          <div className={styles.product_item}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/da/Cup_and_Saucer_LACMA_47.35.6a-b_%281_of_3%29.jpg"
              alt="img"
              className={styles.product_image}
            />

            <div className={styles.product_details}>
              <h1 className={styles.product_name}>Cup Tea</h1>
              <h1 className={styles.product_price}>₹299</h1>
            </div>
            <IconButton
              backgroundColor="#f8f9fd"
              borderRadius="30px"
              aria-label="Search database"
              icon={
                <Image
                  src={FavouritesIcon}
                  width={5}
                  height={5}
                  className={styles.favouritesFilled}
                />
              }
              pos="absolute"
              bottom="3"
              right="3"
              onClick={() => history.goBack()}
            />
          </div>
        </SimpleGrid>
      </div>
    </>
  );
};

export default Search;
