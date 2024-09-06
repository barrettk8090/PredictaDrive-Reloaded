import logo from "../assets/Logo.png"

export default function Header(){

    return(
        <div className="header">
            <a href="/">
                <img className="logo" src={logo}/>
            </a>
            {/* <h1>PredictaDrive</h1> */}
            {/* <h2>Using DIMO</h2> */}
        </div>
    )
}