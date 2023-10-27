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
import { getUser } from "./utils/userData";


function App() {

  const token = getUser()
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductCard />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/login" element={<Login_register />} />
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
