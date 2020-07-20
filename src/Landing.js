import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {

    const [playerOneNick, setplayerOneNick] = useState('')
    const [playerTwoNick, setplayerTwoNick] = useState('')

    const handleChange = event => {
        if (event.target.name === 'playerOneNick'){
            setplayerOneNick(event.target.value)
        } else{
            setplayerTwoNick(event.target.value)
        }
    }

    const canPlaySolo = () => {
        return (playerOneNick.length > 0 && playerTwoNick.length === 0)
    }

    const canPlayVS = () => {
        return (playerOneNick.length > 0 && playerTwoNick.length > 0)
    }

    return(
        <>
        <div className='container-fluid text-center'>
            <h1>Enter a nick</h1>
            <p>One for solo mode, two for VS mode</p>
            <input className='form-control-lg' type='text' name='playerOneNick' onChange={handleChange} placeholder='player one nick...'/>
            <input className='form-control-lg' type='text' name='playerTwoNick' onChange={handleChange} placeholder='player two nick...'/>
            <hr/>
            {canPlaySolo() && 
                <div>
                    <Link to={{pathname: '/game', state: {playerOneNick: playerOneNick, playerTwoNick: 'CPU', solo: true}}} className="btn btn-success">Play Solo</Link>
                </div>}
            {canPlayVS() && 
                <div>
                    <Link to={{pathname: '/game', state: {playerOneNick: playerOneNick, playerTwoNick: playerTwoNick, solo: false}}} className="btn btn-success">Play VS</Link>
                </div>}
        </div>
        {/* <div className='container text-center'>
            <img src={process.env.PUBLIC_URL + 'logo.png'}/>
        </div> */}
        </>
    )
}

export default Landing