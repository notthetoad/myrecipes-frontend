import React, {useState} from 'react';
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

	const [jwt, setJwt] = useState(localStorage.getItem('jwt'));

	const props = {
		jwt: jwt,
		setJwt: setJwt
	};

    return(
        <Router>
					<Header jwt={jwt} setJwt={setJwt} />
						<Switch>
							<Route exact path='/' component={App} />
							<Route path='/main' component={MainPage} />
							{/* <Route>
								<MainPage props={props} />
							</Route> */}
							<Route path='/signup' component={RegisterPage} />
							{/* <Route path='/login' component={LoginPage} /> */}
							<Router path='/login'>
								<LoginPage jwt={jwt} setJwt={setJwt} />
							</Router>
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
