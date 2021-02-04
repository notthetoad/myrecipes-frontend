import React from 'react';
import {
	Center,
	Text
} from '@chakra-ui/react';

const RecipeAddedAlert = ({ serverRes }) => {

	const alert = () => {
		return <Text>Recipe Added</Text>
	}

	return (
		<Center>
			{serverRes === 200 ? setTimeout(alert, 1500) : null}
		</Center>
	)
}

export default RecipeAddedAlert;