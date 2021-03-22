import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

export default function GameInfo({initialTimerVal,endGameFlag,updateScore}){
    const [scoreTimer, setScoreTimer] = useState(initialTimerVal);
    const [scoreInterval, setScoreInterval] = useState(null);
    
    const formatTime = () => {
        const getSeconds = `0${(scoreTimer % 60)}`.slice(-2)
        const minutes = `${Math.floor(scoreTimer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
    
        return `${getMinutes} : ${getSeconds}`
      }

      useEffect(() =>{
        if(endGameFlag){
            clearInterval(scoreInterval);
            sessionStorage.setItem('currentScore',scoreTimer)
        }
        else{
            const score = formatTime();
            updateScore(score);
        }
      },[scoreTimer,endGameFlag])

    useEffect(() => {
        setScoreInterval(setInterval(() => {
            setScoreTimer(scoreTimer => scoreTimer + 1);
        },1000));
    },[])

    return(
        <div className="game-info">
            <div className="game-name">fast fingers</div>
            {!endGameFlag ? <div className="game-score">{formatTime()}</div> : <div></div>}
        </div>
    )
}

GameInfo.propTypes ={
    initialTimerVal:propTypes.number.isRequired,
}
GameInfo.defaultProps = {
    initialTimerVal : 0
}