import React, { useContext } from "react";
import { BoardContext } from "../../../context/BoardContext";

function SwitchBoardForm({setOpen}) {
    const {boards, currentBoardId, setCurrentBoardId} = useContext(BoardContext)

    return (
    <div className="flex flex-col items-center mb-8">
        <h1 className="text-gray-100 text-xl text-center p-8">Please choose the Board you want to work with:</h1>
        <select className="w-[80%] bg-light-bg text-gray-400 rounded border-2 border-gray-600 px-6 py-2 focus:outline-none" 
            value={currentBoardId ?? ""} 
            onChange={(event) => {
                setCurrentBoardId(event.target.value)
                setOpen(false)
            }} >
            <option className="hidden" value="" disabled>...</option>
            {boards.map(board => <option key={board.id} value={board.id}>{board.title}</option>)}
        </select>
    </div>)

}

export default SwitchBoardForm