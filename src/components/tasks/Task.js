import React, { useContext, useState } from "react";
import { BoardContext } from "../../context/BoardContext";
import { Draggable } from "react-beautiful-dnd";
import TaskView from "./TaskView";
import Modal from "../modal/Modal"

function Task({task, index}) {
    const {getSubtasks, removeTask} = useContext(BoardContext)
    const [showModal, setShowModal] = useState(false)
    const subtasks = getSubtasks(task.id)

    return <>
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {provided => (
            <div key={task.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                className="bg-light-bg rounded m-8 sm:m-0 sm:mb-4 p-4 font-semibold"
                //Check if it's clicking delete svg
                onClick={(event) => event.target.tagName === "svg" ? null : setShowModal(true)}>
                <p className="text-gray-100">{task.title}</p>
                <p className="text-gray-400 mt-2">{subtasks.length > 0 ? `${subtasks.filter(task => task.completed).length} out of ${subtasks.length} completed` : "No subtasks"}</p>
                
                <button onClick={() => removeTask(task.id)} className="block mr-0 ml-auto mt-2">
                    {/* Delete Icon*/}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 invisibile sm:visible text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>

            </div>
            )}
        </Draggable>
        <Modal isOpen={showModal} setOpen={setShowModal}>
            <TaskView {...task}/>
        </Modal>
    </>
            
}

export default Task