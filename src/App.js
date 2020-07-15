import React from 'react'
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom'
import Landing from './Landing'
import Game from './Game'

export default function App(){

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Landing}/>
                <Route exact path='/game' component={Game}/>
            </Switch>
        </BrowserRouter>
    )
}