import React from 'react';
import keyboardIcon from '../../images/keyboard-icon.png'

export default function Header(){
        return(
        <div className="homePage-container">
            <span className="icon-container">
                <img src={keyboardIcon} className="icon" alt="" />
            </span>
            <span className="game-headline">fast fingers</span>
            <span className="tagline">the ultimate typing game</span>
        </div>
        )
}