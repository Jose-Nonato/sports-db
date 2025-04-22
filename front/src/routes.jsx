import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Leagues from './pages/Leagues.jsx'
import Teams from './pages/Teams.jsx'


const Routers = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Home/>} path='/' exact/>
                <Route element={<Leagues/>} path='/leagues/:id'/>
                <Route element={<Teams/>} path='/teams/:id'/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routers
