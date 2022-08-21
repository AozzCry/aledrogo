import { Route, Routes } from 'react-router-dom';

import { ChakraProvider, theme } from '@chakra-ui/react';

import Navbar from './Navbar';
import Home from './Home';

import Products from './product/Products';
import CreateProduct from './product/CreateProduct';
import ProductInfo from './product/ProductInfo';
import WishList from './product/WishList';

import Cart from './cart/Cart';

import Login from './account/Login';
import Register from './account/Register';
import Footer from './components/Footer';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductInfo />} />
          <Route path="createproduct" element={<CreateProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="login" element={<Login />} />
          <Route path="accont" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      <Footer />
    </ChakraProvider>
  );
}
