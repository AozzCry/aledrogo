import React, { useState, useContext } from "react";
import API from "../env";
import axios from "axios";

import { Form, Button } from "react-bootstrap";

export default function AddReview({ product, setProducts }) {
  const [grade, setGrade] = useState(0);
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        console.log(product._id, grade, content);

        const response = await axios.post(
          `${API}/review`,
          {
            id: product._id,
            grade,
            text: content,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="createProduct">
        <Form.Control
          type="text"
          value={content}
          placeholder="Enter review"
          onChange={(e) => setContent(e.target.value)}
        />
        <Form.Control
          type="number"
          value={grade}
          placeholder="Enter grade"
          onChange={(e) => setGrade(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
