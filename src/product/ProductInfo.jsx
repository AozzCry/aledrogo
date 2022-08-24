import React from "react";
import { GetOneProduct } from "../hooks/useProduct";
import { AddToWishList } from "../hooks/useWishList";

import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";

import {
  Button,
  Box,
  Heading,
  Text,
  Stack,
  useToast,
  Image,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import AddReview from "../review/AddReview";
import Review from "../review/Review";

export default function ProductInfo() {
  const toast = useToast();
  const { productId } = useParams();
  const { product, error, loading } = GetOneProduct({ productId });

  const { AddToWishListProc } = AddToWishList({ productId });
  function addToWishListClick() {
    AddToWishListProc();
    toast({
      title: product.name + " added to wish list.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  const dispatch = useDispatch();
  function addToCartHandler() {
    dispatch(cartActions.addToCart(product));
    toast({
      title: product.name + " added to cart.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    console.log(product);
  }
  if (loading) return "Loading...";
  if (error) return "Error..." + error;
  return (
    <Box maxW="3xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {product.category && (
          <div>
            {product.category.map((cat, index) => {
              return <div key={index}>{cat}</div>;
            })}
          </div>
        )}
      </Box>
      <Heading size="lg">{product.name}</Heading>
      <Box display="flex" mt="2" ml="2" alignItems="center">
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
      </Box>
      <Text as="em" fontSize="sm">
        Details:
      </Text>
      <Text ml="2" maxW="650px">
        {product.desc}{" "}
      </Text>
      <Box m={4} color="teal.500" fontSize="xl" fontWeight="bold">
        {product.price}
      </Box>
      <Stack direction="row" ml="2" m={6} spacing={4} align="center">
        <Button
          onClick={addToCartHandler}
          _hover={{ transform: "scale(1.2)" }}
          colorScheme="teal"
          variant="outline"
        >
          Add to cart
        </Button>
        <Button onClick={addToWishListClick}>Add to wish list</Button>
      </Stack>
      <AddReview product={product}></AddReview>
      {product.reviews &&
        product.reviews.map((review, index) => {
          return <Review key={index} review={review} productId={product._id} />;
        })}
    </Box>
  );
}
