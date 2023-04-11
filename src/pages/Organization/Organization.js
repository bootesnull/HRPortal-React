import React from "react";
import OrganizationTable from "../../Component/OrganizationTable/OrganizationTable";


const Organization = () => {
    return (
        <>
            <div className='container-fluid h-100'>
                <div className="card h-100">
                    <div className="card-body" >
                        <OrganizationTable />

                    </div>
                </div>
            </div>
        </>
    );
};

export default Organization;