import React, { useState, useEffect } from "react";
import styles from "./css/search.module.css";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { SearchIcon } from "@chakra-ui/icons";
import FavouritesIcon from "../../assets/heart-outline.svg";
import Lens3D from "../../assets/lens.png";
import EmptyBox3D from "../../assets/empty_box.png";

import { productImagesRoot } from "../../config";
import {
  SimpleGrid,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Stack,
} from "@chakra-ui/react";
import Placeholder from "../../assets/placeholder.png";
import { searchProductsAPI } from "../../api/custStoreAPI";
import { useHistory } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { CircularProgress } from "@material-ui/core";

const Search = (props) => {
  const storeId = props.match.params.storeId;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchValue == "") {
      setFilteredProducts([]);
    } else {
      doSearch();
    }
  }, [searchValue]);

  const doSearch = async () => {
    setIsLoading(true);
    const response = await searchProductsAPI(storeId, searchValue);
    setFilteredProducts(response.data.data);
    setIsLoading(false);
    console.log(response);
  };

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
        <h1 className={styles.heading}>Search </h1>
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
            placeholder="Type product name"
            borderColor="white"
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus
          />
        </InputGroup>

        <Stack>
          {searchValue.length > 0 ? (
            filteredProducts.length > 0 ? (
              <SimpleGrid columns={2} spacing={2} w="95%">
                {filteredProducts.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </SimpleGrid>
            ) : isLoading ? (
              <Stack mt="50px" justifyContent="center">
                <CircularProgress isIndeterminate color="green.300" />
              </Stack>
            ) : (
              <Stack
                width="100%"
                direction="column"
                width="100%"
                alignItems="center"
              >
                <Image src={EmptyBox3D} mt="30px" w="50%" />
                <Text
                  w="70%"
                  mt="20px"
                  fontFamily="elemen"
                  fontSize="28px"
                  textAlign="center"
                >
                  Sorry no products found.
                </Text>
              </Stack>
            )
          ) : (
            <Stack
              width="100%"
              direction="column"
              width="100%"
              alignItems="center"
            >
              <Image src={Lens3D} mt="30px" w="30%" />
              <Text
                w="70%"
                mt="20px"
                fontFamily="elemen"
                fontSize="28px"
                textAlign="center"
              >
                Search for products in this store.
              </Text>
            </Stack>
          )}
        </Stack>
      </div>
    </>
  );
};

export default Search;
