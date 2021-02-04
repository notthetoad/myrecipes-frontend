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
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Stack = (props) => (

	<VStack w='70%'>
		<StackDivider>
			<Recipe {...props}/>
		</StackDivider>
	</VStack>
)

const Recipe = (props) => {

	return (
		<Flex p={5} shadow='md' borderWidth='1px' mb='3' direction='column'>
			<Flex align='center'>
				<Heading fontSize='1.5em'>{props.title}</Heading>
				<DeleteButton props={props}/> 
			</Flex>
			<Flex>
				<Text mt={4}>By: {props.author}</Text>
			</Flex>
			<Flex direction='column'>
				<Box mt={4}>Ingredients: {props.ingredients.split('\n').map(item => <Box key={props.recipe_id+item} ml='6%'>{item}<br /></Box>)}</Box>
			</Flex>
			<Text mt={4}>Portion Size: {props.portionSize}</Text>
			<Box mt={4}>Steps: {props.steps.split('\n').map(item => <Box key={props.recipe_id+item} ml='6%'>{item}<br /></Box>)}</Box>
		</Flex>
	)
}

const MyRecipes = ({ state }) => {

	const [recipes, setRecipes] = useState([]);

		useEffect(() => {
			const source = axios.CancelToken.source();

			axios.get('http://localhost:5000/getrecipes', {
				headers: {
					'Authorization': `Bearer ${state}`
				},
				cancelToken: source.token
			})
			.then(res => {
					setRecipes(res.data.recipes)
				})
			.catch(err => console.log('#Error ' + err))
			return () => {
				source.cancel()
			}
		}, [recipes, state])


	if (state) {
		return (
			<>
				<MainContainer children={recipes.map(recipe => <Stack key={recipe.recipe_id} recipe_id={recipe.recipe_id} title={recipe.title} author={recipe.author} ingredients={recipe.ingredients} portionSize={recipe.portion_size} steps={recipe.steps}/>)}/>
			</>
		)
	} else {
		<Redirect to='/login' />
	}
}

export default MyRecipes;