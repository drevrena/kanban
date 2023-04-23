import React, {useContext, useState} from "react";
import { BoardContext } from "../../../context/BoardContext";
import DeleteConfirmModal from "../../modal/DeleteConfirmModal";
import SwitchBoardForm from "../../board/forms/SwitchBoardForm";
import AddBoardForm from "../../board/forms/AddBoardForm";
import Modal from "../../modal/Modal";

function MobileMenu({mobileMenu, setMobileMenu}) {
    const {currentBoardId, setCurrentBoardId, removeBoard} = useContext(BoardContext)
    const [addBoardModal, setAddBoardModal] = useState()
    const [changeBoardModal, setChangeBoardModal] = useState()
    const [deleteBoardModal, setDeleteBoardModal] = useState()

    function showModal(modalSetter) {
        setMobileMenu(false)
        modalSetter(true)
    }

    return <>
        <div className="flex-col bg-light-bg text-gray-100 font-medium mb-4" style={{ display: mobileMenu ? "flex" : "none"}}>
            <button onClick={() => showModal(setAddBoardModal)} className="p-2 border-b-[1px] border-gray-600">New Board</button>
            <button onClick={() => showModal(setChangeBoardModal)} className="p-2 border-b-[1px] border-gray-600">Switch Board</button>
            <button onClick={() => showModal(setDeleteBoardModal)} className="p-2 border-b-[1px] border-gray-600">Delete Board</button>
        </div>
        <Modal isOpen={addBoardModal} setOpen={setAddBoardModal}>
            <AddBoardForm setOpen={setAddBoardModal} />
        </Modal>
        <DeleteConfirmModal
            isOpen={deleteBoardModal}
            setOpen={setDeleteBoardModal}
            postConfirm={() => {
                removeBoard(currentBoardId)
                setCurrentBoardId(null)
            }}
        />
        <Modal isOpen={changeBoardModal} setOpen={setChangeBoardModal}>
            <SwitchBoardForm setOpen={setChangeBoardModal} />
        </Modal>
    </>
}

export default MobileMenu