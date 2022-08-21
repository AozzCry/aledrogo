import React, { useState } from 'react';
import API from '../env';
import axios from 'axios';

import { Box, Image, Flex, Center, Text, HStack } from '@chakra-ui/react';
import { ArrowUpIcon, StarIcon, ArrowDownIcon } from '@chakra-ui/icons';

import { Button, Form } from 'react-bootstrap';

export default function Review({ review, productId }) {
  const [comment, setComment] = useState('');

  const addComment = e => {
    e.preventDefault();
    try {
      axios.post(
        `${API}/review/addcomment/`,
        {
          text: comment,
          productId,
          reviewId: review._id,
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box maxW="3xl" borderWidth="1px" borderRadius="lg" overflow="hidden" p={2}>
      <Box>
        {Array(5)
          .fill('')
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i < review.grade ? 'teal.500' : 'gray.300'}
            />
          ))}
      </Box>
      <Box fontWeight={'200'}>{review.date}</Box>

      <Box fontWeight={'bold'} mt={2}>
        <Flex>
          <Image
            borderRadius="full"
            boxSize="50px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
          <Center ml={'2'}>{review.username}</Center>
        </Flex>
      </Box>
      <Box maxW={'2xl'} mt={'2'} borderWidth="1px" borderRadius="lg">
        {review.text}
      </Box>
      <Box mt={2}>
        <HStack>
          <Text color={'teal.300'}>Response</Text>
          <ArrowUpIcon /> <Text>0</Text>
          <ArrowDownIcon /> <Text>0</Text>
        </HStack>
      </Box>
      {review.comments &&
        review.comments.map((comment, index) => {
          return (
            <div key={index}>
              {comment.date}|{comment.text}|{comment.username}
            </div>
          );
        })}
      <Form onSubmit={addComment}>
        <Form.Group controlId="addComment">
          <Form.Control
            type="text"
            value={comment}
            placeholder="Enter comment"
            onChange={e => setComment(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add comment
        </Button>
      </Form>
    </Box>
  );
}
