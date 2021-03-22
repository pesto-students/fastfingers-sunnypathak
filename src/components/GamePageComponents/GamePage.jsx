import React, { useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';
import UserInfo from './UserInfo';
import './GameComponentStyle.css'
import GameInfo from './GameInfo';
import { getNewWords, getTimerValue, updateDifficultyFactor } from '../../ServiceUtil/utils';
import Timer from '../Timer/TimerClock';
import EndGame from '../../EndGameComponent/EndGame';

export default function GamePage({playerName, gameLevel}){

    const [word,setWord] = useState(getNewWords(gameLevel));
    const [timerValue,setTimerValue] = useState(getTimerValue(word,gameLevel));
    const [playerInput, setPlayerInput] =  useState('');
    const [gameOver,setGameOver] = useState(false);
    const [currentScore, setCurrentScore] = useState(0);
    const [allScores,setAllScores] = useState(sessionStorage.getItem('allScores')?sessionStorage.getItem('allScores'):[]);

    const userInputRef = useRef(null);

    useEffect(() => {
        userInputRef.current.focus();
    },[])

    const handleInputchange = (e) => {
        const value = e.target.value.toUpperCase(); 
        if(word === value){
            updateDifficultyFactor(gameLevel);
            setWord(getNewWords(gameLevel));
            setPlayerInput('');
            setTimerValue(getTimerValue(word,gameLevel));
        }
        else{
            setPlayerInput(value);
        }
    }

    const updateScore = (score) => {
        setCurrentScore(score);
    }

    const onTimeUp = () =>{
        sessionStorage.setItem('currentScore',currentScore);
        // let data = JSON.parse(sessionStorage.getItem('allScores')) || [];
        // const currentGameObj = {
        //     name:`GAME ${data.length+1}`,
        //     score:currentScore,
        //     isHighScore:false
        // }

        // if(data.length === 0) currentGameObj.isHighScore=true;
        // else{
        //     data.forEach((obj,i) => {
        //         if(obj.isHighScore && (obj.score < currentScore)){
        //             currentGameObj.isHighScore = true;
        //             obj.isHighScore = false
        //         }
        //     });
        // }

        // data.push(currentGameObj);
        // setAllScores(data);
        // sessionStorage.setItem('allScores', JSON.stringify(data));

        setGameOver(true);
    }

    const getCurrentWord = () => {
        const playerInputArr = playerInput.split('');
        const currentWord = word.toUpperCase().split('');
        return(
            <div className="word-displayed">
                {currentWord.map((char, i ) => {
                    let color;
                    if(i < playerInputArr.length){
                        color = char === playerInputArr[i] ? '#54ba18' : '#445298';
                    }
                    return(
                        <span key={i} style={{color: color}}>
                            {char}
                        </span>
                    )
                })}
            </div>
        )
    }

    if(gameOver){
        return(
            <EndGame playerName={playerName} gameLevel={gameLevel} currentScore={currentScore} allScores={allScores} />
        )
    }

    return(
        <div className="game-page-container">
            <div className="game-header">
                <UserInfo playerName={playerName} gameLevel={gameLevel} />
                <GameInfo intialTimerVal={currentScore} endGameFlag={false} updateScore={updateScore} />
            </div>
            <div className="game-body">
                <div className="score-board"></div>
                <div className="game-container">
                    <div className="count-down">
                    <Timer timerValue={timerValue} currentWord={word} onTimeUp={onTimeUp} />
                    </div>
                    <div className="words-container">
                        {getCurrentWord()}
                        <div className="user-input">
                            <input className="input-field" type="text"  onChange={handleInputchange} value={playerInput} ref={userInputRef}  />
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