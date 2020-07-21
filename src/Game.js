import React, { useState, useEffect } from 'react'
import './Game.css'

import GameRender from './GameRender'
import { Link, useHistory } from 'react-router-dom'


const Game = (props) => {

    const history = useHistory()

    const [playerOne, setPlayerOne] = useState({name: undefined, wins: 0, weapon: undefined})
    const [playerTwo, setPlayerTwo] = useState({name: undefined, wins: 0, weapon: undefined})    
    const [matchResults, setMatchResults] = useState({winer: undefined, loser: undefined, tie: undefined})
    
    const [soloMode, setSoloMode] = useState(undefined)   

    const choices = {
        rock : {name: "Rock", defeats: ["scissor","lizard"]},
        paper: {name: "Paper", defeats: ["rock", "spock"]},
        scissor: {name: "Scissor", defeats: ["paper", "lizard"]},
        lizard: {name: "Lizard", defeats:["paper","spock"]},
        spock: {name: "Spock", defeats:["scissor","rock"]}
    }
    
    useEffect(() => {
        if (props.location.state !== undefined){
            setPlayerOne({...playerOne, name: props.location.state.playerOneNick})
            setPlayerTwo({...playerTwo, name: props.location.state.playerTwoNick})
            setSoloMode(props.location.state.solo)
        }else{
            history.push('/')
        }
    }, [])
    
    const playMatch = () => {

        let playerOneChoice = playerOne.weapon
        let playerTwoChoice = playerTwo.weapon        

        if (playerOneChoice !== undefined && playerTwoChoice !== undefined){

            if(playerOneChoice === playerTwoChoice){
                setMatchResults({winer: undefined, loser: undefined, tie: playerOne.weapon})
                setPlayerOne({...playerOne, weapon: undefined})
                setPlayerTwo({...playerTwo, weapon: undefined})
            }else {

                if(choices[playerOneChoice].defeats.indexOf(playerTwoChoice) > -1){
                    let prev = playerOne.wins + 1
                    setPlayerOne({...playerOne, wins: prev, weapon: undefined})
                    setPlayerTwo({...playerTwo, weapon: undefined})
                    setMatchResults({winer: playerOne, loser: playerTwo, tie: undefined})
                }    
                else{

                    let prev = playerTwo.wins + 1
                    setPlayerTwo({...playerTwo, wins: prev, weapon: undefined})
                    setPlayerOne({...playerOne, weapon: undefined})
                    setMatchResults({winer: playerTwo, loser: playerOne, tie: undefined})
                }
            }        
        }
    }


    
    const initWeapon = event => {
        //ONE PLAYER MODE
        if (soloMode){
            setPlayerOne({...playerOne, weapon: event.target.name})
            let choicesArray = Object.keys(choices)            
            setPlayerTwo({...playerTwo, weapon: choicesArray[Math.floor(Math.random() * choicesArray.length)]})
        }
        //TWO PLAYER MODE
        else{
            if (!playerOne.weapon){
                setPlayerOne({...playerOne, weapon: event.target.name})
            }else{
                setPlayerTwo({...playerTwo, weapon: event.target.name})
            }
        }                      
    }    

    const canDraw = () => {
        let playerOneChoice = playerOne.weapon
        let playerTwoChoice = playerTwo.weapon 
        return !(playerOneChoice !== undefined && playerTwoChoice !== undefined)
    }

    const canChoose = () => {
        let playerOneChoice = playerOne.weapon
        let playerTwoChoice = playerTwo.weapon
        return (playerOneChoice !== undefined && playerTwoChoice !== undefined)
    }   
    
    return (
        <>        
        <div className=' container-fluid text-right'>            
            <h1>Rock, Paper, Scissor, Lizard, Spock</h1>
        </div>
        <div className='text-center'>
            <Link to='/' className='btn btn-danger'>Back to home</Link>
        </div>
        <hr/>        

        <GameRender 
            initWeapon={initWeapon} 
            canChoose={canChoose} 
            canDraw={canDraw} 
            playMatch={playMatch} 
            playerOne={playerOne} 
            playerTwo={playerTwo} 
            matchResults={matchResults} 
            choices={choices}/>        
        
        </>

        
    )
    
}

export default Game