import React, { useState, useEffect, useRef } from "react"
import Draggable from "react-draggable"

//local imports
import "../styling/room.css"

function Room({ room, isEditing, setIsEditing }) {
    //add points, edit points, remove points, ''
    const [editState, setEditState] = useState('')

    const [isHovering, setisHovering] = useState(false)
    const [isConfirming, setIsConfirming] = useState(false)

    const [path, setPath] = useState(`M0 0 L${room.width} 0 L${room.width} ${room.height} L0 ${room.height} Z`)
    const [anchors, setAnchors] = useState([])
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const pathRef = useRef(null)
    
    useEffect(() => {
        const currentPath = pathRef.current.getAttribute('d')
        const anchorData = currentPath.split(' ')

        for (let i = 0; i < anchorData.length; i++) {
            const anchor = anchorData[i]
            if (anchor.includes('M') || anchor.includes('L')) {
                const x = anchorData[i].slice(1)
                const y = anchorData[i + 1]
                anchors.push({ x, y })
            }
        }
    }, [])

    const renderAnchors = () => {
        return anchors.map((anchor, index) => (
            <Draggable
                key={index}
                onDrag={(e, ui) => handleAnchorDrag(index, e, ui)}
                position={position}
            >
                <circle className="anchor-point"
                    cx={anchor.x}
                    cy={anchor.y}
                />
            </Draggable>
        ))
    }

    const handleAnchorDrag = (index, e, ui) => {
        anchors[index] = {
            x: parseFloat(anchors[index].x) + ui.deltaX,
            y: parseFloat(anchors[index].y) + ui.deltaY
        }
        pathFormatter(anchors)
    }
    
    const pathFormatter = (anchorGroup) => {
        const pathString = anchorGroup.reduce((acc, coord, index) => {
            const { x, y } = coord
            if (index === 0) {
              return `M${x} ${y}`
            } else {
              return `${acc} L${x} ${y}`
            }
        }, '')
        setPath(`${pathString} Z`)
    }

    const handleDelete = (id) => {
        console.log(`Delete Room ${room.id}`)
    }

    return (
        <div className="room-lockup"
            onMouseEnter={() => setisHovering(true)}
            onMouseLeave={() => setisHovering(false)}
        >
            <svg
                className={isEditing ? (isEditing === room.id ? "active-room" : "inactive-room") : "active-room"}
                width={room.width}
                height={room.height}
            >
                <path
                    ref={pathRef}
                    d={path}
                />
                {isEditing === room.id ?
                    renderAnchors()
                    :
                    ''
                }
            </svg>
            <div className="edit-options">
                {isEditing ? 
                    isEditing === room.id ?
                        <div>
                            <div>
                                <button>Add Points</button>
                                <button>Edit Points</button>
                                <button>Delete Points</button>
                            </div>
                            <button onClick={() => setIsEditing('')}>Stop Editing</button>
                        </div>
                        :
                        ''
                    :
                    isHovering ?
                        isConfirming ? 
                            <div>
                                <h3>Are You Sure?</h3>
                                <button onClick={() => handleDelete(room.id)}>Yes</button>
                                <button onClick={() => setIsConfirming(false)}>No</button>
                            </div>
                        :
                        (<div>
                            <button onClick={() => setIsEditing(room.id)}>
                                Edit this Room
                            </button>
                            <button onClick={() => setIsConfirming(true)}>
                                Delete this Room
                            </button>
                        </div>)
                    :
                    ('')
                }
            </div>
        </div>
    )
}

export default Room