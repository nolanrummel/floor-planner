import React, { useState } from "react"

//local imports
import RoomLockup from "./RoomLockup"
import "../../styling/floor-plan.css"

function FloorPlan() {    
    const [rooms, setRooms] = useState([createRoom(1)])
    const [isEditing, setIsEditing] = useState(false)
    const [mouseEvent, setMouseEvent] = useState({})
    const [click, setClick] = useState(0)

    //hoisted to keep all states organized at top of code
    //before initialized in setRooms
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

    const handleAddPoint = () => {
        setClick(click + 1)
    }

    return (
        <div className="floorplan-container" onMouseMove={(e) => setMouseEvent(e)} onClick={handleAddPoint}>
            {rooms.map((room) => (
                // <Room 
                //     key={room.id}
                //     room={room}
                //     isEditing={isEditing}
                //     setIsEditing={setIsEditing}
                // />
                <RoomLockup 
                    key={room.id} 
                    room={room}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    mouseEvent={mouseEvent}
                    click={click}
                />
            ))}
            <div className="add-room-plus" onClick={addRoom}><h3>Add Room +</h3></div>
        </div>
    )
}

export default FloorPlan