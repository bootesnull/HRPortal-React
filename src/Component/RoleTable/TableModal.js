import React from "react";


const TableModal = (props) => {
   // console.log(props)
    
    return (
        <div>
            {
                props.show ? (
                    <div className="modal fade show" tabIndex="-1"  >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{props.modalHeading}</h5>
                                    <button type="button" className="btn-close" onClick={() => { props.setShow(false) }}></button>
                                </div>
                                <div className="modal-body">
                                    <form className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label">{props.modalHeading}</label>
                                            <input type="text" className="form-control" id="" name={props.roles}/>
                                        </div>
                                    </form>
                                    {/* {props.structure} */}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                        onClick={() => { props.setShow(false) }}
                                    >Cancel</button>
                                    <button type="button" className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>

                ) : ""
            }


        </div>

    );
};
export default TableModal;
