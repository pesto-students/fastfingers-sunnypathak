import React from 'react';
import propTypes from 'prop-types';

export default function GameInfo({score}){
    return(
        <div className="game-info">
            <div className="game-name">fast fingers</div>
            <div className="game-score">SCORE: {!score?'00:00':score}</div>
        </div>
    )
}

GameInfo.propTypes ={
    score:propTypes.string.isRequired,
}
GameInfo.defaultProps = {
    score : '00:00'
}