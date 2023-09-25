import React, { useState } from "react"

//local imports
import Room from "./DevRoom"
// import "../old-style/dev-floor-plan.css"

function FloorPlan() {
    const [isEditing, setIsEditing] = useState('')
    const foot = (window.innerWidth * 1.20) / 40
    const [rooms, setRooms] = useState([
        {
            id: 1,
            x: 0,
            y: 0,
            width: foot * 10,
            height: foot * 8
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