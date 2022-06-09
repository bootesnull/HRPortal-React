import React from "react";
import UsersTable from "../../Component/UsersTable/UserTable";

const UsersList = () => {
    return (
        <div>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-body" >
                        <h5 className="card-title"><b>Users List</b></h5>
                        <UsersTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersList;