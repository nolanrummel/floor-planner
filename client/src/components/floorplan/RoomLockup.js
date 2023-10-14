import React, { useState } from "react"

//local imports
import EditOptions from "./EditOptions"
import RoomSVG from "./RoomSVG"
import "../../styling/room.css"

//container component, handles hovering and user interactions
function RoomLockup({ room, isEditing, setIsEditing, mouseEvent, click }) {
  const [anchors, setAnchors] = useState([])
  //what form of editing is taking place (add, edit, delete, etc)
  const [editState, setEditState] = useState('')
  //is or isn't hovering on room
  const [isHovering, setisHovering] = useState(false)
  
  return (
    <div
      className="room-lockup"
      onMouseEnter={() => setisHovering(true)}
      onMouseLeave={() => setisHovering(false)}
    >
      <RoomSVG 
        anchors={anchors} 
        room={room} 
        isEditing={isEditing} 
        editState={editState}
        mouseEvent={mouseEvent}
        click={click}
      />
      <EditOptions
        room={room} 
        isEditing={isEditing} 
        setIsEditing={setIsEditing} 
        setEditState={setEditState} 
        isHovering={isHovering}
      />
    </div>
  )
}

export default RoomLockup