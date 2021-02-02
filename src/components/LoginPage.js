import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import {
	Center,
	FormLabel,
	Button,
	Input,
} from '@chakra-ui/react';
import { Redirect } from 'react-router-dom';

const LoginPage = ({ jwt, setJwt }) => {

	const formik = useFormik({
		initialValues : {
			login: '',
			password: ''
		},
		onSubmit: values => {
			const { login, password } = values;

			axios.post('http://localhost:5000/login', {
				login: login,
				password: password
			})
			.then(res => {
				console.log(res)
				localStorage.setItem('jwt', res.data.jwt);
				setJwt(localStorage.getItem('jwt'))
			})
			.catch(err => console.log(err.message))
		}
	})

	if (jwt) {
		return <Redirect to='/main' />
	} else {
		return (
			<Center mt='10%'>
				<form onSubmit={formik.handleSubmit}>
					<FormLabel htmlFor='login'>Login</FormLabel>
					<Input 
						id='login'
						name='login'
						type='text'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.login}
						mb='2'
					/>
					<FormLabel htmlFor='password'>Password</FormLabel>
					<Input 
						id='password'
						name='password'
						type='password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
					/>
					<Button
						colorScheme='teal'
						variant='outline'
						mt='2'
						mb='2'
						type='submit'
					>Log in</Button>
				</form>
			</Center>
		)
	}
}

export default LoginPage;