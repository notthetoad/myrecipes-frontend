import React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import {
	Text,
	Center,
	FormControl,
	FormLabel,
	FormHelperText,
	Button,
	Input,
} from '@chakra-ui/react';
import ServerErrorMessageAlert from './ServerErrorMessageAlert';

const RegisterPage = () => {

	const [serverResCode, setServerResCode] = useState();
	const [alertOpen, setAlertOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const formik = useFormik({
		initialValues: {
			login: '',
			password: ''
		},
		onSubmit: values => {
			const { login, password } = values;

			axios.post('http://localhost:5000/register', {
				login: login,
				password: password
			})
			.then(res => {
				console.log(res)
				setServerResCode(res.status)
			})
			.catch(err => {
				console.log(err.response)
				setErrorMessage(err.response.data.message)
				ServerErrorMessageAlert(serverResCode, setAlertOpen)
			})
		},
	});

	return (
		<Center mt='10%'>
			<form onSubmit={formik.handleSubmit}>
				<FormControl id='login' isRequired>
					<FormLabel htmlFor='login'>Login</FormLabel>
					<Input 
						type='login' 
						id='login'
						name='login'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.login}
						mb='2'
						/>
				</FormControl>
				<FormControl id='password' isRequired>
					<FormLabel htmlFor='password'>Password</FormLabel>
					<Input 
						type='password'
						id='password'
						name='password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}	
						/>
					<FormHelperText mb='2'>Remember to never share your password with anybody</FormHelperText>
				</FormControl>
				<Button 
					colorScheme='teal' 
					variant='outline'
					type='submit' 
					mt='2'
					>Register</Button>
				<Center mt='4'>{serverResCode === 200 ? <Text>Successfully registered</Text> : null}</Center>
				<Center mt='4'>{serverResCode !== 200 && alertOpen ? <Text style={{color: "tomato"}}>{errorMessage}</Text> : null}</Center>
			</form>
		</Center>
	)
}


export default RegisterPage;