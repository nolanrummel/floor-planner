import React from "react"
import Draggable from "react-draggable"

//local imports
import "../../styling/room.css"

function Anchors({ anchors, editState, pathFormatter }) {
    //updates anchor point within handleAnchorDrag function
    const updateAnchor = (anchor, deltaX, deltaY) => ({
        x: parseFloat(anchor.x) + deltaX,
        y: parseFloat(anchor.y) + deltaY
    })
    
    //moves anchor points (IN PROGRESS)
    const handleAnchorDrag = (index, e, ui) => {
        if (editState === 'edit-points') {
            const prevIndex = (index - 1 + anchors.length) % anchors.length
            const nextIndex = (index + 1) % anchors.length
            
            const xSeg = Math.abs(anchors[index].x - anchors[nextIndex].x)
            const ySeg = Math.abs(anchors[index].y - anchors[nextIndex].y)
            
            if (xSeg < ySeg) {
                anchors[prevIndex] = updateAnchor(anchors[prevIndex], 0, ui.deltaY)
                anchors[index] = updateAnchor(anchors[index], ui.deltaX, ui.deltaY)
                anchors[nextIndex] = updateAnchor(anchors[nextIndex], ui.deltaX, 0)
            } else if (xSeg > ySeg) {
                anchors[prevIndex] = updateAnchor(anchors[prevIndex], ui.deltaX, 0)
                anchors[index] = updateAnchor(anchors[index], ui.deltaX, ui.deltaY)
                anchors[nextIndex] = updateAnchor(anchors[nextIndex], 0, ui.deltaY)
            }
            
            pathFormatter(anchors)
        }
    }

    //deletes points when clicked
    const deletePoints = (index) => {
        if (editState === 'delete-points') {
            anchors.splice(index, 1)
            pathFormatter(anchors)
        }
    }

    //renders circle divs on coord locations of anchors
    const renderAnchors = () => {
        return anchors.map((anchor, index) => (
            <Draggable
                key={index}
                //handles drag for move points
                onDrag={(e, ui) => handleAnchorDrag(index, e, ui)}
                //resets location of anchor after drag
                position={{ x: 0, y: 0 }}
            >
                {/* circle div */}
                <circle className={editState === 'edit-points' || editState === 'delete-points' ? "edit-anchor-point" : "anchor-point"}
                    onClick={() => deletePoints(index)}
                    style={editState === 'edit-points' ? {fill: 'green'} : editState === 'delete-points' ? {fill: 'red'} : {}}
                    cx={anchor.x}
                    cy={anchor.y}
                />
            </Draggable>
        ))
    }
    
    return (
        renderAnchors()  
    )
}

export default Anchors