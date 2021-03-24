import React,{useEffect, useRef, useState} from 'react';
import propTypes from 'prop-types';
import Header from './StartPageHeader';
import {FaPlay} from 'react-icons/fa'
import DifficutyLevel from './DifficultyLevel';
import GamePage from '../GamePageComponents/GamePage';
import './startComponentStyle.css';



export default function StartPage({enterInGame,fromEndGamePage}){
    const [playerName, setPlayerName] = useState(sessionStorage.getItem('playerName') !== null ? sessionStorage.getItem('playerName') : '');
    const [difficultyLevel, setDifficultyLevel] = useState('EASY')
    const [errorMsg, setErrorMsg] = useState('');
    const nameInputRef = useRef(null);
    const [endGameFlag,setEndGameFlag] = useState(false);
    const [playerExist, setPlayerExist] = useState(false);

    const handleInputChange = (event) =>{
        event.persist();
        setPlayerName(event.target.value.toUpperCase());
        setErrorMsg('');
    }

    useEffect(() => {
        if(sessionStorage.getItem('playerName') !== null){
            setPlayerExist(true);
        }
        else{
            setPlayerExist(false);
        }
    },[playerExist])

    const handleDifficultyChange = (value) => {    
        setDifficultyLevel(value);
        setErrorMsg('');
    }

    const clearSession = () => {
        sessionStorage.removeItem('playerName');
        sessionStorage.removeItem('scoreBoardArr');
        setPlayerName('');
        setPlayerExist(false);
    }

    const startGame = (event) => {
        event.preventDefault();
        if(!playerExist && !playerName){
            setErrorMsg('Player Name Must be Specified');
            nameInputRef.current.focus();
        }
        else{
            sessionStorage.setItem('playerName',playerName);
            sessionStorage.setItem('gameLevel',difficultyLevel);
            if(fromEndGamePage){
                setEndGameFlag(true);
            }
            else{
                enterInGame(playerName, difficultyLevel);
            }
        }
        
    }

    const errorMesage = () =>{
        if(errorMsg){
            return(<div className="error">{errorMsg}</div>)
        }
    }

    if(endGameFlag){
        return(
            <GamePage playerName={playerName} gameLevel={difficultyLevel} />
        )
    }

    return(
        <div >
            <Header/>
            <div className=" game-inputs">
                {playerExist ? <div className='existing-player'><span className='welcome-note' >Hey {sessionStorage.getItem('playerName')}, Welcome Back</span><span className="steps-to-move">Please select the difficulty Level and start the game</span><span className="or">OR</span><span onClick={clearSession} className="clear-session">Click Here to start a new Session</span></div>:<input type="text" className="player-name" placeholder="TYPE YOUR NAME" ref={nameInputRef} name="playerName" onChange={handleInputChange} value={playerName}  />}
                
                {errorMesage()}
                <DifficutyLevel handleChange={handleDifficultyChange} selectedLevel={difficultyLevel}  />
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