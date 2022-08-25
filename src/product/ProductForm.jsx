import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useLocation } from "react-router-dom";
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
  useToast,
} from "@chakra-ui/react";

const { v4: uuid } = require("uuid");

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);

  const [category, setCategory] = useState([]);
  const [desc, setDesc] = useState("");

  const { state: product } = useLocation();
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCount(product.count);
      setCategory(product.category);
      setDesc(product.desc);
    }
  }, [product]);
  const toast = useToast();

  const [addInput, setAddInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [album, setAlbum] = useState([]);
  const [limit, setLimit] = useState(true);

  function addPhoto(photo) {
    const validPhoto = [];
    for (let i = 0; i < photo.length; i++) {
      if (
        photo[i].type === "image/png" ||
        photo[i].type === "image/jpeg" ||
        photo[i].type === "image/jpg"
      ) {
        validPhoto.push(photo[i]);
      }
    }
    if (validPhoto.length + album.length <= 10) {
      const arrayCopy = [...album];
      for (let i = 0; i < validPhoto.length; i++) {
        arrayCopy.push({ photo: validPhoto[i], id: uuid() });
      }
      if (arrayCopy.length === 10) {
        setLimit(false);
      }
      setAlbum(arrayCopy);
    } else {
      console.log("maksymalna liczba zdjęć to 10");
    }
  }
  function deletePhoto(e) {
    const arrayCopy = [...album].filter((photo) => photo.id !== e.target.id);
    if (arrayCopy.length < 10) {
      setLimit(true);
    }
    if (arrayCopy.length === 0) {
      const background = document.getElementById("background");
      background.style.backgroundImage = `url('')`;
    }
    setAlbum(arrayCopy);
  }

  const data = new FormData();
  for (let i = 0; i < album.length; i++) {
    data.append("productPhotos", album[i].photo);
  }
  for (let i = 0; i < category.length; i++) {
    data.append("category", category[i]);
  }

  data.append("price", price);
  data.append("name", name);
  data.append("desc", desc);
  data.append("count", count);

  const { fetchProc } = useFetch(
    product ? "/product/" + product._id : "/product",
    "POST",
    data
  );
  function addProductSubmit(e) {
    e.preventDefault();
    fetchProc();
    toast({
      title: product ? "Product edited." : "Product created.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <Box maxW="3xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <form onSubmit={addProductSubmit}>
        <Heading
          textAlign={"center"}
          fontFamily={""}
          mt={"4"}
          mb={"4"}
          size="lg"
        >
          {product ? (
            <Text>Edit your product</Text>
          ) : (
            <Text>Create new product</Text>
          )}
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
                    placeholder={name}
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
          <GridItem>
            <Text m={1}>Click below to add picture</Text>
            <Box mr={3} id="background" border={"2px"} borderColor={"teal.500"}>
              {limit ? (
                <Input
                  multiple="multiple"
                  id="input"
                  name="file"
                  type="file"
                  h={"90px"}
                  opacity={0}
                  onChange={(e) => {
                    addPhoto(e.target.files);
                    e.target.value = null;
                  }}
                />
              ) : (
                <Input opacity={0} id="input" name="file" type="file" />
              )}
            </Box>
            <Grid templateColumns="repeat(4, 1fr)" gap={0.5}>
              {album &&
                album.map((photo) => (
                  <GridItem key={photo.id} m={0.5}>
                    <Image
                      src={`${URL.createObjectURL(photo.photo)}`}
                      alt="picture"
                      id={photo.id}
                      onClick={(e) => deletePhoto(e)}
                      w={"90px"}
                      h={"90px"}
                    />
                  </GridItem>
                ))}
            </Grid>
          </GridItem>
          <GridItem colSpan={2}>
            <Divider bg={"teal.500"} ml={"2"} maxWidth={"200px"} />
            <Stack direction="row" h="80px" pl={"2"} mt={"2"} mb={"6"}>
              <Divider orientation="vertical" bg={"teal.500"} />
              <Box>
                <Text>Categories</Text>
                {category &&
                  category.map((cat, index) => (
                    <Button
                      mt={1}
                      borderRadius={"20px"}
                      type={"disabled"}
                      textAlign={"center"}
                      _focus={{
                        bg: "teal.500",
                      }}
                      variant="flushed"
                      value={cat}
                      onClick={(e) => {
                        const newArray = [...category].filter(
                          (x) => x !== e.target.value
                        );
                        setCategory(newArray);
                      }}
                      key={index}
                    >
                      {cat}
                    </Button>
                  ))}
                <Button
                  onClick={() => {
                    setAddInput(!addInput);
                  }}
                >
                  {addInput ? <Text>Close</Text> : <Text>New</Text>}
                </Button>
                {addInput && (
                  <>
                    <Input
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
                    <Button
                      onClick={() => {
                        if (
                          newCategory !== "" &&
                          !category.includes(newCategory)
                        ) {
                          setCategory(category.concat(newCategory));
                          setNewCategory("");
                        }
                      }}
                    >
                      Add
                    </Button>
                  </>
                )}
              </Box>
            </Stack>
          </GridItem>
        </Grid>
        <Divider mt={"8"} mb={"4"} w={"40%"} />
        <Box mt={3} orientation="vertical">
          <Text fontWeight={"bold"} ml={"4"}>
            Description
          </Text>
          <Textarea
            w={"95%"}
            m={"4"}
            value={desc}
            placeholder={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></Textarea>
          <Button
            colorScheme="teal"
            size="lg"
            width={"100%"}
            mb={4}
            type="submit"
          >
            Save Changes!
          </Button>
        </Box>
      </form>
    </Box>
  );
}
