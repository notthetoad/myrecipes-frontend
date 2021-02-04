import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { MdClear } from 'react-icons/md';
import axios from 'axios';

const DeleteButton = (props) => {
	const { recipe_id } = props.props;

	const deleteRecipe = () => {
		axios.delete(`http://localhost:5000/deleterecipes/`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`
			},
			data: {
				recipe_id: recipe_id
			}
		})
			.then(res => console.log(res))
	}

	return (
		<IconButton 
				icon={<MdClear />}
				aria-label='Delete recipe'
				size='sm'
				ml='auto'
				onClick={deleteRecipe}
			/>
	)
}

export default DeleteButton;