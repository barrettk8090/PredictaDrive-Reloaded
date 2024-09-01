import { useState } from 'react'
// import Moralis from 'moralis'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home'

function App() {




return (
  <>
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home}/>
      </Routes>
    </BrowserRouter>
    </div>
  </>
)
}

export default App
