import React, { useContext } from "react";
import { Container, ListGroup } from "react-bootstrap";

import CartProduct from "./CartProduct";

import UserContext from "../UserContext";

const getSum = (cart) => {
  let len = cart.length;
  let sum = 0;
  while (len--) {
    sum += cart[len].product.price * cart[len].count;
  }
  return <>{sum.toFixed(2)} polskich zlotych pieniedzy</>;
};

export default function Cart() {
  const userCtx = useContext(UserContext);
  return (
    <Container>
      {userCtx.cart && (
        <Container>
          <ListGroup>
            {userCtx.cart.map((cartProduct, index) => {
              return (
                <CartProduct
                  key={index}
                  cartProduct={cartProduct}
                  setCartProducts={userCtx.setCart}
                />
              );
            })}
          </ListGroup>
          {getSum(userCtx.cart)}
        </Container>
      )}
    </Container>
  );
}
