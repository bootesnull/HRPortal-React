import React from "react";
import LeavesListType from "../../Component/Leaves/LeavesListType";


const Leaves = () => {
    return (
        <div>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-body" >
                        <LeavesListType />
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaves;