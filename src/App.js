import React from "react";
import Signup from "./pages/signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import AddNewProduct from "./pages/addNewProduct";
import StoreInfo from "./pages/storeInfo";
import Products from "./pages/products";
import ProductDetailed from "./pages/productDetailed";
import Dashboard from "./pages/dashboard";
import BottomNavigationMenu from "./components/bottomNavigation";
import AddNewCategory from "./pages/addNewCategory";
import Categories from "./pages/categories";

function App() {
  const AuthenticatedRoutes = () => {
    return (
      <Router>
        <BottomNavigationMenu />
        <Switch>
          <Route path="/add_product" component={AddNewProduct} />
          <Route path="/store_info" component={StoreInfo} />
          <Route path="/products" component={Products} />
          <Route path="/product_detailed" component={ProductDetailed} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/add_category" component={AddNewCategory} />
          <Route path="/categories" component={Categories} />
          <Route path="/signin" component={SignIn} />
        </Switch>
      </Router>
    );
  };
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route component={AuthenticatedRoutes} />
      </Switch>
    </Router>
  );
}

export default App;
