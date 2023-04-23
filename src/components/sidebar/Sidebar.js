import React, { useContext, useState } from "react";
import { BoardContext } from "../../context/BoardContext";
import AddBoardForm from "../board/forms/AddBoardForm";
import SidebarItem from "./SidebarItem"
import Modal from "../modal/Modal";

function Sidebar() {
    const {boards} = useContext(BoardContext)
    const [showModal, setShowModal] = useState(false)

    return (
    <aside className="hidden md:flex flex-col h-screen sticky top-0 overflow-y-auto bg-light-bg min-w-max border-[1px] border-gray-700 text-gray-400">
        <p className="my-4 pl-6 tracking-widest">All boards ({boards.length})</p>
        {boards.map(item => <SidebarItem key={item.id} board={item}/>)}
        <button onClick={() => setShowModal(true)} className="p-2 pl-6 pr-4 mr-6 transition-all text-primary focus:bg-primary hover:bg-primary hover:text-gray-100 focus:text-gray-100 rounded-r-full font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
            + Create New Board
        </button>
        <Modal isOpen={showModal} setOpen={setShowModal}>
            <AddBoardForm setOpen={setShowModal}/>
        </Modal>
    </aside>)
    
}

export default Sidebar