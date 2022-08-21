import React, { useEffect, useState } from 'react';
import API from '../env';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';

import {
  Button,
  Input,
  Box,
  Heading,
  Text,
  Stack,
  HStack,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

import AddReview from './AddReview';
import Review from './Review';

export default function ProductInfo() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(cartActions.addToCart(product));
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API}/product/${id}`, {
          withCredentials: true,
        });
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return 'Loading...';
  if (error) return 'Error...' + error;
  return (
    <Box maxW="3xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {product.category && (
          <div>
            {product.category.map((cat, index) => {
              return <div key={index}>{cat}</div>;
            })}
          </div>
        )}
      </Box>
      <Heading size="lg">{product.name}</Heading>
      <Box display="flex" mt="2" ml="2" alignItems="center">
        {Array(5)
          .fill('')
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i < product.grade ? 'teal.500' : 'gray.300'}
            />
          ))}
      </Box>
      <Text as="em" fontSize="sm">
        Details:
      </Text>
      <Text ml="2" maxW="650px">
        {product.desc}{' '}
      </Text>
      <Box m={4} color="teal.500" fontSize="xl" fontWeight="bold">
        {product.price}
      </Box>
      <Stack direction="row" ml="2" m={6} spacing={4} align="center">
        <Button
          onClick={addToCartHandler}
          _hover={{ transform: 'scale(1.2)' }}
          colorScheme="teal"
          variant="outline"
        >
          Add to cart
        </Button>
      </Stack>
      <AddReview product={product}></AddReview>
      {product.reviews &&
        product.reviews.map((review, index) => {
          return <Review key={index} review={review} productId={product._id} />;
        })}
    </Box>
  );
}
