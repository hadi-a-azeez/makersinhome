import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./pages/client/search";
import Store from "./pages/client/store";
import StoreFavourates from "./pages/client/storeFavourates";
import StoreCart from "./pages/client/storeCart";
import ProductDetail from "./pages/client/productDetail";
import Home from "./pages/client/home";
import { Stack } from "@chakra-ui/layout";
import { CircularProgress } from "@material-ui/core";
import ImagesDump from "./pages/client/imageDump";

const Signup = lazy(() => import("./pages/seller/account/signup"));
const SignIn = lazy(() => import("./pages/seller/account/signin"));
const AddNewProduct = lazy(() =>
  import("./pages/seller/products/addNewProduct")
);
const StoreInfo = lazy(() => import("./pages/seller/store/storeInfo"));
const Products = lazy(() => import("./pages/seller/products/products"));
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

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <Stack w="100%" h="80vh" justifyContent="center" alignItems="center">
            <CircularProgress color="inherit" />
          </Stack>
        }
      >
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
          <Route path="/product/:productId" component={ProductDetail} />

          <Route path="/imagedump" component={ImagesDump} />
          {/* seller routes */}
          <Route path="/signup" component={Signup} />
          <Route exact path="/login" component={SignIn} />
          <Route path="/app/add_product/:catogory?" component={AddNewProduct} />
          <Route path="/app/store_info" component={StoreInfo} />
          <Route path="/app/products" component={Products} />
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
          <Route path="/app/account" component={Account} />
          <Route path="/app/edit_account" component={EditAccount} />
          <Route component={() => <p>404</p>} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
