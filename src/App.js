import React from "react";
import Signup from "./pages/signup";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignIn from "./pages/signin";
import AddNewProduct from "./pages/addNewProduct";
import StoreInfo from "./pages/storeInfo";
import Products from "./pages/products";
import ProductDetailed from "./pages/productDetailed";
import Dashboard from "./pages/dashboard";
import BottomNavigationMenu from "./components/bottomNavigation";
import AddNewCategory from "./pages/addNewCategory";
import Categories from "./pages/categories";
import Account from "./pages/account";
import AddImage from "./pages/addImage";
import ProductsCategory from "./pages/productsCategory";
import EditAccount from "./pages/editAccount";
import Store from "./pages/front/store";
import ProductDetail from "./pages/front/productDetail";
import Home from "./pages/front/home";

function App() {
  const AuthenticatedRoutes = () => {
    return (
      <>
        <BottomNavigationMenu />
        <Route path="/add_product/:catogory?" component={AddNewProduct} />
        <Route path="/add_image/:id" component={AddImage} />
        <Route path="/store_info" component={StoreInfo} />
        <Route path="/products" component={Products} />
        <Route path="/product_detailed/:id" component={ProductDetailed} />
        <Route
          path="/products_category/:cat_name/:id"
          component={ProductsCategory}
        />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/add_category" component={AddNewCategory} />
        <Route path="/categories" component={Categories} />
        <Route path="/account" component={Account} />
        <Route path="/edit_account" component={EditAccount} />
      </>
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/store" component={Store} />
        <Route path="/product_detail" component={ProductDetail} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={SignIn} />
        <Route component={AuthenticatedRoutes} />
      </Switch>
    </Router>
  );
}

export default App;
