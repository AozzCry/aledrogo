import React from "react";
import { DeleteProduct } from "../hooks/useProduct";

import { Link } from "react-router-dom";

import { Box, Image, Button, useToast } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export default function UserProduct({ product, setProducts }) {
  const toast = useToast();

  const { DeleteProductProc } = DeleteProduct({ productId: product._id });
  function deleteClick() {
    DeleteProductProc();
    setProducts((prevProduct) =>
      prevProduct.filter((x) => x._id !== product._id)
    );
    toast({
      title: "Product deleted.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={product.images_url[0]} />
      <Image
        boxSize="100px"
        objectFit="cover"
        src="https://bit.ly/dan-abramov"
        alt="Dan Abramov"
      ></Image>
      <Box p="6">
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
          <Link to={`/editproduct`} state={product}>
            Edit
          </Link>
        </Button>
        <Button className="m-1" onClick={deleteClick}>
          Delete
        </Button>
      </Box>
    </Box>
  );
}
