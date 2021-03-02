import React, { useState, useEffect } from "react";
import styles from "./css/search.module.css";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { SearchIcon } from "@chakra-ui/icons";
import FavouritesIcon from "../../assets/heart-outline.svg";
import { productImagesRoot } from "../../config";
import {
  SimpleGrid,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { searchProductsAPI } from "../../api/custStoreAPI";
import { useHistory } from "react-router-dom";

const Search = (props) => {
  const storeId = props.match.params.storeId;
  const history = useHistory();
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
    const response = await searchProductsAPI(storeId, searchValue);
    setFilteredProducts(response.data.data);
    console.log(response);
  };

  const ProductCard = ({ product }) => {
    return (
      <div
        className={styles.product_item}
        onClick={() => history.push(`/product_detail/${product.id}`)}
      >
        <img
          src={`${productImagesRoot}/min/${product.products_images[0].product_image}`}
          alt="img"
          className={styles.product_image}
        />

        <div className={styles.product_details}>
          <h1 className={styles.product_name}>{product.product_name}</h1>
          <h1 className={styles.product_price}>{product.product_price}</h1>
        </div>
      </div>
    );
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
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus
          />
        </InputGroup>

        <SimpleGrid columns={2} spacing={2} w="95%">
          {searchValue.length > 0 ? (
            <>
              {filteredProducts.length > 0 &&
                filteredProducts.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
            </>
          ) : (
            <h1>Search Here</h1>
          )}
        </SimpleGrid>
      </div>
    </>
  );
};

export default Search;
