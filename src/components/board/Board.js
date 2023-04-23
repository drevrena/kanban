import React, { useContext, useEffect } from "react";
import { BoardContext } from "../../context/BoardContext";
import { DragDropContext } from "react-beautiful-dnd";
import TaskContainer from "../tasks/TaskContainer";
import Nav from "../nav/Nav";

function Board() {
    const {tasks, updateTask, loadTasks, loadSubtasks, currentBoardId} = useContext(BoardContext)
    const statusData = [
        {value: "TODO", bulletColor: "#60a5fa"},
        {value: "PROGRESS", bulletColor: "#fbbf24"},
        {value: "DONE", bulletColor: "#34d399"}
    ]

    function handleDrag(event) {
        const dest = event.destination
        
        if(dest === null || event.source.droppableId === dest.droppableId )
            return

        updateTask(event.draggableId, {status: statusData[dest.droppableId].value})
    }

    useEffect(()=> {
        loadTasks(currentBoardId)
        loadSubtasks(currentBoardId)
    }, [currentBoardId])

    return (
    <div className="flex flex-col w-full h-full">
        <Nav/>
        <DragDropContext onDragEnd={handleDrag}>
            <div className="grid grid-cols-1 sm:grid-cols-3">
                {statusData.map((status,idx) => (
                    <TaskContainer key={idx} tasks={tasks.filter(task => task.status === status.value)} status={status} idx={idx}/>
                ))}
            </div>
        </DragDropContext>
    </div>)

}

export default Board