import React, { useState } from "react";
import API from "../env";
import axios from "axios";

import { Button, Form } from "react-bootstrap";

export default function CreateProduct() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");
  const [desc, setDesc] = useState("");
  const [categoryString, setCategoryString] = useState("");
  const [category, setCategory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.post(
        `${API}/product`,
        {
          name,
          price,
          count,
          desc,
          category,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setCategory([]);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    console.log(error);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="createProduct">
        <Form.Control
          type="text"
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Control
          type="number"
          value={price}
          placeholder="Enter price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Form.Control
          type="number"
          value={count}
          placeholder="Enter count"
          onChange={(e) => setCount(e.target.value)}
        />
        <Form.Control
          type="text"
          value={desc}
          placeholder="Enter description"
          onChange={(e) => setDesc(e.target.value)}
        />
        <Form.Control
          type="text"
          value={categoryString}
          placeholder="Enter category"
          onChange={(e) => setCategoryString(e.target.value)}
        />
        <Button
          variant="primary"
          onClick={() => {
            categoryString !== "" &&
              setCategory(category.concat(categoryString));
            setCategoryString("");
          }}
        >
          Add category
        </Button>
        {category && (
          <div>
            {category.map((cat, index) => {
              return cat + " ";
            })}
          </div>
        )}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      {error & <p>{error}</p>}
    </Form>
  );
}
