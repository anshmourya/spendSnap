import React from 'react'
import { Button } from './components/ui/button'
import NavBar from './components/navbar'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
Chart.register(CategoryScale);
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        {/* <Route path='/login' element={ <Logi/>} /> */}
        {/* <Route path='/' element={ <Home/>} /> */}
      </Routes>
      <ToastContainer />
    </>

  )
}

export default App