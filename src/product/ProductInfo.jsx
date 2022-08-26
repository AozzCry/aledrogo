import React, { useState } from "react";
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
  Grid,
  GridItem,
  Center,
  HStack,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import AddReview from "../review/AddReview";
import Review from "../review/Review";
import ProductImage from "./ProductImage";

export default function ProductInfo() {
  const toast = useToast();
  const { productId } = useParams();
  const { product, error, loading } = GetOneProduct({ productId });
  const [image, setImage] = useState();

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
  console.log(product);
  if (loading) return "Loading...";
  if (error) return "Error..." + error;
  return (
    <Box  borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <HStack color="teal.500">
            {product.category &&
              product.category.map((cat, index) => {
                return <Box key={index}>{cat}</Box>;
              })}
          </HStack>
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
          <Text ml="2" maxW="650px" fontSize="md">
            {product.desc}{" "}
          </Text>
          <Box m={4} color="teal.500" fontSize="xl" fontWeight="bold">
            Pirce: ${product.price}
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
            <Button onClick={addToWishListClick}  _hover={{ transform: "scale(1.2)" }}>Add to wish list</Button>
          </Stack>
        </GridItem>
        <GridItem>
          <Center>
            <ProductImage
              size={"40vh"}
              image={image ? image : product.images_url[0]}
              name={product.name}
            />
          </Center>
          <Grid templateColumns="repeat(4, 1fr)" gap={0.5}>
            {product.images_url &&
              product.images_url.map((photo_url, index) => (
                <GridItem
                  border={'4px'}
                  borderColor={photo_url === image ? 'teal.400':'teal.800'}
                  borderRadius={'5px'}
                  _hover={{ transform: "scale(1.2)" }}
                  transition={'1s'}
                  onClick={() => setImage(photo_url)}
                  key={index}
                  m={0.5}
                >
                  <ProductImage
                    
                    size={"16vh"}
                    image={photo_url}
                    name={product.name}
                  />
                </GridItem>
              ))}
          </Grid>
        </GridItem>
      </Grid>

      <AddReview product={product}></AddReview>
      <Box
        border={"1px"}
        mt={2}
        mb={2}
        borderColor={"teal.500"}
        borderRadius="lg"
        bg="gray.700"
      >
        <Center>
          <Text fontSize={"xl"}> Last reviews </Text>
        </Center>
      </Box>
      {product.reviews &&
        product.reviews.map((review, index) => {
          return <Review key={index} review={review} productId={product._id} />;
        })}
    </Box>
  );
}
