import React, { useContext, useEffect } from "react";
import API from "../env";
import axios from "axios";
import { useLocation } from "react-router";
import { Card, Button } from "react-bootstrap";

import AddReview from "./AddReview";

import UserContext from "../UserContext";

export default function ProductInfo() {
  const userCtx = useContext(UserContext);
  const location = useLocation();
  const product = location.state;
  const { name, price, count, desc, category, reviews } = product;
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
      </Button>{" "}
      {reviews &&
        reviews.map((review, index) => {
          return <div key={index}>{review.text}</div>;
        })}
      <AddReview product={product}></AddReview>
    </Card>
  );
}
