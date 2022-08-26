import React from "react";

import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";

import { Link } from "react-router-dom";

import { Box, HStack, Image, Text, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import ProductImage from "../product/ProductImage";

export default function CartProduct({ item }) {
  const dispatch = useDispatch();
  const removeFromCart = () => {
    dispatch(cartActions.removeFromCart(item.product._id));
  };

  const setQuantity = (quantity) => {
    dispatch(
      cartActions.setQuantity({
        id: item.product._id,
        quantity,
      })
    );
  };

  return (
    <Box maxW="7xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box m={"3"} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <HStack m={"3"} spacing={8}>
          <ProductImage
            size={"15vh"}
            image={item.product.images_url[0]}
            name={item.product.name}
          />
          <Text>{item.product.name}</Text>
          <Text>${item.product.price}</Text>
          <input
            default={item.quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

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
