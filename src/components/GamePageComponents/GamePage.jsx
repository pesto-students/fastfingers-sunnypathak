import React, { useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';
import UserInfo from './UserInfo';
import './GameComponentStyle.css'
import GameInfo from './GameInfo';
import { getNewWords, getTimerValue } from '../../ServiceUtil/utils';
import Timer from '../Timer/TimerClock';

export default function GamePage({playerName, gameLevel}){

    const [word] = useState(getNewWords(gameLevel));
    const [timerValue] = useState(getTimerValue(word,gameLevel));
    const [playerInput, setPlayerInput] =  useState('');
    //const [currentScore, setCurrentScore] = useState(0);

    const userInputRef = useRef(null);

    useEffect(() => {
        userInputRef.current.focus();
    },[])
    const handleInputchange = (e) => {
        setPlayerInput(e.target.value.toUpperCase());
    }

    return(
        <div className="game-page-container">
            <div className="game-header">
                <UserInfo playerName={playerName} gameLevel={gameLevel} />
                <GameInfo />
            </div>
            <div className="game-body">
                <div className="score-board"></div>
                <div className="game-container">
                    <div className="count-down">
                        <Timer timerValue={timerValue} />
                    </div>
                    <div className="words-container">
                        <div className="word-displayed">{word.toUpperCase()}</div>
                        <div className="user-input">
                            <input className="input-field" type="text" onChange={handleInputchange} value={playerInput} ref={userInputRef}  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

GamePage.propTypes = {
    playerName : propTypes.string.isRequired,
    gameLevel : propTypes.string.isRequired
}

GamePage.defaultProps = {
    playerName : '',
    gameLevel : ''
}