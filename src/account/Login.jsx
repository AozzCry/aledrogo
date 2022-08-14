import React, { useState, useContext } from "react";
import API from "../env";
import axios from "axios";

import { Button, Form } from "react-bootstrap";

import UserContext from "../UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userCtx = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        await axios.post(`${API}/login`, {
          email,
          password,
        });
        userCtx.setEmail(email);
      } catch (e) {
        console.error(e);
      }
    })();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Log in
      </Button>
    </Form>
  );
};

export default Login;
