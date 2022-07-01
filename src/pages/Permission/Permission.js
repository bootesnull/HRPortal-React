import React from "react";
import PermissionTable from '../../Component/PermissionTable/PermissionTable'

const Permission = () => {
    return (
        <div>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-body" >
                        <PermissionTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Permission;