import { Route, Routes } from "react-router-dom";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Navbar from "./main/Navbar";
import Home from "./main/Home";
import Footer from "./main/Footer";

import Products from "./product/Products";
import CreateProduct from "./product/CreateProduct";
import ProductInfo from "./product/ProductInfo";

import WishList from "./wishlist/WishList";

import Cart from "./cart/Cart";

import Login from "./account/Login";
import Register from "./account/Register";
import UserProducts from "./account/UserProducts";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />

          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductInfo />} />
          <Route path="createproduct" element={<CreateProduct />} />

          <Route path="cart" element={<Cart />} />

          <Route path="wishlist" element={<WishList />} />

          <Route path="login" element={<Login />} />
          <Route path="accont" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="userproducts" element={<UserProducts />} />
        </Route>
      </Routes>
      <Footer />
    </ChakraProvider>
  );
}
