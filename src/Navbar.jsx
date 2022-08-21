import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import {
  Box,
  Button,
  HStack,
  Text,
  Center,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import {
  CalendarIcon,
  PhoneIcon,
  ArrowForwardIcon,
  ArrowBackIcon,
} from '@chakra-ui/icons';
import API from './env';
import axios from 'axios';
import { Logo } from './Logo';

import { useDispatch } from 'react-redux';
import { userActions } from './store/user-slice';

import { ColorModeSwitcher } from './ColorModeSwitcher';

export default function Layout() {
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const saveCredentials = (email, password) => {
    dispatch(userActions.saveCredentials({ email, password }));
  };
  const logout = e => {
    e.preventDefault();
    try {
      const response = axios
        .post(`${API}/logout`, {
          withCredentials: true,
        })
        .then(saveCredentials('', ''))
        .then(navigate('/'));
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (localStorage.getItem('email') !== '') {
      (async () => {
        try {
          const response = axios
            .post(
              `${API}/login`,
              {
                email: localStorage.getItem('email'),
                password: localStorage.getItem('password'),
              },
              { withCredentials: true }
            )
            .then(
              saveCredentials(
                localStorage.getItem('email'),
                localStorage.getItem('password')
              )
            )
            .then(navigate('/'));
          console.log(response);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, []);
  return (
    <>
      <Box
        p={'2'}
        mt={'1'}
        borderWidth={'1px'}
        borderRadius="lg"
        overflow={'hidden'}
        w={'100%'}
        bg={'gray.700'}
      >
        <Flex>
          <Button
            borderWidth={'1px'}
            fontWeight="bold"
            borderRadius="lg"
            p="4"
            bg={'teal.800'}
          >
            <Link to="/">
              <Text as="em" fontSize={'2xl'} color={'teal.300'}>
                Aledrogo
              </Text>
            </Link>
          </Button>

          <Spacer />
          <Logo />
          <Spacer />
          <Button
            borderWidth={'1px'}
            fontWeight="bold"
            borderRadius="lg"
            p="4"
            bg={'teal.800'}
          >
            <Link to="/products">
              <Text as="em" fontSize={'2xl'} color={'teal.300'}>
                Products
              </Text>
            </Link>
          </Button>
          <Spacer />
          <Center>
            <Button borderWidth={'1px'} borderRadius="lg" ml={'4'} p="2" h={10}>
              <Center>
                <PhoneIcon />
                <Text ml={'2'}> Contact</Text>
              </Center>
            </Button>
          </Center>
          <Center>
            <Button borderWidth={'1px'} borderRadius="lg" p={2} h={10} ml={'4'}>
              <Link to="/wishlist">
                <Center>
                  <CalendarIcon />
                  <Text ml={'2'}> Wish list</Text>
                </Center>
              </Link>
            </Button>
          </Center>
          <Center>
            <Link to="/cart">
              <Button borderWidth={'1px'} borderRadius="lg" p="2" ml={4} h={10}>
                <HStack>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    w={'18'}
                    height={'18'}
                    fill={'white'}
                  >
                    <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                  </svg>
                  <Text> Cart-{cart.items.length}</Text>
                </HStack>
              </Button>
            </Link>
          </Center>
          {user.email === '' ? (
            <Center>
              <Link to="/login">
                <Button
                  borderWidth={'1px'}
                  borderRadius="lg"
                  p="2"
                  h={10}
                  bg={'teal.500'}
                  ml={4}
                >
                  <Center>
                    <ArrowForwardIcon />
                    <Text ml={'2'}>Sign In</Text>
                  </Center>
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  borderWidth={'1px'}
                  borderRadius="lg"
                  p="2"
                  h={10}
                  bg={'teal.500'}
                  ml={4}
                >
                  <Center>
                    <ArrowForwardIcon />
                    <Text ml={'2'}>Register</Text>
                  </Center>
                </Button>
              </Link>
            </Center>
          ) : (
            <Center>
              <Button
                onClick={logout}
                borderWidth={'1px'}
                borderRadius="lg"
                p="2"
                h={10}
                bg={'teal.500'}
                ml={4}
                _focus={{ bg: 'red.500' }}
              >
                <Center>
                  <ArrowBackIcon />
                  <Text ml={'2'}>Logout</Text>
                </Center>
              </Button>
              <Link to="/login">
                <Button
                  borderWidth={'1px'}
                  borderRadius="lg"
                  p="2"
                  h={10}
                  bg={'teal.500'}
                  ml={4}
                >
                  <Center>
                    <ArrowForwardIcon />
                    <Text ml={'2'}>{user.email}</Text>
                  </Center>
                </Button>
              </Link>
            </Center>
          )}
          <ColorModeSwitcher />
        </Flex>
      </Box>
      <Outlet />
    </>
  );
}
