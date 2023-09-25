import React, { useState, useEffect, useRef } from "react"
import Draggable from "react-draggable"

//local imports
// import "../styling/development.css"

function Development() {
    //add points, edit points, remove points, ''
    const [editState, setEditState] = useState('')

    const [path, setPath] = useState('M0 0 L200 0 L200 200 L0 200 Z')
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
                <circle cx={anchor.x} cy={anchor.y} r={10} fill="red" />
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

    return (
        <svg width="200" height="200">
            <path
                ref={pathRef}
                d={path}
                fill="#ccc"
                stroke="red"
                strokeWidth="2"
            />
            {renderAnchors()}
        </svg>
    )
}

// function Development() {
//     const pathRef = useRef(null);

//     const handleClick = (event) => {
//         const path = pathRef.current;
//         if (!path) return;

//         const svgRect = path.getBoundingClientRect();
//         const clickX = event.clientX - svgRect.left;
//         const clickY = event.clientY - svgRect.top;

//         const pathData = path.getAttribute("d");
//         const pathSegments = pathData.split(" ");

//         let closestSegmentIndex = -1;
//         let closestDistance = Infinity;

//         for (let i = 0; i < pathSegments.length; i++) {
//             const segment = pathSegments[i];
//             if (segment === "M" || segment === "L") {
//                 const x = parseFloat(pathSegments[i + 1]);
//                 const y = parseFloat(pathSegments[i + 2]);
//                 const distance = Math.sqrt((x - clickX) ** 2 + (y - clickY) ** 2);

//                 if (distance < closestDistance) {
//                     closestDistance = distance;
//                     closestSegmentIndex = i;
//                 }
//             }
//         }

//         if (closestSegmentIndex >= 0) {
//             const x = clickX.toFixed(2);
//             const y = clickY.toFixed(2);
//             pathSegments.splice(closestSegmentIndex + 3, 0, `L${x} ${y}`);
//             const newPathData = pathSegments.join(" ");
//             path.setAttribute("d", newPathData);
//         }
//     };

//     return (
//         <svg width="200" height="200">
//             <path
//             ref={pathRef}
//             d="M0 0 L200 0 L200 200 L0 200 Z"
//             fill="#ccc"
//             stroke="red"
//             strokeWidth="2"
//             onClick={handleClick}
//             />
//         </svg>
//     )
// }

// function Development() {
//     const [state, setState] = useState({
//         path: 'M50 50 L150 50 L150 150 L50 150 Z', // Initial square path
//         points: [],
//         isDragging: false,
//         dragIndex: null,
//         dragOffsetX: 0,
//         dragOffsetY: 0,
//       })
    
//     // Function to add a point to the path
//     const addPoint = (x, y) => {
//     const { path, points } = state
//     const newPath = `${path} L${x} ${y}`
//     setState({ ...state, path: newPath, points: [...points, { x, y }] })
//     }

//     // Function to start dragging a point
//     const startDragging = (index, offsetX, offsetY) => {
//     setState({ ...state, isDragging: true, dragIndex: index, dragOffsetX: offsetX, dragOffsetY: offsetY })
//     }

//     // Function to update the position of a dragged point
//     const updateDraggedPoint = (x, y) => {
//     const { points, dragIndex, dragOffsetX, dragOffsetY } = state
//     const updatedPoints = [...points]
//     updatedPoints[dragIndex] = { x: x - dragOffsetX, y: y - dragOffsetY }
//     const newPath = `M50 50 ${updatedPoints.map(point => `L${point.x} ${point.y}`).join(' ')} Z`
//     setState({ ...state, path: newPath, points: updatedPoints })
//     }

//     // Function to stop dragging a point
//     const stopDragging = () => {
//     setState({ ...state, isDragging: false, dragIndex: null, dragOffsetX: 0, dragOffsetY: 0 })
//     }

//     const { path, points } = state;
    
//     return (
//     <div>
//         <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
//         <path d={path} fill="#ccc" stroke="red" strokeWidth="2" />
//         {points.map((point, index) => (
//             <circle
//             key={index}
//             cx={point.x}
//             cy={point.y}
//             r="5"
//             fill="blue"
//             onMouseDown={(e) => startDragging(index, e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
//             />
//         ))}
//         </svg>
//         <button onClick={() => addPoint(100, 100)}>Add Point</button>
//     </div>
//     )
// }
//     return (
//         <div>
//             {/* <div>
//                 <h2>Testing...</h2>
//                 <div className="plus-div"></div>
//                 <div className="room-1">
//                     <div className="section section-1"></div>
//                     <div className="section section-2"></div>
//                 </div>
//                 <div className="room-2"></div>
//             </div> */}
//         </div>  
//     )
// }

export default Development