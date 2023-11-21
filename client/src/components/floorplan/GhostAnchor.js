import React, { useEffect, useState } from "react"

//local imports
import "../../styling/room.css"

function GhostAnchor({ ghostLocation, setGhostLocation, setGhostLine, anchors, mouseEvent, svgRef }) {
    //unique X and Y values in anchors
    const uniqueNumbersX = Array.from(new Set(anchors.map(obj => parseFloat(obj.x))))
    const uniqueNumbersY = Array.from(new Set(anchors.map(obj => parseFloat(obj.y))))
    
    //checks if unique number occurs multiple times in anchors x value
    //if it does, it means it's a corner or anchor. If not, it's a point on a line
    const countX = {}
    anchors.forEach(anchor => {
        //converts anchor x value to number if it's not already
        const xValue = parseFloat(anchor.x)
        if (uniqueNumbersX.includes(xValue)) {
            countX[xValue] = (countX[xValue] || 0) + 1
        }
    })
    //filter numbers that occur multiple times (x)
    const linesX = Object.keys(countX).filter(key => countX[key] > 1)

    //does the same for the anchors y value
    const countY = {}
    anchors.forEach(anchor => {
        const yValue = parseFloat(anchor.y)
        if (uniqueNumbersY.includes(yValue)) {
            countY[yValue] = (countY[yValue] || 0) + 1
        }
    })
    const linesY = Object.keys(countY).filter(key => countY[key] > 1)

    //finds closest line number to mouse location
    function findClosestLine(mouse, numbers) {
        return numbers.reduce((closest, current) => {
            return Math.abs(current - mouse) < Math.abs(closest - mouse) ? current : closest
        })
    }

    //finds indexes that mouse is in btwn
    function anchorIndexes(property, value) {
        const filteredIndexes = anchors
            .map((obj, index) => ({index, value: parseFloat(obj[property])}))
            .filter(item => item.value === parseFloat(value))
            .map(item => item.index)
        
        //[1st index, last index] mouse location is in btwn
        return filteredIndexes
    }

    //svg dimensions
    const svg = svgRef.current.getBoundingClientRect()
    //mouse location on/relative to svg dimensions
    const mouseX = mouseEvent.clientX - svg.left
    const mouseY = mouseEvent.clientY - svg.top

    //runs closestNumber for x and y
    const closestNumberX = findClosestLine(mouseX, linesX)
    const closestNumberY = findClosestLine(mouseY, linesY)

    //difference btwn mouse and respective line for x and y
    const differenceX = Math.abs(mouseX - closestNumberX)
    const differenceY = Math.abs(mouseY - closestNumberY)

    useEffect(() => {
        //closer to horizontal line than vertical line
        if (differenceX > differenceY) {
            //finds indexes of line's corner anchors that the mouse location is in btwn
            const anchorIndexesY = anchorIndexes('y', closestNumberY)
            //two corner anchors of the line
            const firstCorner = anchors[anchorIndexesY[0]]
            const secondCorner = anchors[anchorIndexesY[anchorIndexesY.length - 1]]

            // Use filter to find objects with matching y
            let pointsOnLine = anchors
                .filter(anchor => anchor.y === firstCorner.y)
                .map(anchor => parseFloat(anchor.x))

            //find closest number on pointsOnLine, use for ghostLocation index
            const closestAnchorX = findClosestLine(mouseX, pointsOnLine)
            const closestAnchor = anchorIndexes('x', closestAnchorX)
            //check if mouse location is to the left or right of closestAnchor and
            //let that determine ghostLocation index
            const difference = anchors[closestAnchor[0]].x - mouseX

            //determines if line is going left or right
            if (firstCorner.x < secondCorner.x) {
                //going right

                //determines what side the mouse is to the index
                if (difference > 0) {
                    //mouse to the left of the closest anchor point

                    //sets location of lowered opacity anchor
                    setGhostLocation({
                        index: closestAnchor[0] - 1,
                        top: `${firstCorner.y - 13}px`,
                        left: `${Math.min(Math.max(mouseX - 13, firstCorner.x - 13), secondCorner.x - 13)}px`
                    })
                    //sets line direction and 2 anchor indexes of line ghost is on
                    setGhostLine({
                        direction: 'horiz',
                        indexes: [closestAnchor[0] - 1, closestAnchor[0]]
                    })
                } else {
                    //mouse to the right of the closest anchor point

                    setGhostLocation({
                        index: closestAnchor[0],
                        top: `${firstCorner.y - 13}px`,
                        left: `${Math.min(Math.max(mouseX - 13, firstCorner.x - 13), secondCorner.x - 13)}px`
                    })
                    //sets line direction and 2 anchor indexes of line ghost is on
                    setGhostLine({
                        direction: 'horiz',
                        indexes: [closestAnchor[0], closestAnchor[0] + 1]
                    })
                }
            } else if (firstCorner.x > secondCorner.x) {
                //going left (bottom)

                //determines what side the mouse is to the index
                if (difference > 0) {
                    //mouse to the left of the closest anchor point

                    //sets location of lowered opacity anchor
                    setGhostLocation({
                        index: {closestAnchor.length > 1 ?
                            closestAnchor[1]
                            :
                            closestAnchor[0]
                        },
                        top: `${secondCorner.y - 13}px`,
                        left: `${Math.min(Math.max(mouseX - 13, secondCorner.x - 13), firstCorner.x - 13)}px`
                    })
                    //sets line direction and 2 anchor indexes of line ghost is on
                    setGhostLine({
                        direction: 'horiz',
                        indexes: [closestAnchor[1], closestAnchor[1] + 1]
                    })
                } else {
                    //mouse to the right of the closest anchor point

                    setGhostLocation({
                        index: closestAnchor[0],
                        top: `${secondCorner.y - 13}px`,
                        left: `${Math.min(Math.max(mouseX - 13, secondCorner.x - 13), firstCorner.x - 13)}px`
                    })
                    //sets line direction and 2 anchor indexes of line ghost is on
                    setGhostLine({
                        direction: 'horiz',
                        indexes: [closestAnchor[1] - 1, closestAnchor[1]]
                    })
                }
            }


        } //closer to vertical line
        else {
            const anchorIndexesX = anchorIndexes('x', closestNumberX)
            const firstAnchor = anchors[anchorIndexesX[0]]
            const secondAnchor = anchors[anchorIndexesX[1]]

            //finds closest in next dimension so you know what indexes you're btwn in a line
            const closestNextDim = 

            setGhostLocation({
                index: anchorIndexesX[0],
                top: `${Math.min(Math.max(mouseY - 13, firstAnchor.y - 13), secondAnchor.y - 13)}px`,
                left: `${firstAnchor.x - 13}px`
            })
            setGhostLine({
                direction: 'vert',
                indexes: anchorIndexesX
            })
        }
    }, [mouseEvent])

    return (
        <div className="ghost-anchor" style={ghostLocation}></div>
    )
}

export default GhostAnchor