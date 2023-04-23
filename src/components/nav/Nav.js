import React, {useContext, useState} from "react";
import { BoardContext } from "../../context/BoardContext";
import DeleteConfirmModal from "../modal/DeleteConfirmModal";
import TaskForm from "../tasks/forms/TaskForm";
import Modal from "../modal/Modal";
import MobileMenu from "./mobile/MobileMenu";

function Nav() {
    const {boards, currentBoardId, setCurrentBoardId, removeBoard} = useContext(BoardContext)
    const [deleteBoardModal, setDeleteBoardModal] = useState()
    const [addTaskModal, setAddTaskModal] = useState()
    const [mobileMenu, setMobileMenu] = useState(false)
    const currentBoard = boards.find(board => board.id === currentBoardId)

    return <>
        <nav className="sticky top-0 z-10 flex flex-row justify-between items-center bg-light-bg text-gray-100 h-24 w-full px-2 border-[1px] border-l-0 border-gray-700">
            <div className="flex items-center">
                <h1 className="xs:text-2xl text-xl font-semibold m-4">{currentBoard ? currentBoard.title : "Please choose a Board"}</h1>
                {currentBoardId && <button onClick={() => setDeleteBoardModal(true)}>
                    {/* Delete Icon*/}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden sm:block text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>}
            </div>
            <div className="flex items-center mr-4">
                <button
                    onClick={() => setAddTaskModal(true)}
                    disabled={!currentBoard}
                    style={{ opacity: currentBoard ? 1.0 : 0.5 }}
                    className="bg-primary font-medium xs:px-6 px-3 whitespace-nowrap py-2 rounded point">
                    + New Task
                </button>
                <button onClick={() => setMobileMenu(prev => !prev)}>
                    {/* Three vertical dots icon*/}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:hidden text-gray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                </button>
            </div>
        </nav>
        <MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu}/>
        <DeleteConfirmModal
            isOpen={deleteBoardModal}
            setOpen={setDeleteBoardModal}
            postConfirm={() => {
                removeBoard(currentBoardId)
                setCurrentBoardId(null)
            }}
        />
        <Modal isOpen={addTaskModal} setOpen={setAddTaskModal}>
            <TaskForm setOpen={setAddTaskModal} />
        </Modal>
    </>
}

export default Nav