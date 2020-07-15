import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {

    const [nick, setNick] = useState('')

    const handleChange = event => {
        setNick(event.target.value)    
    }

    return(
        <div>
            <input type='text' name='nick' onChange={handleChange} placeholder='nick'/>
            <Link to={{pathname: '/game', state: {nick: nick}}}>Play</Link>
        </div>
    )
}

export default Landing