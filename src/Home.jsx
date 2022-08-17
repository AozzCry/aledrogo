import React, { useEffect, useState } from "react";
import API from "./env";
import axios from "axios";
import { Container } from "react-bootstrap";

export default function Home() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API}/product/`, {
          withCredentials: true,
        });
        setProduct(response.data[0]);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return "Loading...";
  if (error) return "Error..." + error;
  return (
    <Container>
      {product.name}
      <p
        style={{
          textDecorationLine: "line-through",
          textDecorationStyle: "solid",
        }}
      >
        {product.price * 2}
      </p>
      {product.price}
    </Container>
  );
}
