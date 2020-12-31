import React, { useEffect, useState } from "react";
import styles from "./css/store.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory, Link, withRouter } from "react-router-dom";
import {
  getStoreInfoAPI,
  getStoreProducts,
  getStoreCategoriesAPI,
} from "../../api/custStoreAPI";
import { productImagesRoot } from "../../config";

const Store = (props) => {
  let history = useHistory();
  const storeLink = props.match.params.storelink;

  const [storeData, setStoreData] = useState({});
  const [storeProducts, setStoreProducts] = useState([]);
  const [storeCategories, setStoreCategories] = useState([]);
  const [catSelected, setCatSelected] = useState("all");
  useEffect(() => {
    const getData = async () => {
      const storeResponse = await getStoreInfoAPI(storeLink);
      setStoreData(storeResponse.data.data[0]);
      const categoriesResponse = await getStoreCategoriesAPI(
        storeResponse.data.data[0].id
      );
      setStoreCategories(categoriesResponse.data.data);
      const productsResponse = await getStoreProducts(
        storeResponse.data.data[0].id,
        "all"
      );
      setStoreProducts(productsResponse.data.data);
    };
    getData();
  }, []);
  useEffect(() => {
    const getSelectedProducts = async () => {
      const productsResponse = await getStoreProducts(
        storeData.id,
        catSelected
      );
      setStoreProducts(productsResponse.data.data);
    };
    getSelectedProducts();
  }, [catSelected]);

  return (
    <div className={styles.container}>
      {storeData && (
        <div className={styles.store_card}>
          <h1 className={styles.store_name}>{storeData.account_store}</h1>
          <h1 className={styles.store_location}>
            {storeData.account_store_address}
          </h1>
        </div>
      )}
      <div className={styles.search_block}>
        <input
          type="text"
          className={styles.search}
          placeholder="search in this store"
        />
        <SearchIcon fontSize="small" className={styles.search_icon} />
      </div>
      <div className={styles.categories}>
        <div className={styles.margin_left}></div>
        <div
          className={
            catSelected == "all"
              ? styles.category_item_selected
              : styles.category_item
          }
          onClick={() => setCatSelected("all")}
        >
          All
        </div>
        {storeCategories &&
          storeCategories.map((cat) => (
            <div
              key={cat.id}
              className={
                catSelected == cat.id
                  ? styles.category_item_selected
                  : styles.category_item
              }
              onClick={() => setCatSelected(cat.id)}
            >
              {cat.cat_name}
            </div>
          ))}
      </div>
      <div className={styles.products}>
        {/* product item starts here */}
        {storeProducts &&
          storeProducts.map((product) => {
            return (
              // <Link to={`/product_detail/${product.id}`} key={product.id}>
              <div
                className={styles.product_item}
                onClick={() => history.push(`/product_detail/${product.id}`)}
                key={product.id}
              >
                {product.images && (
                  <img
                    src={`${productImagesRoot}/${product.images.split(",")[0]}`}
                    alt="img"
                    className={styles.product_image}
                  />
                )}
                <div className={styles.product_details}>
                  <h1 className={styles.product_name}>
                    {product.product_name}
                  </h1>
                  <h1 className={styles.product_price}>
                    ₹{product.product_price}
                  </h1>
                </div>
              </div>
              // </Link>
            );
          })}
        {/* product item ends here */}
      </div>
    </div>
  );
};

export default withRouter(Store);
