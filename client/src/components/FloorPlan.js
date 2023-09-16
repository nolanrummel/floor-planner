import React, { useState } from "react"

//local imports
import Room from "./Room"
import "../styling/floor-plan.css"

function FloorPlan() {
    const [isEditing, setIsEditing] = useState('')
    const [rooms, setRooms] = useState([
        {
            id: 1,
            x: 0,
            y: 0,
            width: 300,
            height: 300
        }
    ])

    const handleResize = (id, newDimensions) => {
        const updatedRooms = rooms.map((room) => room.id === id ?
            {...room, ...newDimensions}
            :
            room
        )
        setRooms(updatedRooms)
    }

    const addRoom = () => {
        setRooms([...rooms, {
            id: rooms.length + 1,
            x: 0,
            y: 0,
            width: 300,
            height: 300
        }])
    }

    return (
        <div className="floorplan-container">
            <div className="floorplan">
                {/* <div className="room-container"> */}
                    {rooms.map((room) => (
                        <Room key={room.id}
                            room={room}
                            handleResize={handleResize}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}/>
                    ))}
                {/* </div> */}
                <div className="add-room-plus" onClick={addRoom}><h3>Add Room +</h3></div>
            </div>
        </div>
    )
}

export default FloorPlan