import React, { Component } from 'react';
import './DeletePopup.css';

class DeletePopup extends Component {
    render() {
        return(
            <div className="popup-box">
                <div className="box">
                    <p className="success-msg delete-p"><i class="fa fa-check-circle" aria-hidden="true">Todo Deleted Successfully!</i></p>
                </div>
            </div>
        )
    }
}

export default DeletePopup;