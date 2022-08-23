import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

import { useNavigate } from "react-router-dom";

import {
  Box,
  Input,
  Stack,
  Button,
  Heading,
  Flex,
  Spacer,
  useToast,
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const { fetchProc } = useFetch("/register", "POST", {
    email,
    name,
    password,
  });

  function registerSubmit(e) {
    e.preventDefault();
    if (fetchProc()) {
      navigate("/");
      toast({
        title: "Account created.",
        description: name + " " + email + " " + password,
        status: "success",
        duration: 15000,
        isClosable: true,
      });
    }
  }

  return (
    <form onSubmit={registerSubmit}>
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        alignItems={"center"}
        overflow="hidden"
      >
        <Stack spacing={5}>
          <Heading mt={"4"} as="h3" textAlign={"center"} size="lg">
            Jump out of your window
          </Heading>
          <Box color="teal.500" textAlign={"center"}>
            Name
          </Box>
          <Input
            type={"text"}
            textAlign={"center"}
            _focus={{
              bg: "teal.500",
            }}
            variant="flushed"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Box color="teal.500" textAlign={"center"}>
            Email
          </Box>
          <Input
            type={"email"}
            textAlign={"center"}
            _focus={{
              bg: "teal.500",
            }}
            variant="flushed"
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box color="teal.500" textAlign={"center"}>
            Password
          </Box>
          <Input
            type={"password"}
            textAlign={"center"}
            _focus={{
              bg: "teal.500",
            }}
            variant="flushed"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Flex>
            <Spacer />
            <Button type="submit" m={"4"} colorScheme="teal" variant="outline">
              Register
            </Button>
          </Flex>
        </Stack>
      </Box>
    </form>
  );
};

export default Login;
