import React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import {
	Center,
	FormControl,
	FormLabel,
	FormHelperText,
	Button,
	Input,
} from '@chakra-ui/react';

const RegisterPage = () => {

	const [registerMessage, setRegisterMessage] = useState('');

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
			.then(res => setRegisterMessage(res.data.message))
		},
	});
	return (
		<Center mt='10%'>
			<form onSubmit={formik.handleSubmit}>
				<FormControl id='login' isRequired>
					<FormLabel htmlFor='login'>Login</FormLabel>
					{/* {formik.touched.login && formik.errors.login ? <Box style={{color: 'red'}}>{formik.errors.login}</Box> : null} */}
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
					{/* {formik.touched.password && formik.errors.password ? <Box style={{color: 'red'}}>{formik.errors.password}</Box> : null} */}
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
					type='submit'
					>Register</Button>
			</form>
			<Center>{/* message that user was successfully registered */}</Center>
		</Center>
	)
}


export default RegisterPage;