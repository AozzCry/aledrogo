import React, { useState, useEffect } from "react";
import API from "../env";
import axios from "axios";

import { Container, ListGroup, Button } from "react-bootstrap";
import WishListProduct from "./WishListProduct";

export default function WishList() {
  const [wishlistProduct, setWishListItems] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API}/wishlist`, {
          withCredentials: true,
        });
        setWishListItems(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setWishListItems(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Container>
      <Container>
        <ListGroup>
          {wishlistProduct &&
            wishlistProduct.map((product, index) => {
              return (
                <p>
                  <WishListProduct
                    key={index}
                    product={product}
                    setProducts={setWishListItems}
                  />
                </p>
              );
            })}
        </ListGroup>
      </Container>
    </Container>
  );
}
