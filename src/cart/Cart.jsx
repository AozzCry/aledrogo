import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

import { useSelector } from "react-redux";

import {
  Box,
  Text,
  Flex,
  Button,
  Center,
  InputGroup,
  InputRightElement,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

import CartItem from "./CartItem";

export default function Cart() {
  const toast = useToast();
  const cart = useSelector((state) => state.cart);
  const [code, setCode] = useState("");
  const { resData, fetchProc } = useFetch("/discount", "POST", {
    code,
  });
  function applyDiscount(e) {
    e.preventDefault();
    fetchProc();
    toast({
      title: "Discount applied.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }
  console.log(resData);
  return (
    <Box>
      {cart.items && (
        <Box>
          {cart.items.map((item, index) => {
            return <CartItem key={index} item={item} />;
          })}
        </Box>
      )}
      <Box maxW="xs" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text>Use your promo code</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <form onSubmit={applyDiscount}>
                <Input
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Promo code"
                />
                <Button type="submit">
                  <CheckIcon color="teal.300" />
                </Button>
              </form>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Flex justifyContent={"justify-between"}>
          <Box p={"4"} fontWeight={"bold"}>
            Total ammount <Box color={"teal.300"}>${cart.totalPrice}</Box>
          </Box>
        </Flex>
        <Center>
          <Button colorScheme="teal" size="md" width={"80%"} mb={4}>
            Buy now!
          </Button>
        </Center>
      </Box>
    </Box>
  );
}
