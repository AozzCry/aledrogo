import { useState } from "react";
import useFetch from "../hooks/useFetch";

import {
  Box,
  Heading,
  Text,
  Divider,
  Center,
  GridItem,
  Grid,
  Stack,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";

export default function EditUser() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");

  const toast = useToast();

  const { fetchProc: editFetch } = useFetch("/user", "POST", {
    name,
    password,
  });

  const { fetchProc: logoutFetch } = useFetch("/logout", "POST");

  function editUserSubmit(e) {
    e.preventDefault();
    if (password === repPassword) {
      editFetch();
      toast({
        title: "Account edited.",
        status: "success",
        duration: 15000,
        isClosable: true,
      });
      logoutFetch();
    }
  }

  return (
    <Box maxW="3xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <form onSubmit={editUserSubmit}>
        <Heading
          textAlign={"center"}
          fontFamily={""}
          mt={"4"}
          mb={"4"}
          size="lg"
        >
          <Text>Edit your profile!</Text>
          <Center>
            <Divider w={"80%"} />
          </Center>
        </Heading>
        <Grid templateColumns="repeat(1)" gap={2}>
          <GridItem>
            <Center>
              <Stack direction="row" h="80px" pl={"2"}>
                <Box color="teal.200">
                  <Text>Name</Text>
                  <Center>
                    <Input
                      bg={"teal.900"}
                      mt={1}
                      borderRadius={"20px"}
                      type={"text"}
                      textAlign={"center"}
                      _focus={{
                        bg: "teal.500",
                      }}
                      variant="flushed"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Center>
                </Box>
              </Stack>
            </Center>
          </GridItem>
          <GridItem>
            <Center>
              <Stack direction="row" h="80px" pl={"2"}>
                <Box color="teal.200">
                  <Text>New Password</Text>
                  <Center>
                    <Input
                      bg={"teal.900"}
                      mt={1}
                      borderRadius={"20px"}
                      type={"password"}
                      textAlign={"center"}
                      _focus={{
                        bg: "teal.500",
                      }}
                      variant="flushed"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Center>
                </Box>
              </Stack>
            </Center>
          </GridItem>
          <GridItem>
            <Center>
              <Stack direction="row" h="80px" pl={"2"}>
                <Box color="teal.200">
                  <Text> Repeat new password</Text>
                  <Center>
                    <Input
                      bg={"teal.900"}
                      mt={1}
                      borderRadius={"20px"}
                      type={"password"}
                      textAlign={"center"}
                      _focus={{
                        bg: "teal.500",
                      }}
                      variant="flushed"
                      onChange={(e) => setRepPassword(e.target.value)}
                    />
                  </Center>
                </Box>
              </Stack>
            </Center>
          </GridItem>
        </Grid>
        <Center>
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width={"50%"}
            mb={4}
          >
            Save Changes!
          </Button>
        </Center>
      </form>
    </Box>
  );
}
