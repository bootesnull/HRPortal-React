import React from "react";
import ReportsTable from "../../Component/ReportsTable/ReportsTable";

const Reports = () => {
    return (
        <div>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-body" >
                        <ReportsTable />

                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;