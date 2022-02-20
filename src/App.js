import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Stack, CircularProgress } from "@chakra-ui/react";
import InstagramImport from "./pages/seller/products/instagramImport";
import PasswordReset from "./pages/client/password";
import GenPassWordLink from "./pages/client/genPasswordLink";
import Payment from "./pages/payment";
import ReactGA from "react-ga";

const Signup = lazy(() => import("./pages/seller/account/signup"));
const SignIn = lazy(() => import("./pages/seller/account/signin"));
const AddNewProduct = lazy(() =>
  import("./pages/seller/products/addNewProduct")
);
const StoreInfo = lazy(() => import("./pages/seller/store/storeInfo"));
const Products = lazy(() => import("./pages/seller/products/products"));
const Links = lazy(() => import("./pages/seller/links"));
const ProductEdit = lazy(() => import("./pages/seller/products/productEdit"));
const Dashboard = lazy(() => import("./pages/seller/store/dashboard"));

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

const App = () => {
  useEffect(() => {
    ReactGA.initialize("UA-198507581-2");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router>
      <Suspense
        fallback={
          <Stack w="100%" h="100vh" justifyContent="center" alignItems="center">
            <CircularProgress isIndeterminate color="#00b140" />
          </Stack>
        }
      >
        <Switch>
          <Route
            exact
            path="/1P9T873nMbjkC7gVdMpfKR2epYjtuD2UYA"
            component={GenPassWordLink}
          />
          <Route
            exact
            path="/password/:phone_number/:key"
            component={PasswordReset}
          />
          <Route exact path="/" render={() => <Redirect to="/login" />} />

          <Route exact path="/payment" component={Payment} />

          {/* seller routes */}
          <Route path="/signup" component={Signup} />
          <Route exact path="/login" component={SignIn} />
          <Route path="/app/add_product/:catogory?" component={AddNewProduct} />
          <Route path="/app/store_info" component={StoreInfo} />
          <Route path="/app/products" component={Products} />
          <Route path="/app/links" component={Links} />
          <Route path="/app/instagram" component={InstagramImport} />
          <Route path="/app/product_edit/:id" component={ProductEdit} />
          <Route
            path="/app/products_category/:cat_name/:id"
            component={ProductsByCategory}
          />
          <Route path="/app/dashboard" component={Dashboard} />
          <Route path="/app/add_category" component={AddNewCategory} />
          <Route
            path="/app/edit_category/:category_id"
            component={EditCategory}
          />
          <Route path="/app/categories" component={Categories} />
          <Route path="/app/settings" component={Account} />
          <Route path="/app/edit_account" component={EditAccount} />
          <Route component={() => <p>404</p>} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
