import React, { useState } from 'react';
import './App.css';
import GamePage from './components/GamePageComponents/GamePage';
import HomePageComponent from './components/StartPageComponent/HomePage';

function App() {
  const [redirectToGame,setRedirectToGame] = useState(false);
  const [playerName,setPlayerName] = useState(undefined);
  const [gameLevel,setGameLevel] = useState('EASY');

  const enterInGame = (playerName,gameLevel) =>{
    if(playerName && gameLevel){
      setPlayerName(playerName);
      setGameLevel(gameLevel);
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
