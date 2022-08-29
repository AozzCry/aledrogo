import React from "react";
import { GetAllProducts } from "../hooks/useProduct";

import { Box, Center, Text, Progress } from "@chakra-ui/react";
import ProductImage from "../product/ProductImage";

export default function Home() {
  const { products, error, loading } = GetAllProducts();

  if (loading) return "Loading...";
  if (error) return "Error..." + error;
  return (
    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="teal.500"
      boxShadow="teal.500"
      overflow="hidden"
    >
      <Center>
        <Box mt={"4"} mb={"4"}>
          <Center>
            <Text color={"teal.200"}>Hot Shot!</Text>
          </Center>
        </Box>
      </Center>
      <Progress size="xs" isIndeterminate colorScheme="teal" />
      <Box mt={"2"}>
        <Center>
          <ProductImage
            size="30vh"
            image={products[3].images_url[0]}
            name={products[3].name}
          />
        </Center>
      </Box>
      <Box>
        <Center>
          <Text fontSize="xl" textAlign={"center"} mt={"2"}>
            {products[3].name}
          </Text>
        </Center>
      </Box>
      <Box mt={"2"}>
        <Center>
          <Text as="del"> {products[3].price * 2}</Text>
        </Center>
      </Box>
      <Box>
        <Center>
          <Text color={"teal.200"} fontSize={"4xl"}>
            {products[3].price}
          </Text>
        </Center>
      </Box>
      <Text ml={"8"}> {products[3].count}</Text>
      <Center>
        <Progress value={10} colorScheme="teal" w={"80%"} borderRadius="lg" />
      </Center>
      <Center>
        <Text mb={"4"} mt={"2"}>
          Hurry up! The offer ends in:{" "}
        </Text>
      </Center>
      <Center>
        <Text>1 second</Text>
      </Center>
    </Box>
  );
}
