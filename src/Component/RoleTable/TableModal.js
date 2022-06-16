import React from "react";


const TableModal = ({show,  cancelModal, modalHeading, structure}) => {
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
                                    <button type="button" className="btn-close" onClick={()=> cancelModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    {structure}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={()=> cancelModal(false)} >Cancel</button>
                                    <button type="button" className="btn btn-primary">Save</button>
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
