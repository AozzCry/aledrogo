import React from "react";
import { DeleteFromWishList } from "../hooks/useWishList";
import { Link } from "react-router-dom";

import { Box, HStack, Text, Button, useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import ProductImage from "../product/ProductImage";

export default function WishListProduct({ product, setWishList }) {
  const toast = useToast();

  const { DeleteFromWishListProc } = DeleteFromWishList({
    productId: product._id,
  });

  function removeClick() {
    DeleteFromWishListProc();
    setWishList((prevProduct) =>
      prevProduct.filter((x) => x._id !== product._id)
    );
    toast({
      title: "Product removed from wishlist.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <Box maxW="3xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box m={"4"} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <HStack m={"4"} spacing={6}>
          <ProductImage
            size={"15vh"}
            image={product.images_url[0]}
            name={product.name}
          ></ProductImage>
          <Text>{product.name}</Text>
          <Text>${product.price}</Text>

          <Link to={`/products/${product._id}`}>
            <Button>Show more</Button>
          </Link>

          <Button onClick={removeClick}>
            Remove
            <DeleteIcon />
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
