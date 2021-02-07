import React from 'react';
import { Redirect } from 'react-router-dom';
import {
	Grid,
	GridItem,
} from '@chakra-ui/react';
import SideContainer from './SideContainer';
import RecipeInput from './RecipeInput';

const MainPage = ({ state }) => {

	if (state) {
		return (
			<Grid templateColumns='repeat(10, 1fr)' gap={3} h='1000vh' mt='5%'>
				<SideContainer />
				<GridItem colStart={4} colEnd={11}>
					<RecipeInput />
				</GridItem>
			</Grid>
	)
	} else {
		return <Redirect to='/' />
	}
}

export default MainPage;