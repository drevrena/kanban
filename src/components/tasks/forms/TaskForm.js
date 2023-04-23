import React, { useContext, useState } from "react";
import { BoardContext } from "../../../context/BoardContext";
import { nanoid } from "nanoid";

function TaskForm({setOpen}) {
    const {addTask, addSubtask} = useContext(BoardContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")
    const [subTasks, setSubTasks] = useState([])

    function handleSubmit(event) {
        event.preventDefault()
        let taskId = nanoid()
        addTask({
            id: taskId,
            title: title,
            description: description,
            status: status,
        })
        subTasks.forEach(sub => {
            addSubtask({
                id: nanoid(),
                taskId: taskId,
                title: sub.title,
                completed: false
            })
        })
        setOpen(false)
    }

    const inputStyle = "w-[80%] bg-light-bg text-gray-400 rounded border-2 border-gray-600 px-6 py-2 focus:outline-none"

    return (
        <>
            <form id="task-form" className="flex flex-col items-center p-4 pt-12 gap-4 rounded-lg" onSubmit={handleSubmit}>
                <h1 className="text-2xl py-8 text-gray-200">Create a new Task!</h1>
                <input
                    className={inputStyle}
                    type="text"
                    value={title}
                    required
                    placeholder="Task name"
                    onChange={(event) => setTitle(event.target.value)}
                />
                <input
                    className={inputStyle}
                    type="text"
                    value={description}
                    placeholder="Description"
                    onChange={(event) => setDescription(event.target.value)}
                />
                <button type="button" onClick={() => setSubTasks(prev => [...prev, {title: "", completed: false}])} className="px-8 py-2 mb-4 bg-indigo-500 rounded-xl text-lg font-bold text-gray-200  mt-8">Add Subtask</button>
                {subTasks.map((sub, i) => <input
                    key={i}
                    className={inputStyle}
                    type="text"
                    value={subTasks[i].title}
                    placeholder="Subtask..."
                    onChange={(event) => setSubTasks(prev => {
                        sub.title = event.target.value
                        return [...prev]
                    })}
                />)}
                <select  required className={inputStyle} value={status} onChange={(event) => setStatus(event.target.value)}>
                    <option className="hidden" value="" disabled>Select status</option>
                    <option value="TODO">Todo</option>
                    <option value="PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>
                <button className="px-8 py-2 mb-4 bg-indigo-500 rounded-xl text-lg font-bold text-gray-200  mt-8" form="task-form">Add Task</button>
            </form>
        </>
    )
}

export default TaskForm