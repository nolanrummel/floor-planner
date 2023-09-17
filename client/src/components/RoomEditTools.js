import React, { useState } from "react"

//local imports
import WallCreator from "./WallCreator"
import "../styling/room-editor.css"

function RoomEditTools(
        {
            room,
            handleResize,
            isEditing,
            setIsEditing,
            isHovering,
            isDragging,
            setIsDragging,
            isScaling,
            setIsScaling
        }
    ) {

    const [initialDimensions, setInitialDimensions] = useState({ width: 0, height: 0, x: 0, y: 0 })
    const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 })
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const [hoveringArrows, setHoveringArrows] = useState('')
    const [scaleDirection, setScaleDirection] = useState('')
    const [deleteInterface, setDeleteInterface] = useState(false)

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setDragOffset({
            x: e.clientX - room.x,
            y: e.clientY - room.y
        })
    }

    const handleScaleSide = (e, direction) => {
        setIsScaling(true)
        setScaleDirection(direction)

        setInitialMousePosition({
            x: e.clientX,
            y: e.clientY
        })
    
        setInitialDimensions({
            width: room.width,
            height: room.height,
            x: room.x,
            y: room.y
        })
    }

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newLeft = e.clientX - dragOffset.x
            const newTop = e.clientY - dragOffset.y
            handleResize(room.id, { x: newLeft, y: newTop })
        } else if (isScaling) {
            const deltaX = e.clientX - initialMousePosition.x
            const deltaY = e.clientY - initialMousePosition.y

            const topHeight = initialDimensions.height - deltaY
            const leftWidth = initialDimensions.width - deltaX
            const rightWidth = initialDimensions.width + deltaX
            const bottomHeight = initialDimensions.height + deltaY

            if (scaleDirection === 'top') {
                handleResize(room.id, { height: topHeight, y: deltaY - room.y })
            } else if (scaleDirection === 'left') {
                handleResize(room.id, { width: leftWidth, x: deltaX - room.x })
            } else if (scaleDirection === 'right') {
                handleResize(room.id, { width: rightWidth, x: deltaX - room.x })
            } else if (scaleDirection === 'bottom') {
                handleResize(room.id, { height: bottomHeight, y: deltaY - room.y })
            } else if (scaleDirection === 'top left') {
                handleResize(room.id, { height: topHeight, y: deltaY - room.y,
                    width: leftWidth, x: deltaX - room.x })
            } else if (scaleDirection === 'top right') {
                handleResize(room.id, { height: topHeight, y: deltaY - room.y,
                    width: rightWidth, x: deltaX - room.x })
            } else if (scaleDirection === 'bottom left') {
                handleResize(room.id, { height: bottomHeight, y: deltaY - room.y,
                    width: leftWidth, x: deltaX - room.x })
            } else if (scaleDirection === 'bottom right') {
                handleResize(room.id, { height: bottomHeight, y: deltaY - room.y,
                    width: rightWidth, x: deltaX - room.x })
            }
        }
    }

    const handleDelete = (e) => {
        console.log('delete the room')
    }

    return (
        <div>
            {isHovering ?
                <div style={ isDragging ?
                        { padding: '500px', height: room.height, width: room.width }
                        :
                        { height: room.height, width: room.width }
                    }
                    onMouseMove={handleMouseMove}
                    >
                    <div className="arrows-top-row">
                        <div className="scale-top-left">
                            <div className="scale-top-left-control"
                                onMouseDown={(e) => handleScaleSide(e, 'top left')}
                                onMouseEnter={() => {setHoveringArrows('top left')}}
                                onMouseLeave={() => {setHoveringArrows('')}}>
                                    <h3 className="up-left-arrow">〈</h3>
                            </div>
                        </div>
                        <div className="top-arrow-lockup">
                            <div className="top-spacer"></div>
                            <div className="up-arrow-container"
                                onMouseDown={(e) => handleScaleSide(e, 'top')}>
                                    {hoveringArrows.includes('top') ?
                                        <h3 className="up-arrow-active">〈</h3>
                                        :
                                        <h3 className="up-arrow">〈</h3>
                                    }
                            </div>
                        </div>
                        <div className="scale-top-right">
                            <div className="scale-top-right-control"
                                onMouseDown={(e) => handleScaleSide(e, 'top right')}
                                onMouseEnter={() => {setHoveringArrows('top right')}}
                                onMouseLeave={() => {setHoveringArrows('')}}>
                                    <h3 className="up-right-arrow">〈</h3>
                            </div>
                        </div>
                    </div>
                    <div className="arrows-middle-row">
                        <div className="left-arrow-lockup">
                            <div className="left-spacer"></div>
                            <div className="left-arrow-container"
                                onMouseDown={(e) => handleScaleSide(e, 'left')}>
                                    {hoveringArrows.includes('left') ?
                                        <h3 className="left-arrow-active">〈</h3>
                                        :
                                        <h3 className="left-arrow">〈</h3>
                                    }
                            </div>
                        </div>
                        <div className="arrows-center-center">
                            {isEditing ?
                                <div>
                                    <WallCreator setIsEditing={setIsEditing}/>
                                </div>
                                :
                                (deleteInterface ?
                                    <div>
                                        <p>Are You Sure?</p>
                                        <div>
                                            <button onClick={handleDelete}>Yes</button>
                                            <button onClick={() => setDeleteInterface(false)}>No</button>
                                        </div>
                                    </div>
                                    :
                                    <div className="center-buttons-lockup">
                                        <div className="move-arrow"
                                            onMouseDown={handleMouseDown}
                                            >move
                                        </div>
                                        <div onClick={() => setIsEditing(room.id)}>wall</div>
                                        <div onClick={() => setDeleteInterface(true)}>delete</div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="right-arrow-lockup">
                            <div className="right-arrow-container"
                                onMouseDown={(e) => handleScaleSide(e, 'right')}>
                                    {hoveringArrows.includes('right') ?
                                        <h3 className="right-arrow-active">〈</h3>
                                        :
                                        <h3 className="right-arrow">〈</h3>
                                    }
                            </div>
                            <div className="right-spacer"></div>
                        </div>
                    </div>
                    <div className="arrows-bottom-row">
                        <div className="scale-bottom-left">
                            <div className="scale-bottom-left-control"
                                onMouseDown={(e) => handleScaleSide(e, 'bottom left')}
                                onMouseEnter={() => {setHoveringArrows('bottom left')}}
                                onMouseLeave={() => {setHoveringArrows('')}}>
                                    <h3 className="down-left-arrow">〈</h3>
                            </div>
                        </div>
                        <div className="bottom-arrow-lockup">
                            <div className="down-arrow-container"
                                onMouseDown={(e) => handleScaleSide(e, 'bottom')}>
                                    {hoveringArrows.includes('bottom') ?
                                        <h3 className="down-arrow-active">〈</h3>
                                        :
                                        <h3 className="down-arrow">〈</h3>
                                    }
                            </div>
                            <div className="bottom-spacer"></div>
                        </div>
                        <div className="scale-bottom-right">
                            <div className="scale-bottom-right-control"
                                onMouseDown={(e) => handleScaleSide(e, 'bottom right')}
                                onMouseEnter={() => {setHoveringArrows('bottom right')}}
                                onMouseLeave={() => {setHoveringArrows('')}}>
                                    <h3 className="down-right-arrow">〈</h3>
                            </div>
                        </div>
                    </div>
                </div>
                :
                ''
            }
        </div>
    )
}

export default RoomEditTools