import React from "react";
import AllowPermissionTable from "../../Component/PermissionTable/AllowPermissionTable";


const AllowPermission = () => {
    return (
        <div>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-body" >
                        <AllowPermissionTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllowPermission;