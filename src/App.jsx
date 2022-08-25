import { Route, Routes } from "react-router-dom";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Navbar from "./main/Navbar";
import Home from "./main/Home";
import Footer from "./main/Footer";

import Products from "./product/Products";
import ProductInfo from "./product/ProductInfo";
import ProductForm from "./product/ProductForm";

import WishList from "./wishlist/WishList";

import Cart from "./cart/Cart";

import Login from "./account/Login";
import Register from "./account/Register";
import UserProducts from "./account/UserProducts";
import EditUser from "./account/EditUser";
import Layout from "./Layout";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" exact element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductInfo />} />
        <Route path="/productform" element={<ProductForm />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/wishlist" element={<WishList />} />

        <Route path="/login" element={<Login />} />
        <Route path="/accont" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edituser" element={<EditUser />} />
        <Route path="/userproducts" element={<UserProducts />} />
      </Routes>

      <Footer />
    </ChakraProvider>
  );
}
