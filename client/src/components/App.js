import React, { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "../context/user"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

//local imports
import Navbar from "./Navbar"
import Home from "./Home"
import FloorPlan from "./FloorPlan"
import NotFound from "./NotFound"

function App() {
  //sets logged in user info
  const { setUser } = useContext(UserContext)
  const divRef = useRef(null)

  const [cellSize, setCellSize] = useState({})
  const [arrayLength, setArrayLength] = useState(1000)

  //checks if user is logged in
  useEffect(() => {
    fetch('/check_session')
    .then(r => {
      if (r.ok) {
        r.json().then(userObj => setUser(userObj))
      }
    })
  }, [setUser])

  const handleResize = () => {
    const cellWidth = (window.innerWidth * 1.20) / 40
    const arrayNum = Math.ceil((window.innerHeight * 1.20) / cellWidth)
    window.requestAnimationFrame(() => {
      setCellSize(cellWidth)
      setArrayLength(arrayNum * 40)
    })
  }
  
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
        window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Router>
      <div className="app-container">
        <div>
          <Navbar />
        </div>
        <div className="navbar-spacer"></div>
        <div className="content-container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/floorplan">
              <FloorPlan />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
        <div className="grid-container"
          style={
            { 
            gridTemplateRows: `repeat(auto-fill, minmax(${cellSize}px, 1fr))`
            }
          }
        >
          {Array.from({ length: arrayLength }, (_, index) => (
            <div key={index} className="grid-cell"></div>
          ))}
        </div>
      </div>
    </Router>
  )
}

export default App