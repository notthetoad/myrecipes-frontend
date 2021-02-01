import React from 'react';
import { Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage';

const App = () => {

  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    return(
      <Redirect to='/main' />
    )
  } else {
    return (
      <LandingPage />
    )
  }
}

export default App;