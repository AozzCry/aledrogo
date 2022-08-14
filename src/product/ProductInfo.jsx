import React, { useContext } from "react";

import { useLocation } from "react-router";
import { Card, Button } from "react-bootstrap";

import UserContext from "../UserContext";

export default function ProductInfo() {
  const userCtx = useContext(UserContext);

  const location = useLocation();
  const product = location.state;
  const { name, price, count, desc, category } = product;

  return (
    <Card>
      {name}|{price}|{count}|{desc}|
      {category && (
        <div>
          {category.map((cat, index) => {
            return <div key={index}>{cat}</div>;
          })}
        </div>
      )}
      <Button
        onClick={() => {
          for (let index = 0; index < userCtx.cart.length; ++index) {
            if (userCtx.cart[index].product.name === product.name) {
              userCtx.cart[index].count += 1;
              return;
            }
          }
          userCtx.setCart(userCtx.cart.concat([{ product, count: 1 }]));
        }}
      >
        Add to cart
      </Button>
    </Card>
  );
}
