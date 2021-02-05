import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Flex,
	Center,
	Box,
	Input,
	Button,
	FormLabel,
	Textarea,
	NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RecipeAddedAlert from './RecipeAddedAlert';
import ServerErrorMessageAlert from './ServerErrorMessageAlert';

const RecipeField = () => {

	const [serverCode, setServerCode] = useState();
	const [alertOpen, setAlertOpen] = useState(false);
	const [serverMessage, setServerMessage] = useState('');

	const source = axios.CancelToken.source();

	const formik = useFormik({
		initialValues: {
			title: '',
			author: '',
			ingredients: '',
			portionSize: 1,
			steps: '',
		},
		validationSchema: Yup.object({
			title: Yup.string()
				.required('Required'),
			author: Yup.string()
				.required('Required'),
			ingredients: Yup.string()
				.required('Required'),
			portionSize: Yup.number()
				.required('Required'),
			steps: Yup.string(),
		}),
		onSubmit: values => {
			const {
				title,
				author,
				ingredients,
				portionSize,
				steps
			} = values;

			const data = {
				title: title,
				author: author,
				ingredients: ingredients,
				portionSize: portionSize,
				steps: steps
			}

			axios.post('http://localhost:5000/postrecipes', {
				data 
			}, { headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
			},
				cancelToken: source.token
			})
			.then(res => {
				console.log(res)
				setServerCode(res.status)
				setServerMessage(res.data.message)
				RecipeAddedAlert(serverCode, setAlertOpen)
			})
			.catch(err => {
				setServerMessage(err.response.data.message)
				ServerErrorMessageAlert(serverCode, setAlertOpen)
			})
		},
	});

	useEffect(() => {
		return () => {
			source.cancel()
		}
	}, [alertOpen, source])


	const style = {color: 'tomato'}

	return (
		<form onSubmit={formik.handleSubmit}>
			<Flex>
				<Box width='600px'>
					<FormLabel htmlFor='title' mb='0'>Title</FormLabel>
					{formik.touched.title && formik.errors.title ? <Box style={style}>{formik.errors.title}</Box> : null}
					<Input 
						id='title'
						name='title'
						{...formik.getFieldProps('title')}
						mb='3'
					/>
					<FormLabel htmlFor='author' mb='0'>Author</FormLabel>
					{formik.touched.author && formik.errors.author ? <Box style={style}>{formik.errors.author}</Box> : null}
					<Input 
						id='author'
						name='author'
						{...formik.getFieldProps('author')}
						mb='3'
					/>
					<FormLabel htmlFor='ingredients' mb='0'>Ingredients</FormLabel>
					{formik.touched.ingredients && formik.errors.ingredients ? <Box style={style}>{formik.errors.ingredients}</Box> : null}
					<Textarea 
						id='ingredients'
						name='ingredients'
						{...formik.getFieldProps('ingredients')}
						mb='3'
					/>
					<FormLabel htmlFor='portionSize' mb='0'>Portion Size</FormLabel>
					<NumberInput clampValueOnBlur={true} defaultValue={1} min={1}>
						<NumberInputField 
							id='portionSize'
							name='portionSize'
							{...formik.getFieldProps('portionSize')}
						/>
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
					<FormLabel htmlFor='steps' mt='3' mb='0'>Steps</FormLabel>
					<Textarea 
						id='steps'
						name='steps'
						{...formik.getFieldProps('steps')}
					/>
					<Flex>
						<Button
							marginLeft='auto' 
							mt='3'
							onClick={formik.handleSubmit}
							type='submit'
						>
						Add recipe
						</Button>
					</Flex>
					{serverCode === 200 && alertOpen ? <Center>{serverMessage}</Center> : null}
					{serverCode !== 200 && alertOpen ? <Center style={{color: 'tomato'}}>{serverMessage}</Center> : null}
				</Box>
			</Flex>
		</form>
	)
}

export default RecipeField;