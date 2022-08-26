import React from "react";
import { Link } from "react-router-dom";

import { DeleteProduct } from "../hooks/useProduct";

import { Box, Button, useToast } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import ProductImage from "../product/ProductImage";

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
      <Box p="6">
        <ProductImage
          size={"20vh"}
          images={product.images_url[0]}
          name={product.name}
        ></ProductImage>
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
        <Link to={`/productform`} state={product}>
          <Button>Edit</Button>
        </Link>
        <Button className="m-1" onClick={deleteClick}>
          Delete
        </Button>
      </Box>
    </Box>
  );
}
