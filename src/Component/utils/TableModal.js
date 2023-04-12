import React from "react";


const TableModal = ({show,  cancelModal, modalHeading, structure,}) => {
    // destructuring of props   {show, roles, cancelModal, modalHeading}

    return (
        <div>
            {
                show ? (
                    <div className="modal fade show" tabIndex="-1"  >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{modalHeading}</h5>
                                    <button type="button" className="btn-close" onClick={cancelModal}></button>
                                </div>
                                <div className="modal-body">
                                    {structure}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : ''
            }


        </div>

    );
};
export default TableModal;
