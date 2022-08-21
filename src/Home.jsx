import React, { useEffect, useState } from 'react';
import API from './env';
import axios from 'axios';
import { Box, Center, Text, Progress, Image } from '@chakra-ui/react';

export default function Home() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API}/product/`, {
          withCredentials: true,
        });
        setProduct(response.data[0]);
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
    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={'teal.500'}
      boxShadow={'teal.500'}
      overflow="hidden"
    >
      <Center>
        <Box mt={'4'} mb={'4'}>
          <Center>
            <Text color={'teal.200'}>Hot Shot!</Text>
          </Center>
        </Box>
      </Center>
      <Progress size="xs" isIndeterminate colorScheme="teal" />
      <Box mt={'2'}>
        <Center>
          <Image
            boxSize="200px"
            objectFit="cover"
            src="https://bit.ly/2Z4KKcF"
            alt="Dan Abramov"
          />
        </Center>
      </Box>
      <Box>
        <Center>
          <Text fontSize="xl" textAlign={'center'} mt={'2'}>
            {product.name}
          </Text>
        </Center>
      </Box>
      <Box mt={'2'}>
        <Center>
          <Text as="del"> {product.price * 2}</Text>
        </Center>
      </Box>
      <Box>
        <Center>
          <Text color={'teal.200'} fontSize={'4xl'}>
            {product.price}
          </Text>
        </Center>
      </Box>
      <Text ml={'8'}> {product.count}</Text>
      <Center>
        <Progress value={10} colorScheme="teal" w={'80%'} borderRadius="lg" />
      </Center>
      <Center>
        <Text mb={'4'} mt={'2'}>
          Hurry up! The offer ends in:{' '}
        </Text>
      </Center>
      <Center>
        <Text>Tutaj jakiś random timer</Text>
      </Center>
    </Box>
  );
}
