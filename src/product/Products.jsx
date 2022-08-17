import React, { useEffect, useState } from "react";
import API from "../env";
import axios from "axios";

import { Container, ListGroup, Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import Product from "./Product";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [productCount, setProductCount] = useState(5);

  const [search, setSearch] = useState("");
  const [sortState, setSortState] = useState("ascending");

  const sortMethods = {
    ascending: { method: (a, b) => (a.name < b.name ? -1 : 1) },
    descending: { method: (a, b) => (a.name > b.name ? -1 : 1) },
    lowestPrice: { method: (a, b) => (a.price < b.price ? -1 : 1) },
    highestPrice: { method: (a, b) => (a.price > b.price ? -1 : 1) },
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API}/product`, {
          withCredentials: true,
        });
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (products) {
      let cats = [];
      for (const product of products) {
        for (const category of product.category) {
          if (!cats.includes(category)) {
            cats.push(category);
          }
        }
      }
      setCategories(cats);
    }
  }, [products]);

  if (loading) return "Loading...";
  if (error) return "Error..." + error;
  return (
    <Container>
      <Row className="m-1">
        <Button onClick={() => setCategory("")}>Wszystkie</Button>
        {categories.map((category, index) => {
          return (
            <Col key={index} onClick={() => setCategory(category)}>
              {category}
            </Col>
          );
        })}
      </Row>
      <Form>
        <Form.Group className="m-1" controlId="searchProduct">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            value={search}
            placeholder="Search string"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Link to="/createproduct">
        <Button className="m-1">Create product</Button>
      </Link>
      {products && (
        <Container>
          <Form.Select
            className="m-1"
            onChange={(e) => setSortState(e.target.value)}
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
            <option value="lowestPrice">Lowest price</option>
            <option value="highestPrice">Highest price</option>
          </Form.Select>
          <ListGroup className="m-1">
            {products
              .filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
              )
              .filter((product) =>
                category ? product.category.includes(category) : true
              )
              .sort(sortMethods[sortState].method)
              .slice(0, productCount)
              .map((product, index) => {
                return (
                  <Product
                    key={index}
                    product={product}
                    setProducts={setProducts}
                  />
                );
              })}
          </ListGroup>

          <Button
            className="m-1"
            onClick={() => {
              setProductCount(productCount + 5);
            }}
          >
            Load more
          </Button>
        </Container>
      )}
    </Container>
  );
}
