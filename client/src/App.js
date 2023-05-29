import React, { useEffect, useReducer, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { APIContextProvider } from "./Context/apiContext";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages & Components Route
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Characters from "./Pages/Characters";
import Creator from "./Pages/Creator";
import Strips from "./Pages/Strips";
import StripsSlider from "./Components/StripsSlider";
import TopHeader from "./Components/TopHeader";
import StripMonthCard from "./Components/StripMonthCard";
import Product from "./Pages/Product";
import ProductDetail from "./Pages/ProductDetail";
import Login from "./Pages/Login";
import Checkout from "./Pages/Checkout";
import OrderComplete from "./Pages/OrderComplete";
import Cart from "./Pages/Cart";
import Contactus from "./Pages/Contactus";
import Animation from "./Pages/Animation";
import Events from "./Pages/Events";
import Gallery from "./Pages/Gallery";
import CartSidebar from "./Components/CartSidebar";
import PrivacyPage from "./Pages/PrivacyPage";
import Cookie from "./Pages/Cookie";
import EventDetail from "./Components/EventDetail";
import Register from "./Pages/Register";
import FilterSidebar from "./Components/FilterSidebar";
import Verify from "./Pages/Verify";
import Wishlist from "./Pages/Wishlist";
import MyAccount from "./Pages/MyAccount";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyOtp from "./Pages/VerifyOtp";
import ResetPassword from "./Pages/ResetPassword";
import OrderDetail from "./Pages/OrderDetail";

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

const cartItemsFromLocalStorage = JSON.parse(
  localStorage.getItem("cartItems") || "[]"
);

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [yearValue, setYearValue] = useState("");

  const [toggleButton, setToggleButton] = useState(1);

  const toggleTab = (index) => {
    setToggleButton(index);
  };

  const [add, setAdd] = useState(1);
  const increment = () => {
    setAdd(add + 1);
  };

  const [total, setTotal] = useState("");
  const [detail, setDetail] = useState("");

  // Force Update State
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const [cartItems, setCartItems] = useState(cartItemsFromLocalStorage);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  const removeItem = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
    }
  };

  const [accout, setAccount] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <APIContextProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chintoo</title>
        <link rel="icon" id="faviconIcon" href="" />
      </Helmet>
      <div className="rel">
        <Router>
          <ToastContainer />
          <TopHeader
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            accout={accout}
            setAccount={setAccount}
            forceUpdate={forceUpdate}
            reducerValue={reducerValue}
          />
          <Header
            toggleButton={toggleButton}
            setToggleButton={setToggleButton}
            toggleTab={toggleTab}
          />
          {showSidebar === true ? (
            <CartSidebar
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              cartItems={cartItems}
              setCartItems={setCartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              removeItem={removeItem}
            />
          ) : null}
          {/* {showFilterSidebar === true ? (
            <FilterSidebar
              showFilterSidebar={showFilterSidebar}
              setShowFilterSidebar={setShowFilterSidebar}
              forceUpdate={forceUpdate}
            />
          ) : null} */}
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  toggleButton={toggleButton}
                  setToggleButton={setToggleButton}
                  toggleTab={toggleTab}
                />
              }
            />
            <Route path="/characters" element={<Characters />} />
            <Route path="/creator" element={<Creator />} />
            <Route path="/strips" element={<Strips />} />
            <Route
              path="/strip-detail/:month/:year"
              element={<StripsSlider yearValue={yearValue} />}
            />
            <Route
              path="/strip-month/:year"
              element={
                <StripMonthCard
                  yearValue={yearValue}
                  setYearValue={setYearValue}
                />
              }
            />
            <Route
              path="/product/"
              element={
                <Product
                  showFilterSidebar={showFilterSidebar}
                  setShowFilterSidebar={setShowFilterSidebar}
                  onAdd={onAdd}
                  cartItems={cartItems}
                  onRemove={onRemove}
                />
              }
            />
            <Route
              path="/product-detail/:product_id/:product_variant_id"
              element={
                <ProductDetail
                  onAdd={onAdd}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  onRemove={onRemove}
                  forceUpdate={forceUpdate}
                  reducerValue={reducerValue}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoutes>
                  <Cart
                    add={add}
                    setAdd={setAdd}
                    increment={increment}
                    forceUpdate={forceUpdate}
                  />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoutes>
                  <Wishlist
                    onAdd={onAdd}
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/my-account"
              element={
                <ProtectedRoutes>
                  <MyAccount setAccount={setAccount} />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoutes>
                  <Checkout
                    add={add}
                    total={total}
                    setTotal={setTotal}
                    detail={detail}
                    setDetail={setDetail}
                    reducerValue={reducerValue}
                    forceUpdate={forceUpdate}
                  />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/order-complete"
              element={<OrderComplete detail={detail} setDetail={setDetail} />}
            />
            <Route path="/order-detail/:id" element={<OrderDetail />} />
            <Route path="/animation" element={<Animation />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event-detail/:event_id" element={<EventDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contactus" element={<Contactus />} />

            {/* AUTH ROUTES  */}
            <Route
              path="/login"
              element={
                <Login
                  accout={accout}
                  setAccount={setAccount}
                  cartItems={cartItems}
                />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* PRIVACY POLICY ROUTES  */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookie" element={<Cookie />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </APIContextProvider>
  );
}

export default App;

export function ProtectedRoutes(props) {
  if (localStorage.getItem("userId")) {
    return props.children;
  } else {
    return <Navigate to="/Login" />;
  }
}
