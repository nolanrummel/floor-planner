import React from "react"

function WallCreator({ setIsEditing }) {
    return (
        <div>
            <h1 onClick={() => setIsEditing('')}>done edit</h1>
        </div>  
    )
}

export default WallCreator