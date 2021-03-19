import React,{useRef, useState} from 'react';
import propTypes from 'prop-types';
import Header from './StartPageHeader';
import {FaPlay} from 'react-icons/fa'
import DifficutyLevel from './DifficultyLevel';
import './startComponentStyle.css';
import { getDataFromSession, setDataInSession } from '../../ServiceUtil/utils';



export default function StartPage({enterInGame}){
    const [playerName, setPlayerName] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('EASY')
    const [errorMsg, setErrorMsg] = useState('');
    const nameInputRef = useRef(null);

    const handleInputChange = (event) =>{
        event.persist();
        setPlayerName(event.target.value.toUpperCase());
        setErrorMsg('');
    }

    const handleDifficultyChange = (value) => {    
        setDifficultyLevel(value);
        setErrorMsg('');
    }

    const startGame = (event) => {
        event.preventDefault();
        if(!playerName){
            setErrorMsg('Player Name Must be Specified');
            nameInputRef.current.focus();
        }
        else{
            if(getDataFromSession('playerName')){
                sessionStorage.removeItem('playerName');
            }
            setDataInSession('playerName',playerName.toUpperCase());
            if(getDataFromSession('gameLevel')){
                sessionStorage.removeItem('gameLevel');
            }
            setDataInSession('gameLevel',difficultyLevel.toUpperCase());
    
           enterInGame();
        }
        
    }

    const errorMesage = () =>{
        if(errorMsg){
            return(<div className="error">{errorMsg}</div>)
        }
    }


    return(
        <div >
            <Header/>
            <div className=" game-inputs">
                <input type="text" className="player-name" placeholder="TYPE YOUR NAME" ref={nameInputRef} name="playerName" onChange={handleInputChange} value={playerName}  />
                <DifficutyLevel handleChange={handleDifficultyChange} selectedLevel={difficultyLevel}  />
                {errorMesage()}
                <div className="  start-game" onClick={startGame}>
                    <FaPlay color="#ff5155" className="play-icon" size="46px" />
                    <h3 className="play-game">START GAME</h3>
                </div>
            </div>
        </div>
    )
}

StartPage.propTypes = {
    enterInGame : propTypes.func.isRequired
}

StartPage.defaultProps = {
    enterInGame : () => {}
}