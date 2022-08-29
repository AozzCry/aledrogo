import React from "react";

import { Link } from "react-router-dom";
import { GetUserProducts } from "../hooks/useProduct";

import { Button, Grid, GridItem, Box } from "@chakra-ui/react";

import UserProduct from "./UserProduct";

export default function UserProducts() {
  const { products, setProducts, error, loading } = GetUserProducts();

  if (loading) return "Loading...";
  if (error) return "Error..." + error;
  return (
    <Box>
      <Link to="/productform">
        <Button className="m-1">Create product</Button>
      </Link>
      {products && (
        <Grid templateColumns={"repeat(4, 2fr)"}>
          {products.map((product, index) => {
            return (
              <GridItem key={index} className="m-1">
                <UserProduct product={product} setProducts={setProducts} />
              </GridItem>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
