import React, { useState, useEffect, useRef } from "react"

//local imports
import Anchors from "./Anchors"
import GhostAnchor from "./GhostAnchor"
import "../../styling/room.css"

//renders the room svg and anchors if editing qualifications true
function RoomSVG({ anchors, room, isEditing, editState, mouseEvent, click }) {
  //gets svg info
  const svgRef = useRef(null)
  //gets path info on the svg
  const pathRef = useRef(null)
  //path of svg - set originally to room div dimensions
  const [path, setPath] = useState(`M0 0 L${room.width} 0 L${room.width} ${room.height} L0 ${room.height} Z`)

  //horiz or vert and the two indexes in anchors
  const [ghostLine, setGhostLine] = useState({})
  //sets location of lowered opacity anchor when adding points
  const [ghostLocation, setGhostLocation] = useState({index: 1, top: -13, left: -13})

  //sets anchors to {x and y coords} of svg path removing extra string info
  useEffect(() => {
    //path string from pathRef
    const currentPath = pathRef.current.getAttribute('d')
    //split into indiv anchors
    const anchorData = currentPath.split(' ')

    //loops thru group of indiv anchors
    for (let i = 0; i < anchorData.length; i++) {
      const anchor = anchorData[i]
      //handles difference btwn starting and middle path coords
      if (anchor.includes('M') || anchor.includes('L')) {
        const x = anchorData[i].slice(1)
        const y = anchorData[i + 1]

        //adds coords to anchors object without extra string info
        anchors.push({ x, y })
      }
    }
  }, [])

  //formats path of svg to include extra string info and format the order correctly
  const pathFormatter = (anchorGroup) => {
    const pathString = anchorGroup.reduce((acc, coord, index) => {
      const { x, y } = coord
      //handles the first anchor point in the path
      if (index === 0) {
        return `M${x} ${y}`
      } else {
        return `${acc} L${x} ${y}`
      }
    }, '')
    //adds Z to end of string to complete the svg path
    setPath(`${pathString} Z`)
  }

  const addToPath = (newAnchor) => {
    //checks if newAnchor already exists at a current coord
    const existingAnchor = anchors.some(obj => obj.x === newAnchor.x && obj.y === newAnchor.y)

    if (!existingAnchor) {
      //handles case of last anchor
      if (ghostLine.indexes[0] == anchors.length - 1 || ghostLine.indexes[ghostLine.indexes.length - 1] == anchors.length - 1) {
        //adds new anchor to end rather than splicing
        anchors.push(newAnchor)
        pathFormatter(anchors)
      } else {
        //adds newAnchor to anchors
        anchors.splice(ghostLocation.index + 1, 0, newAnchor)
        //re-formats anchors into svg path
        pathFormatter(anchors)
      }
    }

    //include a filter to remove repeating anchors at the end of new function
    console.log(anchors)
  }

  //adds points to svg path, renders on click
  useEffect(() => {
    //handles horizontal lines
    if (ghostLine.direction === 'horiz') {
      //new anchor with ghost anchor's location info
      const newAnchor = {
        //centers new anchor to mouse location (radius of circle div)
        x: parseFloat(ghostLocation.left) + 13,
        y: anchors[ghostLocation.index].y
      }

      addToPath(newAnchor) 
    } //handles vertical lines
    else if (ghostLine.direction === 'vert') {
      const newAnchor = {
        x: anchors[ghostLocation.index].x,
        y: parseFloat(ghostLocation.top) + 13
      }

      addToPath(newAnchor)
    }
    //resets the ghost line info
    setGhostLine({})
  }, [click])

  return (
    <div>
      <svg
        className={isEditing ? (isEditing === room.id ? "active-room" : "inactive-room") : "active-room"}
        width={room.width}
        height={room.height}
        ref={svgRef}
        // onClick={handleAddPoint}
      >
        <path
          ref={pathRef}
          d={path}
        />
        {isEditing === room.id ? 
          <Anchors 
            anchors={anchors} 
            editState={editState} 
            pathFormatter={pathFormatter} 
          />
          : null
        }
      </svg>
      {editState === 'add-points' ?
        <GhostAnchor
          ghostLocation={ghostLocation}
          setGhostLocation={setGhostLocation}
          setGhostLine={setGhostLine}
          anchors={anchors} 
          mouseEvent={mouseEvent} 
          svgRef={svgRef} 
        />
      : null}
    </div>
  )
}

export default RoomSVG