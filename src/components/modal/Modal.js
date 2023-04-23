import React from "react";
import ReactModal from "react-modal";

//Adjust Modal background
ReactModal.defaultStyles.overlay.backgroundColor="rgba(0, 0, 0, 0.4)"
ReactModal.defaultStyles.overlay.backdropFilter="blur(2.5px)"
ReactModal.defaultStyles.overlay.display="flex"
ReactModal.defaultStyles.overlay.zIndex="100"

function Modal({children, isOpen, setOpen}) {
    return  <ReactModal
        appElement={document.getElementById('root')}
        className="w-[80%] max-w-lg m-auto my-auto bg-light-bg rounded-md"
        onRequestClose={() => setOpen(false)}
        isOpen={isOpen}>
        {children}
    </ReactModal>
}

export default Modal