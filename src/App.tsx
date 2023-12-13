import React from 'react'
import { Button } from './components/ui/button'
import NavBar from './components/navbar'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/home'
import Dashboard from './pages/dashboard'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Home/>} />
        <Route path='/dashboard' element={ <Dashboard/>} />
        {/* <Route path='/login' element={ <Logi/>} /> */}
        {/* <Route path='/' element={ <Home/>} /> */}
     </Routes>
    </>
  
  )
}

export default App