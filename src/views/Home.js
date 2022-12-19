import React from 'react';
import SessionGame from '../components/sections/SessionGame';
import Games from '../components/sections/Games';

import { useSelector } from 'react-redux'


const Home = () => {

  const started = useSelector((state) => {
    return state.sessionGame.activeGame.cards
  })


  return (
      <>
        {!started && (<Games />)}
        {started && (<SessionGame topDivider />)}
      </>
  );
}

export default Home;