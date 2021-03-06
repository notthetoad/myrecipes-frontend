import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import {
	Center,
	FormLabel,
	Button,
	Input,
	Text
} from '@chakra-ui/react';
import { Redirect } from 'react-router-dom';
import ServerErrorMessageAlert from './ServerErrorMessageAlert';

const LoginPage = ({ setState }) => {

	const [serverCode, setServerCode] = useState();
	const [errorMessage, setErrorMessage] = useState('');
	const [alertOpen, setAlertOpen] = useState(false);

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
				setServerCode(res.status);
				localStorage.setItem('jwt', res.data.jwt)
				setState(res.data.jwt)
			}) 
			.catch(err => {
				setErrorMessage(err.response.data.message)
				ServerErrorMessageAlert(serverCode, setAlertOpen)
			})
		}
	})

	if (serverCode === 200) {
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
						style={errorMessage === 'Invalid login' ? {borderColor: 'red'} : null}
					/>
					<FormLabel htmlFor='password'>Password</FormLabel>
					<Input 
						id='password'
						name='password'
						type='password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
						style={errorMessage === 'Invalid password' ? {borderColor: 'red'} : null}
					/>
					<Button
						colorScheme='teal'
						variant='outline'
						mt='2'
						mb='2'
						type='submit'
					>Log in</Button>
					<Center>
						{serverCode !== 200 && alertOpen ? <Text style={{color: 'tomato'}}>{errorMessage}</Text> : null}
					</Center>
				</form>
			</Center>
		)
	}
}

export default LoginPage;