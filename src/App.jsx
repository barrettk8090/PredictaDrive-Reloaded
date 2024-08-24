import { useState } from 'react'
// import Moralis from 'moralis'
import './App.css'
import Home from './components/Home'
import RentalForm from './components/RentalForm'

function App() {
//   const Moralis = require("moralis").default;

//   async function startMoralis(){
//     await Moralist.start({
//       apiKey: import.meta.env.VITE_MORALIS_API_KEY
//     })
//     console.log(Moralis)
// }

// startMoralis();




  return (
    <>
      <div>
        <Home/>
        <RentalForm/>
      </div>
    </>
  )
}

export default App
