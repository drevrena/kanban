import React, { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";


function SidebarItem({board}) {
    const {setCurrentBoardId} = useContext(BoardContext)

    return (
    <div className="flex flex-row items-center p-2 pl-6 pr-4 font-medium cursor-pointer" onClick={() => setCurrentBoardId(board.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
        <p className="inline">{board.title}</p>
    </div>)
}

export default SidebarItem