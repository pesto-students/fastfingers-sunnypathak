import data from '../data/dictionary.json';

const DIFFICULTY_FACTORS = {
    'EASY' : 1,
    'MEDIUM' : 1.5,
    'DIFFICULT' : 2
};

const WORDS_BY_LEVEL = {
    'EASY' : data.filter(word => word.length <= 4),
    'MEDIUM' : data.filter(word => (word.length >= 5 && word.length <= 8)),
    'DIFFICULT' : data.filter(word => word.length > 8)
}

export const getNewWords = (gameLevel) =>{
    const wordsArray = WORDS_BY_LEVEL[gameLevel];
    return wordsArray[Math.floor(Math.random() * wordsArray.length)].toUpperCase(); 
}

export const getTimerValue = (word,gameLevel) => {
    const difficultyFactor = DIFFICULTY_FACTORS[gameLevel];
    return Math.round(word.length/difficultyFactor) * 1000 ;
}

export const setDataInSession = (key,value) => {
    sessionStorage.setItem(key,value);
}

export const getDataFromSession = (key) => {
    return sessionStorage.getItem(key);
}

export const updateDifficultyFactor = (gameLevel) => {
    DIFFICULTY_FACTORS[gameLevel] += 0.01;
}
