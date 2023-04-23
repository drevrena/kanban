import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

function TaskContainer({tasks, status, idx}) {
    return (
    <div className="m-4 flex flex-col">
        <h2 className="capitalize flex whitespace-nowrap bg-light-bg border-gray-600 border-2 rounded-full m-auto px-4 py-1.5 my-4 text-center text-gray-400 font-medium"> 
            <svg style={{ color: "#282828", fill: status.bulletColor }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            {status.value.toLowerCase()} ({tasks.length})
        </h2>
        <Droppable key={idx} droppableId={"" + idx}>
            {(provided) => (
                <div className="h-full" ref={provided.innerRef} {...provided.droppableProps} key={idx} >
                    {tasks.map((task,index)=> <Task key={task.id} task={task} index={index}/>)}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>)
}

export default TaskContainer