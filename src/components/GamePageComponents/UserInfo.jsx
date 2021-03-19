import React, { useEffect, useState } from 'react';
import {FaUserAlt ,FaGamepad} from 'react-icons/fa'

export default function UserInfo(){
    const [playerName,setPlayerName] = useState('');
    const [gameLevel,setGameLevel] = useState('');

    useEffect(() => {
        if(sessionStorage.getItem('playerName') && sessionStorage.getItem('gameLevel')){
            setPlayerName(sessionStorage.getItem('playerName').toUpperCase());
            setGameLevel(sessionStorage.getItem('gameLevel').toUpperCase());
        }
    },[])

    return(
        <div className="user-info">
            <div className="player">
                <FaUserAlt className="player-icon" color="#ff5155" size="32px"/>
                <span className="playername">{playerName}</span>
            </div>
            <div className="game-level">
                <FaGamepad className="game-icon" color="#ff5155" size="40px" />
                <span className="game-level">LEVEL : {gameLevel}</span>
            </div>
        </div>
    )
}