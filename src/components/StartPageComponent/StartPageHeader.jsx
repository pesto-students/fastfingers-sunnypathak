import React from 'react';
import keyboardIcon from '../../images/keyboard-icon.png'

export default function Header(){
        return(
        <div className="homePage-container">
            <span className="icon-container">
                <img src={keyboardIcon} className="icon" alt="" />
            </span>
            <span className="game-headline">fast fingers</span>
            <h2 className="tagline">__________      the ultimate typing game      __________</h2>
        </div>
        )
}