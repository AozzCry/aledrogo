import React from 'react';
import API from '../env';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';
import { Box, Image } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Product({ product, setProducts }) {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(cartActions.addToCart(product));
  };
  const deleteClick = () => {
    (async () => {
      try {
        await axios.delete(`${API}/product/${product._id}`, {
          withCredentials: true,
        });
        setProducts(prevProduct =>
          prevProduct.filter(x => x._id !== product._id)
        );
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const addToWishList = () => {
    (async () => {
      try {
        const response = await axios.post(
          `${API}/wishlist/`,
          { productId: product._id },
          {
            withCredentials: true,
          }
        );
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={product.images_url[0]} />

      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {product.name}
        </Box>

        <Box>
          23
          <Box as="span" color="gray.600" fontSize="sm"></Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon key={i} color={i < 2 ? 'teal.500' : 'gray.300'} />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            23 reviews
          </Box>
        </Box>
        <Link
          className="btn btn-primary"
          to={`/products/${product._id}`}
          state={product}
        >
          Show more
        </Link>
        <Button className="m-1" onClick={deleteClick}>
          Delete
        </Button>
        <Button onClick={addToCartHandler}>Add to cart</Button>
        <Button onClick={addToWishList}>Add to wish list</Button>
      </Box>
    </Box>
  );
}
