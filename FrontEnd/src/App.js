import { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Auth from "./pages/auth/Auth.jsx";
import Home from "./pages/home/Home.jsx";
import Shop from "./pages/shop/Shop.jsx";
import Layout from "./components/layout/Layout.jsx";
import Products from "./pages/products/Products.jsx";
import ProductDetail from "./pages/productDetail/ProductDetail.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";

import { authActions } from "./store/auth/auth-slice.js";
import "./App.scss";

const App = () => {
  // Remeber to check here with useSelector to check if still authenticated
  // also if authenticated then dont show the auth paths conditionally
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      return;
    }
    const user = localStorage.getItem("userId");
    dispatch(authActions.successLogin({ jwtToken: jwtToken, userId: user }));
    dispatch(authActions.setAuth(true));
  }, [dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/auth/signup">
          <Auth />
        </Route>
        <Route path="/auth/reset">
          <Auth />
        </Route>
        <Route path="/auth/newpass/:token">
          <Auth />
        </Route>
        {isAuth && (
          <Route path="/myProducts">
            <Products />
          </Route>
        )}
        <Route path="/productDetails/:productId">
          <ProductDetail />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
