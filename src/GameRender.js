import React from 'react'

export default function GameRender({initWeapon, canChoose, canDraw, playMatch, playerOne, playerTwo, matchResults, choices}){    
    
    const buildChoicesButtons = (key) => {        
            let url = '/' + key + '_button.png'
            return(
                <input type='image' src={process.env.PUBLIC_URL + url} name={key} onClick={initWeapon} disabled={canChoose()}/>
            )
    }

    const resultImage = () => {

        if(matchResults.tie){
            return(
                <>
                <img className= 'tie1' src={process.env.PUBLIC_URL + '/' + matchResults.tie + '_button.png'}/>                    
                <img className= 'tie2 mirror' src={process.env.PUBLIC_URL + '/' + matchResults.tie + '_button.png'}/>
                </>  
            )
        }
        
        if (matchResults.winer.name === playerOne.name){
            return(
                <>
                <img className='winner' src={process.env.PUBLIC_URL + '/' + matchResults.winer.weapon + '_button.png'}/>                    
                <img className='loser' src={process.env.PUBLIC_URL + '/' + matchResults.loser.weapon + '_button.png'}/>
                </>
            )
        }else if(matchResults.winer.name === playerTwo.name){
            return(
                <>
                <img className='loser' src={process.env.PUBLIC_URL + '/' + matchResults.loser.weapon + '_button.png'}/>
                <img className='winner mirror' src={process.env.PUBLIC_URL + '/' + matchResults.winer.weapon + '_button.png'}/>                    
                </>
            )
        }      
    }

    return(
        <>       
        <div className="container text-center">
            <h1>{playerOne.name} VS {playerTwo.name}</h1>
            <small>Choose and draw!</small>
            <hr/>            
            <div>
                {Object.keys(choices).map(key => buildChoicesButtons(key))}
            </div>
            <div>
                {!playerOne.weapon && <h3>{playerOne.name}'s turn...</h3> 
                || !playerTwo.weapon && <h3>{playerTwo.name}'s turn...</h3>
                }                
            </div>
            <hr/>
            <div>                
                <button class="btn btn-success" onClick={playMatch} disabled={canDraw()}>Draw!</button>
            </div>            
            <hr/>
            <div>
                <h4>{playerOne.name}: {playerOne.wins}</h4>
                <h4>{playerTwo.name}: {playerTwo.wins}</h4>                                
            </div>
            {   matchResults.winer && 
                <>                
                
                <div>                   
                    {resultImage()}
                    <hr/>
                    <h3>{matchResults.winer.name} wins this match.</h3> 
                    <h5>{choices[matchResults.winer.weapon].name} defeats {choices[matchResults.loser.weapon].name}</h5>
                </div>
                </>
            }
            {   matchResults.tie &&
                <>
                {resultImage()}             
                <hr/>
                <div>
                    <h3>Round tied!</h3>
                </div>
                </>
            }            
        </div>
        </>
    )

}