import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import Signup from "./pages/signup";
// import SignIn from "./pages/signin";
// import AddNewProduct from "./pages/addNewProduct";
// import StoreInfo from "./pages/storeInfo";
// import Products from "./pages/products";
// import ProductDetailed from "./pages/productEdit";
// import Dashboard from "./pages/dashboard";
// import BottomNavigationMenu from "./components/bottomNavigation";
// import AddNewCategory from "./pages/addNewCategory";
// import Categories from "./pages/categories";
// import Account from "./pages/account";
// import ProductsByCategory from "./pages/productsByCategory";
// import EditAccount from "./pages/editAccount";
// import Store from "./pages/front/store";
// import StoreFavourates from "./pages/front/storeFavourates";
// import ProductDetail from "./pages/front/productDetail";
// import Home from "./pages/front/home";

const Signup = lazy(() => import("./pages/signup"));
const SignIn = lazy(() => import("./pages/signin"));
const AddNewProduct = lazy(() => import("./pages/addNewProduct"));
const StoreInfo = lazy(() => import("./pages/storeInfo"));
const Products = lazy(() => import("./pages/products"));
const ProductDetailed = lazy(() => import("./pages/productEdit"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const BottomNavigationMenu = lazy(() =>
  import("./components/bottomNavigation")
);
const AddNewCategory = lazy(() => import("./pages/addNewCategory"));
const EditCategory = lazy(() => import("./pages/editCategory"));
const Categories = lazy(() => import("./pages/categories"));
const Account = lazy(() => import("./pages/account"));
const ProductsByCategory = lazy(() => import("./pages/productsByCategory"));
const EditAccount = lazy(() => import("./pages/editAccount"));
const Store = lazy(() => import("./pages/front/store"));
const StoreFavourates = lazy(() => import("./pages/front/storeFavourates"));
const ProductDetail = lazy(() => import("./pages/front/productDetail"));
const Home = lazy(() => import("./pages/front/home"));

function App() {
  const AuthenticatedRoutes = () => {
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

  return (
    <Router>
      <Suspense fallback={<p>Loading</p>}>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/store/:storelink" component={Store} />
          <Route
            exact
            path="/store-favourates/:store_id"
            component={StoreFavourates}
          />
          <Route path="/product_detail/:productId" component={ProductDetail} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/login" component={SignIn} />

          <Route component={AuthenticatedRoutes} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
