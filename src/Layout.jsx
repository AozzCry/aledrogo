import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { Container, Nav, Stack, Button, Navbar } from "react-bootstrap";
import UserContext from "./UserContext";

export default function Layout() {
  const userCtx = useContext(UserContext);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <Button>Aledrogo</Button>
          </Link>
          <Link to="/products">
            <Button>Product list</Button>
          </Link>
          <Nav>
            <Stack direction="horizontal" gap={2}>
              <Link to="/cart">
                <Button className="btn btn-primary w-full">
                  Cart{userCtx.cart.length}
                </Button>
              </Link>
              {!userCtx.email ? (
                <Container>
                  <Link to="/register">
                    <Button className="btn btn-primary w-full">Register</Button>
                  </Link>
                  <Link to="/login" className="grow">
                    <Button className="btn btn-primary w-full">Login</Button>
                  </Link>
                </Container>
              ) : (
                <Link to="/login">
                  <Button className="btn btn-primary w-full">
                    {userCtx.email}
                  </Button>
                </Link>
              )}
            </Stack>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
