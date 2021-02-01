import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Heading,
  Center,
  Text,
  Flex,
  Box
} from '@chakra-ui/react';

const LandingPage = () => {

  const [jwt, setJwt] = useState(localStorage.getItem('jwt'));

  if (jwt) {
    return(
      <Redirect to='/main' />
    )
  } else {
    return (
      <Center>
        <Flex direction='column'>
          <Heading fontSize='70px' mt='25%'>Welcome to Placeholder</Heading>
          <Text textAlign='center' fontSize='20px' fontWeight='bold'>The best placeholder text</Text>
          <Link to='/signup'>
            <Text textAlign='center' fontSize='40px' fontWeight='bold' _hover={{color: '#319795'}}>
              Get Started Now
            </Text>
          </Link>
        </Flex>
      </Center>
    )
  }
}

export default LandingPage;