import React, { useState } from "react"

//local imports
import "../../styling/room.css"

//handles editing options (add, edit, etc) sets editState
function EditOptions({ room, isEditing, setIsEditing, setEditState, isHovering }) {
  //confirm delete of room
  const [isConfirming, setIsConfirming] = useState(false)

  //handles deleting the entire room (IN PROGRESS)
  const handleDelete = (id) => {
    console.log(`Delete Room ${room.id}`)
  }

  const stopEditing = () => {
    setIsEditing('')
    setEditState('')
  }

  return (
    <div className="edit-options">
      {isEditing ? 
        (isEditing === room.id ? 
          <div>
            <div>
              <button onClick={() => setEditState('add-points')}>Add Points</button>
              <button onClick={() => setEditState('edit-points')}>Edit Points</button>
              <button onClick={() => setEditState('delete-points')}>Delete Points</button>
            </div>
            <button onClick={stopEditing}>Stop Editing</button>
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
    </div>
  )
}

export default EditOptions