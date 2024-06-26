import React from "react";
import './Popup.css';

function Popup({message, onClose}) {

    return (
        <div className="popup">
            <div className="popup-content">
                <h1>{message}</h1>
            </div>
        </div>
    )
}

export default Popup;