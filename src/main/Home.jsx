import React from "react";
import { GetAllProducts } from "../hooks/useProduct";

import { Box, Center, Text, Progress, Image } from "@chakra-ui/react";

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
          <Image
            boxSize="200px"
            objectFit="cover"
            src="https://bit.ly/2Z4KKcF"
            alt="Dan Abramov"
          />
        </Center>
      </Box>
      <Box>
        <Center>
          <Text fontSize="xl" textAlign={"center"} mt={"2"}>
            {products[0].name}
          </Text>
        </Center>
      </Box>
      <Box mt={"2"}>
        <Center>
          <Text as="del"> {products[0].price * 2}</Text>
        </Center>
      </Box>
      <Box>
        <Center>
          <Text color={"teal.200"} fontSize={"4xl"}>
            {products[0].price}
          </Text>
        </Center>
      </Box>
      <Text ml={"8"}> {products[0].count}</Text>
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
