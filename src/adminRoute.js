import AddNewProduct from "./pages/addNewProduct";
import StoreInfo from "./client/account/storeInfo";
import Products from "./client/products";
import ProductDetailed from "./pages/productEdit";
import Dashboard from "./pages/dashboard";
import BottomNavigationMenu from "./components/bottomNavigation";
import AddNewCategory from "./client/categories/addNewCategory";
import Categories from "./client/categories/categories";
import Account from "./pages/account";
import ProductsByCategory from "./pages/productsByCategory";
import EditAccount from "./client/account/editAccount";
import EditCategory from "./client/categories/editCategory";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <>
      <BottomNavigationMenu />
      <Route path="/add_product/:catogory?" component={AddNewProduct} />
      <Route path="/store_info" component={StoreInfo} />
      <Route path="/products" component={Products} />
      <Route path="/product_detailed/:id" component={ProductDetailed} />
      <Route
        path="/products_category/:cat_name/:id"
        component={ProductsByCategory}
      />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/add_category" component={AddNewCategory} />
      <Route path="/edit_category/:category_id" component={EditCategory} />
      <Route path="/categories" component={Categories} />
      <Route path="/account" component={Account} />
      <Route path="/edit_account" component={EditAccount} />
    </>
  );
};
export default AdminRoutes;
