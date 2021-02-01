import React from 'react';
import {
	Button,
	Link
} from '@chakra-ui/react';

const LogoutButton = () => {

	return (
		<Link to='/'>
			<Button onClick={() => localStorage.removeItem('jwt')} colorScheme='teal' bg='teal' mr='4'>
				Logout
			</Button>
		</Link>
	)
}

export default LogoutButton;
