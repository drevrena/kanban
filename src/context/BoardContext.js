import { createContext, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import useFirebase from "../hooks/useFirebase";

const BoardContext = createContext()

function BoardContextProvider({children}) {
    const {updateDocument, deleteDocument, setDocument, getDocumentsFromServer} = useFirebase()
    const {userId} = useContext(UserContext)
    const [currentBoardId, setCurrentBoardId] = useState(null)
    const [boards, setBoards] = useState([])
    const [tasks, setTasks] = useState([])
    const [subtasks, setSubtasks] = useState([])

    function loadBoards() {
        getDocumentsFromServer(`users/${userId}/boards`)
            .then(querySnap => {
                let fetchedBoards = []
                querySnap.forEach(docSnap => {
                    fetchedBoards.push({ key: docSnap.id, ...docSnap.data()})
                })
                return fetchedBoards
            })
            .then(fetched => setBoards(fetched))
    }

    function addBoard(board) {
        setDocument(`users/${userId}/boards/${board.id}`, board)
        setBoards(prev => [...prev, board])
    }

    function removeBoard(boardId) {
        deleteDocument(`users/${userId}/boards/${boardId}`)
        setBoards(prev => {
            prev.splice(prev.findIndex(board=> board.id === boardId), 1)
            return [...prev]
        })

    }

    function loadTasks(boardId) {
        getDocumentsFromServer(`users/${userId}/boards/${boardId}/tasks`)
            .then(querySnap => {
                let fetchedTasks = []
                querySnap.forEach(docSnap => {
                    fetchedTasks.push({ key: docSnap.id, ...docSnap.data()})
                })
                return fetchedTasks
            })
            .then(orderedTasks => setTasks(orderedTasks))
    }

    function updateTask(taskId, data) {
        updateDocument(`users/${userId}/boards/${currentBoardId}/tasks/${taskId}`, {...data})
        setTasks(prev => prev.map(task => task.id === taskId ? {...task, ...data} : task))
    }

    function addTask(task) {
        setDocument(`users/${userId}/boards/${currentBoardId}/tasks/${task.id}`, task)
        setTasks(prev => [...prev, task])
    }

    function removeTask(taskId) {
        deleteDocument(`users/${userId}/boards/${currentBoardId}/tasks/${taskId}`) 
        setTasks(prev => {
            prev.splice(prev.findIndex(task => task.id === taskId), 1)
            return [...prev]
        })
        
    }

    function loadSubtasks(boardId) {
        getDocumentsFromServer(`users/${userId}/boards/${boardId}/subtasks`)
            .then(querySnap => {
                let fetchedSubtasks = []
                querySnap.forEach(docSnap => {
                    fetchedSubtasks.push({ key: docSnap.id, ...docSnap.data()})
                })
                return fetchedSubtasks
            })
            .then(fetchedSubtasks => setSubtasks(fetchedSubtasks))
    }

    function getSubtasks(taskId) {
        return subtasks.filter(sub => sub.taskId === taskId)
    }

    function updateSubtask(subtaskId, data) {
        updateDocument(`users/${userId}/boards/${currentBoardId}/subtasks/${subtaskId}`, {...data})
        setSubtasks(prev => prev.map(subtask => subtask.id === subtaskId ? {...subtask, ...data} : subtask))
    }

    function addSubtask(subtask) {
        setDocument(`users/${userId}/boards/${currentBoardId}/subtasks/${subtask.id}`, subtask)
        setSubtasks(prev => [...prev, subtask])
    }

    function removeSubtask(subtaskId) {
        deleteDocument(`users/${userId}/boards/${currentBoardId}/subtasks/${subtaskId}`)
        setSubtasks(prev => {
            prev.splice(prev.findIndex(subtask => subtask.id === subtaskId), 1)
            return [...prev]
        })
    }

    return <BoardContext.Provider value={
        {
            boards, 
            tasks,
            currentBoardId,
            setCurrentBoardId, 
            loadBoards, 
            loadTasks,
            loadSubtasks,
            addBoard, 
            removeBoard, 
            addTask, 
            removeTask,
            updateTask,
            getSubtasks, 
            addSubtask, 
            removeSubtask,
            updateSubtask, 
        }}>
        {children}
    </BoardContext.Provider>
}

export {BoardContextProvider, BoardContext}