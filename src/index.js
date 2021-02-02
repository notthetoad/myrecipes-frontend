import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import MyRecipes from './components/MyRecipes';
import MainPage from './components/MainPage';

const Routing = () => {

	const [loggedIn, setLoggedIn] = useState();

    return(
        <Router>
					<Header state={loggedIn} setState={setLoggedIn} />
						<Switch>
							<Route exact path='/' component={App} />
							<Route path='/main' component={MainPage} />
							<Route path='/signup' component={RegisterPage} />
							{/* <Route path='/login' component={LoginPage} /> */}
							<Route to='/login'>
								<LoginPage setState={setLoggedIn}/>
							</Route>
							<Route path='/myrecipes' component={MyRecipes} />
						</Switch>
        </Router>
		)
		}

ReactDOM.render(
	<ChakraProvider>
		<Routing />
	</ChakraProvider>,
	document.getElementById('root'));
