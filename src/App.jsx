import { useState } from 'react'
// import Moralis from 'moralis'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home'
import Balances from './components/Balances.jsx'

function App() {




return (
  <>
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/balances" Component={Balances}/>
      </Routes>
    </BrowserRouter>
    </div>
  </>
)
}

export default App
