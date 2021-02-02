import React from 'react';
import { Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage';

const App = ({ state }) => {

  if (state) {
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