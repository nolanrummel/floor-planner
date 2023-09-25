import React, { useState } from "react"

//local imports
import Room from "./Room"
import "../styling/floor-plan.css"

function FloorPlan() {    
    const [rooms, setRooms] = useState([createRoom(1)])
    const [isEditing, setIsEditing] = useState(false)

    function createRoom(id) {
        const foot = (window.innerWidth * 1.20) / 40
        return {
            id,
            x: 0,
            y: 0,
            width: foot * 10,
            height: foot * 8
        }
      }

      const addRoom = () => {
        const newRoom = createRoom(rooms.length + 1)
        setRooms([...rooms, newRoom])
      }

    return (
        <div className="floorplan-container">
            {rooms.map((room) => (
                <Room 
                    key={room.id}
                    room={room}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                />
            ))}
            <div className="add-room-plus" onClick={addRoom}><h3>Add Room +</h3></div>
        </div>
    )
}

export default FloorPlan