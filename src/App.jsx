import React, { useEffect } from "react";
import ReactGA from "react-ga";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import GenPassWordLink from "./pages/client/genPasswordLink";
import PasswordReset from "./pages/client/password";
import Payment from "./pages/payment";
import Account from "./pages/account/account";
import EditAccount from "./pages/account/editAccount";
import EditSettings from "./pages/account/editSettings";
import SignIn from "./pages/account/signin";
import Signup from "./pages/account/signup";
import AddNewCategory from "./pages/categories/addNewCategory";
import Categories from "./pages/categories/categories";
import EditCategory from "./pages/categories/editCategory";
import Links from "./pages/links";
import AddNewProduct from "./pages/products/addNewProduct";
import InstagramImport from "./pages/products/instagramImport";
import ProductEdit from "./pages/products/productEdit";
import Products from "./pages/products/products";
import ProductsByCategory from "./pages/products/productsByCategory";
import Dashboard from "./pages/store/dashboard";
import { UserContextProvider } from "utils/hooks/useUser";
import SellerPageLayout from "layouts/Seller";
import { HeaderContextProvider } from "utils/hooks/useHeader";

const App = () => {
  useEffect(() => {
    ReactGA.initialize("UA-198507581-2");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router>
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
        <UserContextProvider>
          <HeaderContextProvider>
            <SellerPageLayout label="Dashboard">
              <Route path="/app/dashboard" component={Dashboard} />

              <Route exact path="/app/products" component={Products} />
            <Route exact

                path="/app/products/add/:catogory?"

                component={AddNewProduct}

              />
                <Route exact path="/app/products/:id" component={ProductEdit} />
              
              <Route path="/app/links" component={Links} />
              <Route path="/app/instagram" component={InstagramImport} />
              <Route exact
                path="/app/categories/products/:cat_name/:id"
                component={ProductsByCategory}
              />

              <Route exact path="/app/categories" component={Categories} />
              <Route path="/app/categories/add" component={AddNewCategory} />
              <Route
                path="/app/edit_category/:category_id"
                component={EditCategory}
              />

              <Route exact path="/app/settings" component={Account} />
              <Route path="/app/settings/edit" component={EditSettings} />
              <Route
                path="/app/settings/edit-store-info"
                component={EditAccount}
              />
            </SellerPageLayout>
          </HeaderContextProvider>
        </UserContextProvider>
        <Route component={() => <p>404</p>} />
      </Switch>
    </Router>
  );
};

export default App;
