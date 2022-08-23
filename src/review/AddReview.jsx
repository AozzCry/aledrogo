import React, { useState } from "react";
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
      <FormControl>
        <FormLabel>Enter review</FormLabel>
        <Input
          type="text"
          value={content}
          placeholder="Enter review"
          onChange={(e) => setContent(e.target.value)}
          required
        ></Input>
      </FormControl>

      <FormControl>
        <FormLabel>Enter grade 1-5</FormLabel>
        <Input
          type="number"
          value={grade}
          placeholder="Enter grade"
          onChange={(e) => setGrade(e.target.value)}
          required
        ></Input>
      </FormControl>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
