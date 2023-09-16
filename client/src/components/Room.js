import React, { useState } from "react"

//local imports
import RoomEditTools from "./RoomEditTools"
import "../styling/room-editor.css"

const Room = ({ room, handleResize, isEditing, setIsEditing }) => {
    const [isHovering, setIsHovering] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [isScaling, setIsScaling] = useState(false)
    
    const handleMouseUp = () => {
        setIsDragging(false)
        setIsScaling(false)
        if (isScaling) {
            handleResize(room.id, { x: 0, y: 0 })
        }
    }

    return (
        // <div className="room-container">
            <div className="room"
                style={{
                    width: room.width,
                    height: room.height,
                    left: room.x,
                    top: room.y,
                }}
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
                onMouseUp={handleMouseUp}
            >
                {isEditing === '' ?
                    <RoomEditTools
                        room={room}
                        handleResize={handleResize}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        isHovering={isHovering}
                        isDragging={isDragging}
                        setIsDragging={setIsDragging}
                        isScaling={isScaling}
                        setIsScaling={setIsScaling}
                    />
                    :
                    (isEditing === room.id ?
                        <RoomEditTools
                            room={room}
                            handleResize={handleResize}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            isHovering={isHovering}
                            isDragging={isDragging}
                            setIsDragging={setIsDragging}
                            isScaling={isScaling}
                            setIsScaling={setIsScaling}
                        />
                        :
                        ''
                    )
                }
            </div>
        // </div>
    )
}

export default Room