import React, { useState } from 'react';
import {RiArrowDropDownFill} from 'react-icons/ri';


export default function DifficultyLevel({handleChange,selectedLevel}){
    const [isListOpen, setIsListOpen] = useState(false);
    
    const toggleList = () =>{
        setIsListOpen(!isListOpen);
    }

 return(
    <div className="dropDown-wrapper">
      <button type="button" className="dropdown-header" onClick={toggleList}>
        <div className="dropdown-header-title">{selectedLevel}</div>
        <RiArrowDropDownFill size="32px" color="white"/>
      </button>
      {isListOpen && (
        <button className="dropdown-options-list">
            <div role="list"className="dropdown-list" onClick={() => {handleChange("EASY"); toggleList();}} >EASY</div>
            <div role="list"className="dropdown-list" onClick={() => {handleChange("MEDIUM"); toggleList();}}>MEDIUM</div>
            <div role="list"className="dropdown-list" onClick={() => {handleChange("DIFFICULT"); toggleList();}} >DIFFICULT</div>
        </button>
      )}
    </div>
 )   
}