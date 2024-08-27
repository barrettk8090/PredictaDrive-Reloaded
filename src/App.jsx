import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EASProvider from "./providers/eas-provider.js";
import Home from "./components/Home";
import Balances from "./components/Balances.jsx";
import ChooseHooman from "./components/ChooseHooman.jsx";

function App() {
  return (
    <>
      <div>
        <EASProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/balances" Component={Balances} />
              <Route path="/chooseHooman" Component={ChooseHooman} />
            </Routes>
          </BrowserRouter>
        </EASProvider>
      </div>
    </>
  );
}

export default App;
