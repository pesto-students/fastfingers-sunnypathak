import React from 'react';
import {FaUserAlt ,FaGamepad} from 'react-icons/fa'

export default function UserInfo({playerName,gameLevel}){
    

    return(
        <div className="user-info">
            <div className="player">
                <FaUserAlt className="player-icon" color="#ff5155" />
                <span className="playername">{playerName}</span>
            </div>
            <div className="game-level">
                <FaGamepad className="game-icon" color="#ff5155"  />
                <span className="game-level">LEVEL : {gameLevel}</span>
            </div>
        </div>
    )
}