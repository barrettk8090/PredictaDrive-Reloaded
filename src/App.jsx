import { useState } from 'react'
// import Moralis from 'moralis'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home'
import DriverDetails from "./components/DriverDetails"

function App() {




return (
  <>
    <div>
    <Header/>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/driver-details" Component={DriverDetails}/>
      </Routes>
    </BrowserRouter>
    </div>
  </>
)
}

export default App
