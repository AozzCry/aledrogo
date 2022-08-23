import React from "react";

import { Link } from "react-router-dom";
import { GetUserProducts } from "../hooks/useProduct";

import { Button, Wrap, WrapItem, Box } from "@chakra-ui/react";

import UserProduct from "./UserProduct";

export default function UserProducts() {
  const { products, setProducts, error, loading } = GetUserProducts();

  if (loading) return "Loading...";
  if (error) return "Error..." + error;
  return (
    <Box>
      <Link to="/createproduct">
        <Button className="m-1">Create product</Button>
      </Link>
      {products && (
        <Wrap>
          <WrapItem className="m-1">
            {products.map((product, index) => {
              return (
                <UserProduct
                  key={index}
                  product={product}
                  setProducts={setProducts}
                />
              );
            })}
          </WrapItem>
        </Wrap>
      )}
    </Box>
  );
}
