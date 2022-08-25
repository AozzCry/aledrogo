import React from "react";
import { AddToWishList } from "../hooks/useWishList";

import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";

import { Link } from "react-router-dom";

import { Box, Button, useToast } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import ProductImage from "./ProductImage";

export default function Product({ product }) {
  const toast = useToast();

  const dispatch = useDispatch();
  function addToCartHandler() {
    dispatch(cartActions.addToCart(product));
    toast({
      title: product.name + " added to cart.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  const { AddToWishListProc } = AddToWishList({ productId: product._id });
  function addToWishListClick() {
    AddToWishListProc();
    toast({
      title: product.name + " added to wish list.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }
  console.log(product);
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <ProductImage images={product.images_url} />
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {product.name}
        </Box>
        <Box>
          ${product.price}
          <Box as="span" color="gray.600" fontSize="sm"></Box>
        </Box>
        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={
                  i <
                  product.reviews.reduce((a, b) => a + b.grade, 0) /
                    product.reviews.length
                    ? "teal.500"
                    : "gray.300"
                }
              />
            ))}
          <Box as="span" ml="2">
            {product.reviews.length}
          </Box>
        </Box>
        <Button>
          <Link to={`/products/${product._id}`} state={product}>
            Show more
          </Link>
        </Button>
        <Button onClick={addToCartHandler}>Add to cart</Button>
        <Button onClick={addToWishListClick}>Add to wish list</Button>
      </Box>
    </Box>
  );
}
