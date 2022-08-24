import { useLocation } from "react-router-dom";

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
} from "@chakra-ui/react";

const EditProfile = () => {
  return (
    <Box maxW="3xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading textAlign={"center"} fontFamily={""} mt={"4"} mb={"4"} size="lg">
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
                <Text>Password</Text>
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
                  />
                </Center>
              </Box>
            </Stack>
          </Center>
        </GridItem>
      </Grid>
      <Center>
        <Button colorScheme="teal" size="lg" width={"50%"} mb={4}>
          Save Changes!
        </Button>
      </Center>
    </Box>
  );
};

export default EditProfile;
