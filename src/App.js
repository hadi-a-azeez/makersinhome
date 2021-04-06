import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Search from "./pages/client/search";

import Store from "./pages/client/store";
import StoreFavourates from "./pages/client/storeFavourates";
import StoreCart from "./pages/client/storeCart";
import ProductDetail from "./pages/client/productDetail";
import Home from "./pages/client/home";

const Signup = lazy(() => import("./pages/seller/account/signup"));
const SignIn = lazy(() => import("./pages/seller/account/signin"));
const AddNewProduct = lazy(() =>
  import("./pages/seller/products/addNewProduct")
);
const StoreInfo = lazy(() => import("./pages/seller/store/storeInfo"));
const Products = lazy(() => import("./pages/seller/products/products"));
const ProductEdit = lazy(() => import("./pages/seller/products/productEdit"));
const Dashboard = lazy(() => import("./pages/seller/store/dashboard"));
const BottomNavigationMenu = lazy(() =>
  import("./components/bottomNavigation")
);
const AddNewCategory = lazy(() =>
  import("./pages/seller/categories/addNewCategory")
);
const EditCategory = lazy(() =>
  import("./pages/seller/categories/editCategory")
);
const Categories = lazy(() => import("./pages/seller/categories/categories"));
const Account = lazy(() => import("./pages/seller/account/account"));
const ProductsByCategory = lazy(() =>
  import("./pages/seller/products/productsByCategory")
);
const EditAccount = lazy(() => import("./pages/seller/account/editAccount"));

function App() {
  const AuthenticatedRoutes = () => {
    return (
      <>
        <BottomNavigationMenu />
        <Route path="/add_product/:catogory?" component={AddNewProduct} />
        <Route path="/store_info" component={StoreInfo} />
        <Route path="/products" component={Products} />
        <Route path="/product_edit/:id" component={ProductEdit} />
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
          <Route exact path="/" component={Home} />
          <Route exact path="/store/:storelink" component={Store} />
          <Route exact path="/store/search/:storeId" component={Search} />
          <Route exact path="/cart/:store_id" component={StoreCart} />
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
