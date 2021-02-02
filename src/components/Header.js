import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Flex,
	Spacer,
	Box,
	Heading,
	Button,
	useColorMode
} from '@chakra-ui/react';

const Header = ({ state, setState }) => {

	const { colorMode, toggleColorMode } = useColorMode();
	
	const jwt = localStorage.getItem('jwt');
	// const [jwt, setJwt] = useState(localStorage.getItem('jwt'));

	// do componentdidupdate with useEffect

	if (state === 'success') {
		return(
			<Flex p='1' style={{backgroundColor: '#319795'}}>
				<Box p='2'>
					<Link to='/'>
						<Heading size='md'>Placeholder app</Heading>
					</Link>
				</Box>
				<Spacer />
				<Box>
					<Link to='/'>
						<Button onClick={() => {localStorage.removeItem('jwt'); setState('logged out')}} colorScheme='teal' bg='teal' mr='4'>Logout</Button>
					</Link>
					<Button colorScheme='teal' bg='teal' onClick={toggleColorMode}>{colorMode === 'light' ? "Dark" : "Light"} Mode</Button>
				</Box>
			</Flex>
		)
	} else {
		return(
			<Flex p='1' style={{backgroundColor: '#319795'}}>
				<Box p='2'>
					<Link to='/'>
						<Heading size='md'>Placeholder app</Heading>
					</Link>
				</Box>
				<Spacer />
				<Box>
					<Link to='/signup'>
						<Button colorScheme='teal' bg='teal' mr='4'>
							Sign up
						</Button>
					</Link>
					<Link to='/login'>
						<Button colorScheme='teal' bg='teal' mr='4'>Login</Button>
					</Link>
					<Button colorScheme='teal' bg='teal' onClick={toggleColorMode}>{colorMode === 'light' ? "Dark" : "Light"} Mode</Button>
				</Box>
			</Flex>
		)
	}
}

export default Header;

        
    
