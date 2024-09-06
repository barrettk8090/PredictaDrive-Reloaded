import logo from "../assets/Logo.png"

export default function Header(){

    return(
        <div className="header">
            <a href="/">
                <img className="logo" src={logo}/>
            </a>
        </div>
    )
}