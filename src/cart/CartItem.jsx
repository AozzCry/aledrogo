import React from 'react';
import API from '../env';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';

import { Link } from 'react-router-dom';
import {
  Box,
  HStack,
  Image,
  Text,
  Button,
  Divider,
  Center,
} from '@chakra-ui/react';
import { StarIcon, DeleteIcon } from '@chakra-ui/icons';

export default function CartProduct({ item }) {
  const addToWishList = () => {
    (async () => {
      try {
        const response = await axios.post(
          `${API}/wishlist/`,
          { productId: item.product._id },
          {
            withCredentials: true,
          }
        );
      } catch (err) {
        console.error(err);
      }
    })();
  };
  const dispatch = useDispatch();
  const removeFromCart = () => {
    dispatch(cartActions.removeFromCart(item.product._id));
  };
  const setQuantity = quantity => {
    dispatch(
      cartActions.setQuantity({
        id: item.product._id,
        quantity,
      })
    );
  };

  return (
    <Box maxW="3xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box m={'4'} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <HStack m={'4'} spacing={6}>
          <Image
            boxSize="100px"
            objectFit="cover"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          ></Image>
          <Text>{item.product.name}</Text>
          <Text>${item.product.price}</Text>
          <input
            default={item.quantity}
            onChange={e => setQuantity(e.target.value)}
          />

          <Button onClick={addToWishList}>
            Add to wish list
            <StarIcon />
          </Button>

          <Link to={`/products/${item.product._id}`} state={item.product}>
            <Button>Show more</Button>
          </Link>

          <Button onClick={removeFromCart}>
            Delete
            <DeleteIcon />
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
