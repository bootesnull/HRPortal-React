import React from "react";
import AttendenceTable from "../../Component/AttendenceTable/AttendenceTable";

const Attendence = () => {
    return (
        <div>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-body" >
                        <AttendenceTable />

                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendence;