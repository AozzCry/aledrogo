import React, { useState } from "react";
import { Textarea, Grid, GridItem, Center } from "@chakra-ui/react";
import useFetch from "../hooks/useFetch";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

export default function AddReview({ product }) {
  const [grade, setGrade] = useState(0);
  const [content, setContent] = useState("");

  const toast = useToast();

  const { fetchProc } = useFetch("/review", "POST", {
    id: product._id,
    grade,
    text: content,
  });
  function addReview(e) {
    e.preventDefault();
    fetchProc();
    toast({
      title: "Review Added.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <form onSubmit={addReview}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <FormControl>
            <FormLabel>Enter grade 1-5</FormLabel>
            <Input
              type="number"
              value={grade}
              placeholder="Enter grade"
              min={0}
              max={5}
              onChange={(e) => setGrade(e.target.value)}
              required
            ></Input>
          </FormControl>
        </GridItem>
        <GridItem>
          <Center>
            <Button colorScheme="teal" type="submit" width={"100%"} mt={8}>
              Add rewiev
            </Button>
          </Center>
        </GridItem>
      </Grid>
      <FormControl>
        <FormLabel>Enter review</FormLabel>
        <Textarea
          type="text"
          value={content}
          placeholder="Enter review"
          onChange={(e) => setContent(e.target.value)}
          required
        ></Textarea>
      </FormControl>
    </form>
  );
}
