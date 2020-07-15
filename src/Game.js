import React, { useState, useEffect } from 'react'

const Game = (props) => {
    
    const [playerOne, setPlayerOne] = useState({name: props.location.state.nick, wins: 0, weapon: undefined})
    const [playerTwo, setPlayerTwo] = useState({name: 'CPU', wins: 0, weapon: undefined})
    const [matchWinner, setMatchWinner] = useState(undefined)
    const [matchTie, setMatchTie] = useState(false)

    const choices = {
        rock : {name: "Rock", defeats: ["scissor","lizard"]},
        paper: {name: "Paper", defeats: ["rock", "spock"]},
        scissor: {name: "Scissor", defeats: ["paper", "lizard"]},
        lizard: {name: "Lizard", defeats:["paper","spock"]},
        spock: {name: "Spock", defeats:["scissor","rock"]}
    }  
    
    const playMatch = () => {

        let playerChoice = playerOne.weapon
        let computerChoice = playerTwo.weapon        

        if (playerChoice !== undefined && playerTwo !== undefined){

            if(playerChoice === computerChoice){
                setMatchTie(true)
                setMatchWinner(undefined)
            }else {

                if(choices[playerChoice].defeats.indexOf(computerChoice) > -1){
                    let prev = playerOne.wins + 1
                    setPlayerOne({...playerOne, wins: prev})
                    setMatchWinner(playerOne)
                    setMatchTie(false)
                }    
                else{

                    let prev = playerTwo.wins + 1
                    setPlayerTwo({...playerTwo, wins: prev})
                    setMatchWinner(playerTwo)
                    setMatchTie(false)
                }
            }        
        }
    }

    const initWeapon = event => {
        let choicesArray = Object.keys(choices)
        setPlayerOne({...playerOne, weapon: event.target.name})
        setPlayerTwo({...playerTwo, weapon: choicesArray[Math.floor(Math.random() * choicesArray.length)]})
        playMatch()
    }
    
    return (
        <div className="container text-center">
            <div>Welcome, {playerOne.name}</div>
            <div>
                <button name='rock' onClick={initWeapon}>✊</button>
                <button name='paper' onClick={initWeapon}>✋</button>
                <button name='scissor' onClick={initWeapon}>✌️</button>
                <button name='lizard' onClick={initWeapon}>🤏</button>
                <button name='spock' onClick={initWeapon}>🖖</button>
            </div>           
            <div>
                <p>Player: {playerOne.wins}</p>
                <p>CPU: {playerTwo.wins}</p>                
            </div>
            {   matchWinner && 
                <div>{matchWinner.name} wins this match</div>
            }
            {   matchTie &&
                <div>Round tied!</div>
            }
        </div>
    )
    
}

export default Game