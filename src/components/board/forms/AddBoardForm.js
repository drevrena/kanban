import React, { useContext, useState } from "react";
import { BoardContext } from "../../../context/BoardContext";
import { nanoid } from "nanoid";

function AddBoardForm({setOpen}) {
    const {setCurrentBoardId, addBoard} = useContext(BoardContext)
    const [title, setTitle] = useState("")

    function handleSubmit(event) {
        event.preventDefault()
        let boardId = nanoid()
        
        addBoard({id: boardId, title})
        setCurrentBoardId(boardId)
        setOpen(false)
    }

    return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center text-gray-100">
        <h1 className="text-2xl py-8">Create a new Board!</h1>
        <input 
            className="bg-transparent text-gray-400 rounded border-2 border-gray-600 px-6 py-2 focus:outline-none"
            type="text" 
            placeholder="Your board name"
            required
            value={title} 
            onChange={(event) => setTitle(event.target.value)}
        />
        <button className="bg-primary m-8 px-8 py-2 rounded">Confirm</button>
    </form>)

}

export default AddBoardForm