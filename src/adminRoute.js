import AddNewProduct from "./pages/addNewProduct";
import StoreInfo from "./pages/storeInfo";
import Products from "./pages/products";
import ProductDetailed from "./pages/productEdit";
import Dashboard from "./pages/dashboard";
import BottomNavigationMenu from "./components/bottomNavigation";
import AddNewCategory from "./pages/addNewCategory";
import Categories from "./pages/categories";
import Account from "./pages/account";
import ProductsByCategory from "./pages/productsByCategory";
import EditAccount from "./pages/editAccount";
import EditCategory from "./pages/editCategory";
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
