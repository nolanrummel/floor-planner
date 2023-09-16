import React, { useContext, useEffect } from "react"
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

  //checks if user is logged in
  useEffect(() => {
    fetch('/check_session')
    .then(r => {
      if (r.ok) {
        r.json().then(userObj => setUser(userObj))
      }
    })
  }, [setUser])

  return (
    <Router>
      <div className="app-container">
        <div>
          <Navbar />
        </div>
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
      </div>
    </Router>
  )
}

export default App