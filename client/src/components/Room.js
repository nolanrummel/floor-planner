import React, { useState, useEffect, useRef } from "react"

// //local imports
// import Anchors from "./Anchors"
// import "../styling/room.css"

function Room({ room, isEditing, setIsEditing }) {
    //what form of editing is taking place (add, edit, delete, etc)
    // const [editState, setEditState] = useState('')

    // //is or isn't hovering on room
    // const [isHovering, setisHovering] = useState(false)
    // //confirm delete of room
    // const [isConfirming, setIsConfirming] = useState(false)

    // //path of svg - set originally to room div dimensions
    // const [path, setPath] = useState(`M0 0 L${room.width} 0 L${room.width} ${room.height} L0 ${room.height} Z`)
    //anchors of path in svg without extra string info (M, Ls, Z) just {x, y}
    // const [anchors] = useState([])

    // //horiz or vert and the two indexes in anchors
    // const [ghostLine, setGhostLine] = useState({})
    // //sets location of lowered opacity anchor when adding points
    // const [ghostLocation, setGhostLocation] = useState({index: 1, top: -13, left: -13})

    // //gets info on the svg
    // const pathRef = useRef(null)
    
    // //sets anchors to {x and y coords} of svg path removing extra string info
    // useEffect(() => {
    //     //path string from pathRef
    //     const currentPath = pathRef.current.getAttribute('d')
    //     //split into indiv anchors
    //     const anchorData = currentPath.split(' ')

    //     //loops thru group of indiv anchors
    //     for (let i = 0; i < anchorData.length; i++) {
    //         const anchor = anchorData[i]
    //         //handles difference btwn starting and middle path coords
    //         if (anchor.includes('M') || anchor.includes('L')) {
    //             const x = anchorData[i].slice(1)
    //             const y = anchorData[i + 1]

    //             //adds coords to anchors object without extra string info
    //             anchors.push({ x, y })
    //         }
    //     }
    // }, [])
    
    // //formats path of svg to include extra string info and format the order correctly
    // const pathFormatter = (anchorGroup) => {
    //     const pathString = anchorGroup.reduce((acc, coord, index) => {
    //         const { x, y } = coord
    //         //handles the first anchor point in the path
    //         if (index === 0) {
    //           return `M${x} ${y}`
    //         } else {
    //           return `${acc} L${x} ${y}`
    //         }
    //     }, '')
    //     //adds Z to end of string to complete the svg path
    //     setPath(`${pathString} Z`)
    // }

    // //handles deleting the entire room (IN PROGRESS)
    // const handleDelete = (id) => {
    //     console.log(`Delete Room ${room.id}`)
    // }

    // //unique X and Y values in anchors
    // const uniqueNumbersX = Array.from(new Set(anchors.map(obj => parseFloat(obj.x))))
    // const uniqueNumbersY = Array.from(new Set(anchors.map(obj => parseFloat(obj.y))))
    
    // //checks if unique number occurs multiple times in anchors x value
    // //if it does, it means it's a corner or anchor. If not, it's a point on a line
    // const countX = {}
    // anchors.forEach(anchor => {
    //     //converts anchor x value to number if it's not already
    //     const xValue = parseFloat(anchor.x)
    //     if (uniqueNumbersX.includes(xValue)) {
    //         countX[xValue] = (countX[xValue] || 0) + 1
    //     }
    // })
    // //filter numbers that occur multiple times (x)
    // const linesX = Object.keys(countX).filter(key => countX[key] > 1)

    // //does the same for the anchors y value
    // const countY = {}
    // anchors.forEach(anchor => {
    //     const yValue = parseFloat(anchor.y)
    //     if (uniqueNumbersY.includes(yValue)) {
    //         countY[yValue] = (countY[yValue] || 0) + 1
    //     }
    // })
    // const linesY = Object.keys(countY).filter(key => countY[key] > 1)

    // //finds closest line number to mouse location
    // function findClosestNumber(mouse, numbers) {
    //     return numbers.reduce((closest, current) => {
    //         return Math.abs(current - mouse) < Math.abs(closest - mouse) ? current : closest
    //     })
    // }

    // //finds indexes that mouse is in btwn
    // function filterObjectsByPropertyAndValue(property, value) {
    //     const filteredIndexes = anchors
    //         .map((obj, index) => ({index, value: parseFloat(obj[property])}))
    //         .filter(item => item.value === parseFloat(value))
    //         .map(item => item.index)
        
    //     //[1st index, 2nd index] mouse location is in btwn
    //     return filteredIndexes
    // }

    // //handles events when hovering over room div
    // const handleHover = (e) => {
    //     if (editState === 'add-points') {
    //         //svg dimensions
    //         const svg = e.currentTarget.getBoundingClientRect()
    //         //mouse location on/relative to svg dimensions
    //         const mouseX = e.clientX - svg.left
    //         const mouseY = e.clientY - svg.top

    //         //runs closestNumber for x and y
    //         const closestNumberX = findClosestNumber(mouseX, linesX)
    //         const closestNumberY = findClosestNumber(mouseY, linesY)

    //         //difference btwn mouse and respective line for x and y
    //         const differenceX = Math.abs(mouseX - closestNumberX)
    //         const differenceY = Math.abs(mouseY - closestNumberY)

    //         //closer to horizontal line than vertical line
    //         if (differenceX > differenceY) {
    //             //finds index of anchors mouse location is in btwn
    //             const filteredIndexesY = filterObjectsByPropertyAndValue('y', closestNumberY)
    //             //sets location of lowered opacity anchor
    //             setGhostLocation({
    //                 index: filteredIndexesY[0],
    //                 top: `${anchors[filteredIndexesY[0]].y - 13}px`,
    //                 left: `${mouseX - 13}px`
    //             })
    //             //sets line direction and 2 anchor indexes of line ghost is on
    //             setGhostLine({
    //                 direction: 'horiz',
    //                 indexes: filteredIndexesY
    //             })
    //         } //closer to vertical line
    //         else {
    //             const filteredIndexesX = filterObjectsByPropertyAndValue('x', closestNumberX)
    //             setGhostLocation({
    //                 index: filteredIndexesX[0],
    //                 top: `${mouseY - 13}px`,
    //                 left: `${anchors[filteredIndexesX[0]].x - 13}px`
    //             })
    //             setGhostLine({
    //                 direction: 'vert',
    //                 indexes: filteredIndexesX
    //             })
    //         }
    //     }
    // }

    // //adds points to svg path, renders on click
    // const handleAddPoint = (e) => {
    //     //handles horizontal lines
    //     if (ghostLine.direction === 'horiz') {
    //         //new anchor with ghost anchor's location info
    //         const newAnchor = {
    //             //centers new anchor to mouse location (radius of circle div)
    //             x: parseFloat(ghostLocation.left) + 13,
    //             y: anchors[ghostLocation.index].y
    //         }
    //         //adds newAnchor to anchors
    //         anchors.splice(ghostLocation.index + 1, 0, newAnchor)
    //         //re-formats anchors into svg path
    //         pathFormatter(anchors)
    //     } //handles vertical lines
    //     else if (ghostLine.direction === 'vert') {
    //         //handles case of last anchor
    //         if (ghostLine.indexes[0] == anchors.length - 1 || ghostLine.indexes[ghostLine.indexes.length - 1] == anchors.length - 1) {
    //             const newAnchor = {
    //                 x: anchors[ghostLocation.index].x,
    //                 y: parseFloat(ghostLocation.top) + 13
    //             }
    //             //adds new anchor to end rather than splicing
    //             anchors.push(newAnchor)
    //             pathFormatter(anchors)
    //         } else {
    //             const newAnchor = {
    //                 x: anchors[ghostLocation.index].x,
    //                 y: parseFloat(ghostLocation.top) + 13
    //             }
    //             anchors.splice(ghostLocation.index + 1, 0, newAnchor)
    //             pathFormatter(anchors)
    //         }
    //     }
    //     //resets the ghost line info
    //     setGhostLine({})
    // }

    return (
        <div className="room-lockup"
            onMouseEnter={() => setisHovering(true)}
            onMouseLeave={() => setisHovering(false)}
            onMouseMove={(e) => handleHover(e)}
        >
            {editState === 'add-points' ?
                <div className="ghost-anchor" style={ghostLocation}></div>
                :
                ''
            }
            {/* <svg
                className={isEditing ? (isEditing === room.id ? "active-room" : "inactive-room") : "active-room"}
                width={room.width}
                height={room.height}
                onClick={handleAddPoint}
            >
                <path
                    ref={pathRef}
                    d={path}
                />
                {isEditing === room.id ?
                    <Anchors anchors={anchors} editState={editState} pathFormatter={pathFormatter}/>
                    :
                    ''
                }
            </svg> */}
            {/* <div className="edit-options">
                {isEditing ? 
                    (isEditing === room.id ? 
                        <div>
                            <div>
                                <button onClick={() => setEditState('add-points')}>Add Points</button>
                                <button onClick={() => setEditState('edit-points')}>Edit Points</button>
                                <button onClick={() => setEditState('delete-points')}>Delete Points</button>
                            </div>
                            <button onClick={() => setIsEditing('')}>Stop Editing</button>
                        </div>
                        : 
                        ''
                    ) 
                    : 
                    (isHovering ? 
                        (isConfirming ? 
                            <div>
                                <h3>Are You Sure?</h3>
                                <button onClick={() => handleDelete(room.id)}>Yes</button>
                                <button onClick={() => setIsConfirming(false)}>No</button>
                            </div>
                            : 
                            <div>
                                <button onClick={() => setIsEditing(room.id)}>Edit this Room</button>
                                <button onClick={() => setIsConfirming(true)}>Delete this Room</button>
                            </div>
                        ) 
                        : 
                        ''
                    )
                }
            </div> */}
        </div>
    )
}

export default Room

//freeform way to move coords
// const handleAnchorDrag = (index, e, ui) => {
//     if (editState === 'edit-points') {
//         anchors[index] = {
//             x: parseFloat(anchors[index].x) + ui.deltaX,
//             y: parseFloat(anchors[index].y) + ui.deltaY
//         }
//         pathFormatter(anchors)
//     }
// }

// const handleAnchorDrag = (index, e, ui) => {
//     if (editState === 'edit-points') {
//         if (index === 0) {
//             const xSeg = Math.abs(anchors[index].x - anchors[index + 1].x)
//             const ySeg = Math.abs(anchors[index].y - anchors[index + 1].y)
//             if (xSeg < ySeg) {
//                 anchors[anchors.length - 1] = {
//                     x: parseFloat(anchors[anchors.length - 1].x),
//                     y: parseFloat(anchors[index].y) + ui.deltaY
//                 }
//                 anchors[index] = {
//                     x: parseFloat(anchors[index].x) + ui.deltaX,
//                     y: parseFloat(anchors[index].y) + ui.deltaY
//                 }
//                 anchors[index + 1] = {
//                     x: parseFloat(anchors[index].x) + ui.deltaX,
//                     y: parseFloat(anchors[index + 1].y)
//                 }
//             } else if (xSeg > ySeg) {
//                 anchors[anchors.length - 1] = {
//                     x: parseFloat(anchors[index].x) + ui.deltaX,
//                     y: parseFloat(anchors[anchors.length - 1].y)
//                 }
//                 anchors[index] = {
//                     x: parseFloat(anchors[index].x) + ui.deltaX,
//                     y: parseFloat(anchors[index].y) + ui.deltaY
//                 }
//                 anchors[index + 1] = {
//                     x: parseFloat(anchors[index + 1].x),
//                     y: parseFloat(anchors[index].y) + ui.deltaY
//                 }
//             }
//         } else if (index === anchors.length - 1) {
//             const xSeg = Math.abs(anchors[index].x - anchors[0].x)
//             const ySeg = Math.abs(anchors[index].y - anchors[0].y)
//             if (xSeg < ySeg) {
//                 anchors[index - 1] = {
//                     x: parseFloat(anchors[index - 1].x),
//                     y: parseFloat(anchors[index].y) + ui.deltaY
//                 }
//                 anchors[index] = {
//                     x: parseFloat(anchors[index].x) + ui.deltaX,
//                     y: parseFloat(anchors[index].y) + ui.deltaY
//                 }
//                 anchors[0] = {
//                     x: parseFloat(anchors[index].x) + ui.deltaX,
//                     y: parseFloat(anchors[0].y)
//                 }
//             } else if (xSeg > ySeg) {
//                 anchors[index - 1] = {
//                     x: parseFloat(anchors[index].x) + ui.deltaX,
//                     y: parseFloat(anchors[index - 1].y)
//                 }
//                 anchors[index] = {
//                     x: parseFloat(anchors[index].x) + ui.deltaX,
//                     y: parseFloat(anchors[index].y) + ui.deltaY
//                 }
//                 anchors[0] = {
//                     x: parseFloat(anchors[0].x),
//                     y: parseFloat(anchors[index].y) + ui.deltaY
//                 }
//             }
//         } else {
//             const xSeg = Math.abs(anchors[index].x - anchors[index + 1].x)
//             const ySeg = Math.abs(anchors[index].y - anchors[index + 1].y)
//             if (xSeg < ySeg) {
//                 anchors[index - 1] = {
//                     x: parseFloat(anchors[index - 1].x),
//                     y: parseFloat(anchors[index].y) + ui.deltaY
//                 }
//                 anchors[index] = {
//                     x: parseFloat(anchors[index].x) + ui.deltaX,
//                     y: parseFloat(anchors[index].y) + ui.deltaY
//                 }
//                 anchors[index + 1] = {
//                     x: parseFloat(anchors[index].x) + ui.deltaX,
//                     y: parseFloat(anchors[index + 1].y)
//                 }
//             } else if (xSeg > ySeg) {
//                 anchors[index - 1] = {
//                     x: parseFloat(anchors[index].x) + ui.deltaX,
//                     y: parseFloat(anchors[index - 1].y)
//                 }
//                 anchors[index] = {
//                     x: parseFloat(anchors[index].x) + ui.deltaX,
//                     y: parseFloat(anchors[index].y) + ui.deltaY
//                 }
//                 anchors[index + 1] = {
//                     x: parseFloat(anchors[index + 1].x),
//                     y: parseFloat(anchors[index].y) + ui.deltaY
//                 }
//             }
//         }
//         pathFormatter(anchors)
//     }
// }