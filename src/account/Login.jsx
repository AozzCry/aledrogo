import React, { useState } from 'react';
import API from '../env';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { userActions } from '../store/user-slice';

import {
  Box,
  Input,
  Stack,
  Button,
  Heading,
  Flex,
  Spacer,
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const saveCredentials = () => {
    dispatch(userActions.saveCredentials({ email, password }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    try {
      const response = axios
        .post(
          `${API}/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then(saveCredentials())
        .then(navigate('/'));
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        alignItems={'center'}
        overflow="hidden"
      >
        <Stack spacing={5}>
          <Heading mt={'4'} as="h3" textAlign={'center'} size="lg">
            Log console log beter console
          </Heading>
          <Box color="teal.500" textAlign={'center'}>
            Username
          </Box>
          <Input
            type={'email'}
            textAlign={'center'}
            _focus={{
              bg: 'teal.500',
            }}
            variant="flushed"
            placeholder="Username"
            onChange={e => setEmail(e.target.value)}
          />
          <Box color="teal.500" textAlign={'center'}>
            Password
          </Box>
          <Input
            type={'password'}
            textAlign={'center'}
            _focus={{
              bg: 'teal.500',
            }}
            variant="flushed"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <Flex>
            <Spacer />
            <Button m={'4'} colorScheme="teal" variant="outline" type="submit">
              Log in
            </Button>
          </Flex>
        </Stack>
      </Box>
    </form>
  );
};

export default Login;
