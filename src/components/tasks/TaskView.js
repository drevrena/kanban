import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../../context/BoardContext";
import SubTask from "./SubTask";

function TaskView({id, title, description}) {
    const {getSubtasks, updateTask} = useContext(BoardContext)
    const [status, setStatus] = useState("")
    const subtasks = getSubtasks(id) 
    
    useEffect(()=> {
        if(status)
            updateTask(id, {status})
    }, [id, status])

    return (
        <div className="flex flex-col p-8 gap-4 rounded-lg text-gray-200">
            <h1 className="text-2xl font-semibold pb-4 text-gray-200">{title}</h1>
            <p className="text-gray-400">{description ? description : "No description provided."}</p>
            {subtasks.length > 0 && <div>
                <h2 className="font-semibold mb-4">Subtasks ({subtasks.filter(sub => sub?.completed).length} of {subtasks.length})</h2>
                {subtasks.map((sub, idx) => <SubTask key={idx} {...sub} />)}
            </div>}
            <h2 className="font-semibold">Status</h2>
            <select className="w-[80%] bg-transparent text-gray-400 rounded border-2 border-gray-600 px-6 py-2 focus:outline-none" value={status} onChange={(event) => setStatus(event.target.value)}>
                <option className="hidden" value="" disabled>Select status</option>
                <option value="TODO">Todo</option>
                <option value="PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
            </select>
        </div>
    )
}

export default TaskView