import React, { useState } from 'react';
import UserInfo from '../components/GamePageComponents/UserInfo';
import GameInfo from '../components/GamePageComponents/GameInfo';
import GamePage from '../components/GamePageComponents/GamePage';
import './EndGameStyle.css';
import {AiOutlineReload} from 'react-icons/ai';

export default function EndGame({playerName, gameLevel, currentScore, allScores}){

    const [goToMainPage, setGoToMainPage] = useState(false);

    const playAgain = () => [
        setGoToMainPage(true)
    ]

    const showHighScore = () => { 
        let highScore = allScores.map((obj, index) => {
            if(obj.score > currentScore){
                return false;
            }
            return true;
        });
        if(highScore) return(<div className="high-score">New High Score</div>)
    }

    if(goToMainPage){
        return(
            <GamePage playerName={sessionStorage.getItem('playerName')} gameLevel={sessionStorage.getItem('gameLevel')} />
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
                {showHighScore()}
            </div>
            <div className="play-again" onClick={playAgain}>
                <span className="play-again-icon"><AiOutlineReload color="#ff5155" /></span>
                <span className="play-again-txt">Play Again</span>
            </div>
        </div>
    )    
}