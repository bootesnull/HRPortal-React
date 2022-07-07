import React, { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import { usersList } from "../../reducers/userReducer";

import { Link } from "react-router-dom";
const UsersTable = () => {
    const [userTbData, setUserTbData] = useState([{}]);
    const userDetails = useSelector((state) => state.Users)



    useEffect(()=> {
        const callback = (data) => {
            setUserTbData([...data]);
        }
        usersList(callback);
    },[userDetails])

  

    return (
        <div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userTbData.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.gender}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.role}</td>
                                <td>{user.status}</td>
                                <td>
                                    {/* <button className="btn btn-primary  btn-sm mx-1">View Detail</button> */}
                                  
                                    <Link className="btn btn-secondary  btn-sm mx-1" to={'/editUserDetails/'+ user.id}>Update</Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;