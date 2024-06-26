import React, { useState } from "react";
import './Popup.css';

function Popup({ message, onClose }) {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        onClose(); // Call onClose function passed as prop to handle any necessary cleanup or state changes
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h1>{message}</h1>
                <button type="button" className="btn btn-primary" onClick={handleShowModal}>
                    Launch static backdrop modal
                </button>

                {/* Bootstrap Modal */}
                <div className={`modal fade ${showModal ? 'show' : ''}`} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* Modal body content here */}
                                <p>Modal body content goes here...</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                <button type="button" className="btn btn-primary">Understood</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;

