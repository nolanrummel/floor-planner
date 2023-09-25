import React, { useState } from "react"
import { NavLink } from "react-router-dom"

//local imports
import "../styling/navbar.css"

function Navbar() {
    const [titleHover, setTitleHover] = useState(false)
    return (
    <nav className="navbar"
        onMouseEnter={() => setTitleHover(true)}
        onMouseLeave={() => setTitleHover(false)}>
        <div className="nav-left-side">
            <div className="title-lockup">
                <h2 className="fl">Fl</h2>
                <h2 className="oo">OO</h2>
                <h2 className="r">R</h2>
                <h2 className="pla">PlA</h2>
                <h2 className="nn">NN</h2>
                <h2 className="er">ER</h2>
            </div>
            <h2 className="title-slashes">//</h2>
            <div className="link-container">
                <NavLink className='nav-link' to="/home"><h4>Home</h4></NavLink>
                <NavLink className='nav-link' to="/floorplan"><h4>Draft</h4></NavLink>
                <NavLink className='nav-link' to="/blueprints"><h4>Blueprints</h4></NavLink>
            </div>
        </div>
    </nav>
    )
}

export default Navbar