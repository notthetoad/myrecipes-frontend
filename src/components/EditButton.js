import React from 'react';
import {
	IconButton
} from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';

const EditButton = () => {
	return (
		<IconButton 
				icon={<MdEdit />}
				aria-label='Edit recipe'
				size='sm'
				ml='auto'
			/>
	)
}

export default EditButton;