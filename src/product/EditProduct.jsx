import { useState } from "react";
import useFetch from "../hooks/useFetch";

import {
  Box,
  Stack,
  Divider,
  Heading,
  Input,
  Center,
  Textarea,
  Text,
  Grid,
  GridItem,
  Image,
  Button,
  VStack,
} from "@chakra-ui/react";

const { v4: uuid } = require("uuid");

const EditProduct = () => {
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [detalis, setDetalis] = useState("");
  const [photo, setPhoto] = useState();
  const [category, setCategory] = useState([]);
  const [count, setCount] = useState(0);
  const [newCategory, setNewCategory] = useState(null);
  const [addInput, setAddInput] = useState(false);

  const listOfCategories = category.map((category) => (
    <Button
      mt={1}
      borderRadius={"20px"}
      type={"disabled"}
      textAlign={"center"}
      _focus={{
        bg: "teal.500",
      }}
      variant="flushed"
      value={category}
      onClick={(e) => deleteCategory(e)}
      id={uuid()}
      key={uuid()}
    >
      {category}
    </Button>
  ));
  const SendData = {
    price,
    name,
    detalis,
    photo,
    category,
    count,
  };
  const { fetchProc } = useFetch("/product", "POST", SendData);

  const allinone = async () => {
    console.log(SendData);
    fetchProc().then((data) => console.log(data));
    console.log(SendData);
  };

  const addCategory = () => {
    if (
      newCategory !== "" &&
      category.findIndex((x) => x === newCategory) === -1
    ) {
      console.log(newCategory);
      const newArray = [...category];
      newArray.push(newCategory);
      setCategory(newArray);
      setNewCategory("");
      setAddInput(false);
    }
  };

  const deleteCategory = (e) => {
    const newArray = [...category].filter((x) => x !== e.target.value);
    setCategory(newArray);
  };

  const validPhoto = (ph) => {
    const background = document.getElementById("background");
    if (ph) {
      if (
        ph.type === "image/png" ||
        ph.type === "image/jpeg" ||
        ph.type === "image/jpg"
      ) {
        background.style.backgroundImage = `url(${URL.createObjectURL(ph)})`;
        background.style.backgroundRepeat = "no-repeat";
        background.style.backgroundSize = "cover";
        background.style.boxShadow = ``;
        setPhoto(ph);
      } else {
        background.style.boxShadow = `inset 0 0 5em red, 0 0 1em red`;
        background.style.backgroundImage = `url()`;
      }
    }
  };

  return (
    <Box maxW="3xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading textAlign={"center"} fontFamily={""} mt={"4"} mb={"4"} size="lg">
        <Text>Edit your product</Text>
      </Heading>
      <Center>
        <Divider mt={"4"} mb={"4"} w={"90%"} />
      </Center>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <GridItem>
          <Stack direction="row" h="80px" pl={"2"}>
            <Divider orientation="vertical" bg={"teal.500"} />
            <Box>
              <Text>Product Name</Text>
              <Center>
                <Input
                  mt={1}
                  borderRadius={"20px"}
                  type={"text"}
                  textAlign={"center"}
                  _focus={{
                    bg: "teal.500",
                  }}
                  variant="flushed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Center>
            </Box>
          </Stack>
          <Divider bg={"teal.500"} ml={"2"} mt={"2"} maxWidth={"200px"} />
          <Stack direction="row" h="80px" pl={"2"} mt={"2"}>
            <Divider orientation="vertical" bg={"teal.500"} />
            <Box>
              <Text> Price</Text>
              <Center>
                <Input
                  mt={1}
                  borderRadius={"20px"}
                  type={"number"}
                  textAlign={"center"}
                  _focus={{
                    bg: "teal.500",
                  }}
                  variant="flushed"
                  placeholder={price}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Center>
            </Box>
          </Stack>
          <Divider bg={"teal.500"} ml={"2"} mt={"2"} maxWidth={"200px"} />
          <Stack direction="row" h="80px" pl={"2"} mt={"2"}>
            <Divider orientation="vertical" bg={"teal.500"} />
            <Box>
              <Text> Count</Text>
              <Center>
                <Input
                  mt={1}
                  borderRadius={"20px"}
                  type={"number"}
                  textAlign={"center"}
                  _focus={{
                    bg: "teal.500",
                  }}
                  variant="flushed"
                  placeholder={count}
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
              </Center>
            </Box>
          </Stack>
        </GridItem>
        <GridItem maxH={"300px"} maxW={"300px"}>
          <Box
            id="background"
            boxSize="sm"
            border={"2px"}
            borderColor={"teal.500"}
            maxH={"300px"}
            maxW={"300px"}
          >
            <Input
              id="input"
              w={"100%"}
              h={"100%"}
              name="file"
              type="file"
              opacity={"0"}
              onChange={(e) => {
                validPhoto(e.target.files[0]);
              }}
            />
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Divider bg={"teal.500"} ml={"2"} maxWidth={"200px"} />
          <Stack direction="row" h="80px" pl={"2"} mt={"2"} mb={"6"}>
            <Divider orientation="vertical" bg={"teal.500"} />
            <Box>
              <Text>Category</Text>

              <Center>
                {listOfCategories}
                <Text
                  ml={2}
                  onClick={() => {
                    setAddInput(!addInput);
                  }}
                >
                  Dodaj Kategorie
                </Text>
                {addInput && (
                  <>
                    <Input
                      mt={1}
                      ml={1}
                      mr={1}
                      maxWidth={"125px"}
                      borderRadius={"20px"}
                      type={"text"}
                      textAlign={"center"}
                      _focus={{
                        bg: "teal.500",
                      }}
                      variant="flushed"
                      value={newCategory}
                      onChange={(e) => {
                        setNewCategory(e.target.value);
                      }}
                    />
                    <Text
                      onClick={() => {
                        addCategory();
                      }}
                    >
                      Dodaj
                    </Text>
                  </>
                )}
              </Center>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
      <Center>
        <Divider mt={"4"} mb={"4"} w={"90%"} />
      </Center>
      <Box mt={2} orientation="vertical">
        <Text fontWeight={"bold"} ml={"4"}>
          Description
        </Text>
        <Textarea
          w={"95%"}
          m={"4"}
          value={detalis}
          onChange={(e) => {
            setDetalis(e.target.value);
          }}
        ></Textarea>
        <Button
          colorScheme="teal"
          size="lg"
          width={"100%"}
          mb={4}
          onClick={() => allinone()}
        >
          Save Changes!
        </Button>
      </Box>
    </Box>
  );
};

export default EditProduct;
