import { Route, Switch, Redirect } from "react-router-dom";

import Auth from "./pages/auth/Auth.jsx";
import Home from "./pages/home/Home.jsx";
import Shop from "./pages/shop/Shop.jsx";
import Layout from "./components/layout/Layout.jsx";
import Products from "./pages/products/Products.jsx";
import ProductDetail from "./pages/productDetail/ProductDetail.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";

import "./App.scss";

function App() {
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
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/productDetail/:productId">
          <ProductDetail />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
