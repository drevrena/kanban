import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../context/BoardContext";

function SubTask({id, title, completed: initialCompleted}) {
    const {updateSubtask} = useContext(BoardContext)
    const [completed, setCompleted] = useState(initialCompleted)

    useEffect(() => {
        if(completed !== initialCompleted)
            updateSubtask(id, {completed})
    }, [id, completed, initialCompleted, updateSubtask])

    //Tricky css/html to make checkbox background darker
    return (
    <div className="flex w-[80%] bg-dark-bg mb-2 text-white rounded px-6 py-2 border-[1px] border-gray-700">
        <label className="relative my-auto w-4 h-4 rounded mr-4 bg-[#28282c] border-[1px] border-gray-700">
            <input 
                type="checkbox" 
                style={{ opacity: completed ? 1 : 0}} 
                className="absolute m-auto w-4 h-4 opacity-0 accent-primary"
                checked={completed} 
                onChange={(event) => setCompleted(event.target.checked)} />
        </label>
        <p style={{textDecoration: completed ? "line-through" : "none", color: completed ? "#9ca3af" : "#f3f4f6"}}>{title}</p>
    </div>)
}

export default SubTask