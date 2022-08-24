import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";

import {
  Box,
  Input,
  Stack,
  Button,
  Heading,
  Flex,
  Spacer,
  Checkbox,
  useToast,
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const dispatch = useDispatch();
  const saveCredentials = () => {
    dispatch(userActions.saveCredentials(email));
  };

  const { resData: user, fetchProc: fetchUser } = useFetch("/user", "GET");

  const { fetchProc: fetchLogin } = useFetch("/login", "POST", {
    email,
    password,
  });

  async function loginSubmit(e) {
    e.preventDefault();
    fetchLogin()
      .then(() => fetchUser())
      .then(() => {
        toast({
          title: "You have been logged in.",
          description: "Hello " + user.name,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
        saveCredentials(user.email, user.name, user.avatar);
        if (stayLoggedIn) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
        }
      });
  }

  function stayLoggedInChange() {
    setStayLoggedIn(!stayLoggedIn);
  }
  return (
    <form onSubmit={loginSubmit}>
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        alignItems={"center"}
        overflow="hidden"
      >
        <Stack spacing={5}>
          <Heading mt={"4"} as="h3" textAlign={"center"} size="lg">
            Log console log beter console
          </Heading>
          <Box color="teal.500" textAlign={"center"}>
            Username
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
            <Checkbox onChange={stayLoggedInChange}>Stay logged in</Checkbox>
            <Button m={"4"} colorScheme="teal" variant="outline" type="submit">
              Log in
            </Button>
          </Flex>
        </Stack>
      </Box>
    </form>
  );
};

export default Login;
