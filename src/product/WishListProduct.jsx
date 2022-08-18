import React, { useContext } from "react";
import API from "../env";
import axios from "axios";

import { ListGroup, Button } from "react-bootstrap";

export default function WishListProduct({ product, setProducts }) {
  const deleteItem = () => {
    (async () => {
      try {
        await axios.delete(`${API}/wishlist/${product._id}`, {
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

  return (
    <ListGroup.Item>
      {product.name}|{product.price}
      <Button onClick={deleteItem}>Remove</Button>
    </ListGroup.Item>
  );
}
