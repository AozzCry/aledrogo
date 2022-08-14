import React from "react";

import { Link } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";

export default function CartProduct({ cartProduct, setCartProducts }) {
  return (
    <ListGroup.Item>
      {cartProduct.product.name}|{cartProduct.product.price}|{cartProduct.count}
      <Button
        className="btn m-1"
        onClick={() => {
          setCartProducts((current) =>
            current.map((obj) => {
              if (obj.product === cartProduct.product) {
                return {
                  ...obj,
                  product: cartProduct.product,
                  count: cartProduct.count + 1,
                };
              }
              return obj;
            })
          );
        }}
      >
        Add one
      </Button>
      <Button
        className="btn"
        onClick={() => {
          setCartProducts((current) =>
            current.map((obj) => {
              if (obj.product === cartProduct.product) {
                return {
                  ...obj,
                  product: cartProduct.product,
                  count: cartProduct.count - 1,
                };
              }
              return obj;
            })
          );
        }}
      >
        Remove one
      </Button>
      <Button
        className="btn m-1"
        onClick={() => {
          setCartProducts((prevProduct) =>
            prevProduct.filter((x) => x.product._id !== cartProduct.product._id)
          );
        }}
      >
        Delete
      </Button>
      <Link className="btn btn-primary" to="/productinfo" state={cartProduct}>
        Show more
      </Link>
    </ListGroup.Item>
  );
}
