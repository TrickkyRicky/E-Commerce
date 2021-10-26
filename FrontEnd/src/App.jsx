import { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./Pages/Home/Home.jsx";
import Shop from "./Pages/Shop/Shop.jsx";
import Auth from "./Pages/Auth/Auth.jsx";
import Products from "./Pages/Products/Products.jsx";
import ProductDetail from "./Pages/ProductDetail/ProductDetail.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";

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
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
