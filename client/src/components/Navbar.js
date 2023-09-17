import React from "react"
import { NavLink } from "react-router-dom"

//local imports
import "../styling/navbar.css"

function Navbar() {
    return (
    <nav className="navbar">
        <div className="nav-left-side">
            <h2 className="title">floor planner</h2>
            <h2 className="title-slashes">//</h2>
            <NavLink className='nav-link' to="/home"><h4>Home</h4></NavLink>
            <NavLink className='nav-link' to="/floorplan"><h4>Draft</h4></NavLink>
            <NavLink className='nav-link' to="/blueprints"><h4>Blueprints</h4></NavLink>
        </div>
    </nav>
    )
}

export default Navbar