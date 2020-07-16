import React, { useState, useEffect } from 'react'
import './Game.css'
import { Link } from 'react-router-dom'


const Game = (props) => {
    
    const [playerOne, setPlayerOne] = useState({name: props.location.state.nick, wins: 0, weapon: undefined})
    const [playerTwo, setPlayerTwo] = useState({name: 'CPU', wins: 0, weapon: undefined})
    const [matchWinner, setMatchWinner] = useState(undefined)
    const [matchLoser, setMatchLoser] = useState(undefined)
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
                setMatchLoser(undefined)
            }else {

                if(choices[playerChoice].defeats.indexOf(computerChoice) > -1){
                    let prev = playerOne.wins + 1
                    setPlayerOne({...playerOne, wins: prev})
                    setMatchWinner(playerOne)
                    setMatchLoser(playerTwo)
                    setMatchTie(false)
                }    
                else{

                    let prev = playerTwo.wins + 1
                    setPlayerTwo({...playerTwo, wins: prev})
                    setMatchWinner(playerTwo)
                    setMatchLoser(playerOne)
                    setMatchTie(false)
                }
            }        
        }
    }

    const initWeapon = event => {
        let choicesArray = Object.keys(choices)
        setPlayerOne({...playerOne, weapon: event.target.name})
        setPlayerTwo({...playerTwo, weapon: choicesArray[Math.floor(Math.random() * choicesArray.length)]})        
    }
    
    return (
        <>       
        <div className="container text-center">
            
            <h1>Playing against the CPU</h1>
            <small>Choose and draw!</small>
            <hr/>
            <div className="btn-group btn-group-lg" role="group">
                <button class="btn btn-light" name='rock' onClick={initWeapon}>✊</button>
                <button class="btn btn-light" name='paper' onClick={initWeapon}>✋</button>
                <button class="btn btn-light" name='scissor' onClick={initWeapon}>✌️</button>
                <button class="btn btn-light" name='lizard' onClick={initWeapon}>🤏</button>
                <button class="btn btn-light" name='spock' onClick={initWeapon}>🖖</button>                
            </div>
            <hr/>
            <div>
                <button class="btn btn-success" onClick={playMatch}>Draw!</button>
            </div>
            <hr/>
            <div>
                <h4>{playerOne.name}: {playerOne.wins}</h4>
                <h4>{playerTwo.name}: {playerTwo.wins}</h4>                                
            </div>
            {   matchWinner && 
                <div>
                    <h5>{matchWinner.name} wins this match.</h5> 
                    <h5>{choices[matchWinner.weapon].name} defeats {choices[matchLoser.weapon].name}</h5>
                </div>
            }
            {   matchTie &&
                <div>
                    <h5>Round tied!</h5>
                </div>
            }
            
        </div>
        </>
    )
    
}

export default Game