import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {

    const [nick, setNick] = useState('')

    const handleChange = event => {
        setNick(event.target.value)    
    }

    const canPlay = () => {
        return nick.length > 0
    }

    return(
        <div className='container text-center'>
            <h1>Enter a nickname</h1>
            <input className='form-control-lg' type='text' name='nick' onChange={handleChange} placeholder='nickname...'/>
            <hr/>
            {canPlay() && 
            <div>
                <Link to={{pathname: '/game', state: {nick: nick}}} className="btn btn-success">Play</Link>
            </div>}
        </div>
    )
}

export default Landing