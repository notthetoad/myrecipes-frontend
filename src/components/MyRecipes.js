import React, { useState, useEffect } from 'react';
import {
	Box,
	StackDivider,
	VStack,
	Heading,
	Text,
	Flex,
} from '@chakra-ui/react';
import MainContainer from './MainContainer';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import axios from 'axios';

const Stack = (props) => (
	<VStack w='70%'>
		<StackDivider>
			<Recipe {...props} />
		</StackDivider>
	</VStack>
)

// Add button functionality
const Recipe = (props) => {

	// console.log(props)
	// somehow get recipe_id which is not in props to DeleteButton
	return (
		<Flex p={5} shadow='md' borderWidth='1px' mb='3' direction='column'>
			<Flex align='center'>
				<Heading fontSize='1.5em'>{props.title}</Heading>
				<EditButton />
				<DeleteButton props={props} /> 
			</Flex>
			<Flex>
				<Text mt={4}>By: {props.author}</Text>
			</Flex>
			<Flex direction='column'>
				<Box mt={4}>Ingredients: {props.ingredients.split('\n').map(item => <Box ml='6%'>{item}<br /></Box>)}</Box>
			</Flex>
			<Text mt={4}>Portion Size: {props.portionSize}</Text>
			<Box mt={4}>Steps: {props.steps.split('\n').map(item => <Box ml='6%'>{item}<br /></Box>)}</Box>
		</Flex>
	)
}

const MyRecipes = () => {

	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/getrecipes', {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`
			}
		})
		.then(res => {
			// console.log(res)
			setRecipes(res.data.recipes)
		})
	}, [recipes])

	// server requests all the time when trying to do componentDidUpdate with useEffect

	return (
		<>
			<MainContainer children={recipes.map(recipe => <Stack key={recipe.recipe_id} recipe_id={recipe.recipe_id} title={recipe.title} author={recipe.author} ingredients={recipe.ingredients} portionSize={recipe.portion_size} steps={recipe.steps}/>)}/>
		</>
	)
}

export default MyRecipes;