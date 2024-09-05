import logo from "../assets/Logo.png"

export default function Header(){

    return(
        <div className="header">
            <img className="logo" src={logo}/>
            {/* <h1>PredictaDrive</h1> */}
            <h2>Using DIMO</h2>
        </div>
    )
}