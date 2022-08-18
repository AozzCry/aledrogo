import React, { useContext } from "react";
import API from "../env";
import axios from "axios";

import { Link } from "react-router-dom";
import { ListGroup, Button, Form } from "react-bootstrap";

import UserContext from "../UserContext";

export default function Product({ product, setProducts }) {
  const userCtx = useContext(UserContext);

  const deleteClick = () => {
    (async () => {
      try {
        await axios.delete(`${API}/product/${product._id}`, {
          withCredentials: true,
        });
        setProducts((prevProduct) =>
          prevProduct.filter((x) => x._id !== product._id)
        );
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const addToWishList = () => {
    (async () => {
      try {
        const response = await axios.post(
          `${API}/wishlist/`,
          { productId: product._id },
          {
            withCredentials: true,
          }
        );
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <ListGroup.Item>
      {product.name}|{product.price}
      <Link
        className="btn btn-primary"
        to={`/products/${product._id}`}
        state={product}
      >
        Show more
      </Link>
      <Button className="m-1" onClick={deleteClick}>
        Delete
      </Button>
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
      <Button onClick={addToWishList}>Add to wish list</Button>
    </ListGroup.Item>
  );
}
