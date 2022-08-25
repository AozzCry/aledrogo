import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

import {
  Button,
  FormControl,
  Input,
  Box,
  Image,
  Flex,
  Center,
  Text,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { ArrowUpIcon, StarIcon, ArrowDownIcon } from "@chakra-ui/icons";

export default function Review({ review, productId }) {
  const [comment, setComment] = useState("");
  const toast = useToast();

  const { fetchProc } = useFetch("/review/addcomment/", "POST", {
    text: comment,
    productId,
    reviewId: review._id,
  });
  function addCommentSubmit(e) {
    e.preventDefault();
    fetchProc();
    toast({
      title: "Comment Added.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <Box maxW="3xl" borderWidth="1px" borderRadius="lg" overflow="hidden" p={2}>
      <Box>
        {Array(5)
          .fill("")
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i < review.grade ? "teal.500" : "gray.300"}
            />
          ))}
      </Box>
      <Box fontWeight={"200"}>{review.date}</Box>

      <Box fontWeight={"bold"} mt={2}>
        <Flex>
          <Image
            borderRadius="full"
            boxSize="50px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
          <Center ml={"2"}>{review.username}</Center>
        </Flex>
      </Box>
      <Box maxW={"2xl"} mt={"2"} borderWidth="1px" borderRadius="lg">
        {review.text}
      </Box>
      <Box mt={2}>
        <HStack>
          <Text color={"teal.300"}>Response</Text>
          <ArrowUpIcon /> <Text>0</Text>
          <ArrowDownIcon /> <Text>0</Text>
        </HStack>
      </Box>
      {review.comments &&
        review.comments.map((comment, index) => {
          return (
            <Box key={index}>
              {comment.date} | {comment.username} | {comment.text}
            </Box>
          );
        })}
      <form onSubmit={addCommentSubmit}>
        <FormControl>
          <Input
            type="text"
            value={comment}
            placeholder="Enter comment"
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </FormControl>
        <Button variant="primary" type="submit">
          Add comment
        </Button>
      </form>
    </Box>
  );
}
