import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./componenet/Home";
import ProductCard from "./componenet/ProductCard";
import SingleProduct from "./componenet/SingleProduct";
import "./App.css"
import Login_register from "./componenet/Login_register";
import PageNotFound from "./componenet/PageNotFound";
import ViewProfile from "./componenet/ViewProfile";
import ProtectedRoute from "./layout/ProtectedRoute";
import { getUser } from "./utils/userData";
import { useSelector } from "react-redux";
import OrderPlace from "./componenet/OrderPlace";
import PaymentValidate from "./componenet/PaymentValidate";


function App() {

  return (
    <BrowserRouter>
      <Header key={window.location.pathname} />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<ProductCard />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/login" element={<Login_register />} />
        <Route path="/forgot_password" element={<ViewProfile />} />
        <Route element={<ProtectedRoute />} >
          <Route path="/change_password" element={<ViewProfile />} />
          <Route path="/order_place" element={<OrderPlace />} />
          <Route path="/payment_validate" element={<PaymentValidate />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
