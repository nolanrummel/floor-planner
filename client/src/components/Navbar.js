import React from "react"
import { NavLink } from "react-router-dom"

function Navbar() {
    return (
    <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/floorplan">FloorPlan</NavLink>
    </nav>
    )
}

export default Navbar