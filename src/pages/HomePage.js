import React, { useEffect, useContext } from "react";
import { BoardContext } from "../context/BoardContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Board from "../components/board/Board";

function HomePage() {
    const {loadBoards} = useContext(BoardContext)
    const {userId} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        userId ? loadBoards() : navigate("/")
    }, [userId])

    if(!userId)
        return 

    return(
        <div className="bg-[#21212D] w-full h-full min-h-screen min-w-screen flex">
            <Sidebar/>
            <Board/>
        </div>
    )
}

export default HomePage