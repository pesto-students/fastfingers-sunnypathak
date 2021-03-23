import React, { useEffect, useState } from 'react';
import UserInfo from '../GamePageComponents/UserInfo';
import GameInfo from '../GamePageComponents/GameInfo';
import GamePage from '../GamePageComponents/GamePage';
import HomePageComponent from '../StartPageComponent/HomePage';
import './EndGameStyle.css';
import {AiOutlineReload} from 'react-icons/ai';

export default function EndGame({playerName, gameLevel, currentScore, allScores}){

    const [goToMainPage, setGoToMainPage] = useState(false);
    const [goToLogin,setGoToLogin] = useState(false);
    const [newHighScore, setNewHighScore] = useState(false);

    const playAgain = () => [
        setGoToMainPage(true)
    ]
    const loginAgain = () => {
        sessionStorage.removeItem('scoreBoardArr');
        sessionStorage.removeItem('currentScore');
        sessionStorage.removeItem('gameLevel');
        setGoToLogin(true);
    }
    useEffect(() => { 
        setNewHighScore(allScores[allScores.length-1].isHighScore);
    },[allScores])

    if(goToMainPage){
        return(
            <GamePage playerName={sessionStorage.getItem('playerName')} gameLevel={sessionStorage.getItem('gameLevel')} />
        )
    }

    if(goToLogin){
        return(
            <HomePageComponent fromEndGamePage={true} />
        )
    }

    return (
        <div className="end-game-container">
            <div className="game-header">
                <UserInfo playerName={playerName} gameLevel={gameLevel} />
                <GameInfo endGameFlag={true} />
            </div>
            <div className="score-card">
                <div className="game-number">SCORE : GAME {allScores.length}</div>
                <div className="score">{currentScore}</div>
                {newHighScore && <div className="high-score">New High Score</div> }
            </div>
            <div className="play-again" onClick={playAgain}>
                <span className="play-again-icon"><AiOutlineReload color="#ff5155" /></span>
                <span className="play-again-txt">Play Again</span>
            </div>
            <div className="quit" onClick={loginAgain}> QUIT</div>
        </div>
    )    
}