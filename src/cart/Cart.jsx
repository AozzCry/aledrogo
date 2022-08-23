import React from "react";

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
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

import CartItem from "./CartItem";

export default function Cart() {
  const cart = useSelector((state) => state.cart);

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
              <InputGroup>
                <InputRightElement
                  children={
                    <Button>
                      <CheckIcon color="teal.300" />
                    </Button>
                  }
                />
                <Input type="text" placeholder="Promo code" />
              </InputGroup>
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
