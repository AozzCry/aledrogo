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
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
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
      <Box fontWeight={"200"}>{new Date(review.date).toLocaleString()}</Box>
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
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Button color={"teal.300"} flex="1" textAlign="left">
              Show comments
              <AccordionIcon />
            </Button>
          </AccordionButton>

          <AccordionPanel>
            {review.comments &&
              review.comments.map((comment, index) => {
                return (
                  <Box key={index} borderWidth="1px" borderRadius="lg">
                    <Text>{comment.userName}</Text>
                    <Text>{new Date(comment.date).toLocaleString()}</Text>
                    <Box m={"2"}>{comment.text}</Box>
                  </Box>
                );
              })}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
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
