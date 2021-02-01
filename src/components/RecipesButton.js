import React from 'react';
import {
	Button,
	Link
} from '@chakra-ui/react';

RecipesButton = () => {
	return (
		<Link to='/main'>
			<Button colorScheme='teal' bg='teal' mr='4'>
				Recipes
			</Button>
		</Link>
	)
}

export default RecipesButton;