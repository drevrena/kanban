import React from "react";
import Modal from "./Modal";

function DeleteConfirmModal({isOpen, setOpen, postConfirm}) {
    
    return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
        <div className="flex flex-col items-center text-gray-100">
            <h1 className="text-xl text-center p-8">Please confirm that you want to delete this item.</h1>
            <button onClick={() => {
                postConfirm()
                setOpen(false)
            }} className=" bg-red-400 font-medium m-8 px-8 py-2 rounded ">Confirm</button>
        </div>
    </Modal>)

}

export default DeleteConfirmModal