import React, { useState } from 'react';
import './ScoreBoardStyle.css'

export default function ScoreBoard (){
    
    const [allScores] = useState(JSON.parse(sessionStorage.getItem('scoreBoardArr')));

    if(!Array.isArray(allScores)) {
        return(<div></div>)
    }

    const renderBoard = allScores.map(({name,score,isHighScore},index) => {
        return(
            <>
            {isHighScore && <span className="best-score">Personal Best</span>}
            {console.log(index)}
            <li key={index} className='scores'>{name} : {score}</li>
            </>
        )
    })

    return(
        <ul className='score-list'>
            {renderBoard}
        </ul>
    )
}