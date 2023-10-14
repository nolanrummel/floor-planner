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
    function findClosestNumber(mouse, numbers) {
        return numbers.reduce((closest, current) => {
            return Math.abs(current - mouse) < Math.abs(closest - mouse) ? current : closest
        })
    }

    //finds indexes that mouse is in btwn
    function filterObjectsByPropertyAndValue(property, value) {
        const filteredIndexes = anchors
            .map((obj, index) => ({index, value: parseFloat(obj[property])}))
            .filter(item => item.value === parseFloat(value))
            .map(item => item.index)
        
        //[1st index, 2nd index] mouse location is in btwn
        return filteredIndexes
    }

    //svg dimensions
    const svg = svgRef.current.getBoundingClientRect()
    //mouse location on/relative to svg dimensions
    const mouseX = mouseEvent.clientX - svg.left
    const mouseY = mouseEvent.clientY - svg.top

    //runs closestNumber for x and y
    const closestNumberX = findClosestNumber(mouseX, linesX)
    const closestNumberY = findClosestNumber(mouseY, linesY)

    //difference btwn mouse and respective line for x and y
    const differenceX = Math.abs(mouseX - closestNumberX)
    const differenceY = Math.abs(mouseY - closestNumberY)

    useEffect(() => {
        //closer to horizontal line than vertical line
        if (differenceX > differenceY) {
            //finds index of anchors mouse location is in btwn
            const filteredIndexesY = filterObjectsByPropertyAndValue('y', closestNumberY)
            //two anchors of the line
            const firstAnchor = anchors[filteredIndexesY[0]]
            const secondAnchor = anchors[filteredIndexesY[1]]
            //sets location of lowered opacity anchor
            setGhostLocation({
                index: filteredIndexesY[0],
                top: `${firstAnchor.y - 13}px`,
                left: `${
                    //determines if the line is going left or right
                    firstAnchor.x < secondAnchor.x ?
                        `${Math.min(Math.max(mouseX - 13, firstAnchor.x - 13), secondAnchor.x - 13)}px`
                        :
                        `${Math.min(Math.max(mouseX - 13, secondAnchor.x - 13), firstAnchor.x - 13)}px`
                }`
            })
            //sets line direction and 2 anchor indexes of line ghost is on
            setGhostLine({
                direction: 'horiz',
                indexes: filteredIndexesY
            })
        } //closer to vertical line
        else {
            const filteredIndexesX = filterObjectsByPropertyAndValue('x', closestNumberX)
            const firstAnchor = anchors[filteredIndexesX[0]]
            const secondAnchor = anchors[filteredIndexesX[1]]
            setGhostLocation({
                index: filteredIndexesX[0],
                top: `${Math.min(Math.max(mouseY - 13, firstAnchor.y - 13), secondAnchor.y - 13)}px`,
                left: `${firstAnchor.x - 13}px`
            })
            setGhostLine({
                direction: 'vert',
                indexes: filteredIndexesX
            })
        }
    }, [mouseEvent])

    return (
        <div className="ghost-anchor" style={ghostLocation}></div>
    )
}

export default GhostAnchor