import React, { useState } from 'react';
import './App.css';
import GamePage from './components/GamePageComponents/GamePage';
import HomePageComponent from './components/StartPageComponent/HomePage';
import { getDataFromSession } from './ServiceUtil/utils';

function App() {
  const [redirectToGame,setRedirectToGame] = useState(false);
  const [playerName,setPlayerName] = useState(getDataFromSession('playerName') ? getDataFromSession('playerName') : '');
  const [gameLevel,setGameLevel] = useState(getDataFromSession('gameLevel') ? getDataFromSession('gameLevel') : '');

  const enterInGame = () =>{
    if(playerName && gameLevel){
      setRedirectToGame(true);
    }
    else{
      setRedirectToGame(false);
    }
  }

  return (
    <div className="App">
      {redirectToGame?<GamePage playerName={playerName} gameLevel={gameLevel} />:<HomePageComponent enterInGame = {enterInGame} />}
    </div>
  );
}

export default App;
