import './permissionTable.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermissionList } from "../../reducers/permissionReducer";
import {API_URL, token } from '../../api'

const Permission = () => {
    const [permissionTbData, setPermissionTbData] = useState([{}]);
    const permissionDetails = useSelector((state) => state.Permissions.permissionList)
    //console.log(userDetails);

    const dispatch = useDispatch();
    
    const permissionList = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/rbac/permission/list`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            let data = await response.json();
           // console.log(data);
            dispatch(fetchPermissionList(data.data))

        } catch (e) {
            //console.log("Error", e.response.data);
        }
    }
    
    useEffect(() => {
        permissionList()
    }, [])

    useEffect(() => {
        setPermissionTbData(permissionDetails)
    }, [permissionDetails])


    //fetchUsersList


    return (
        <div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Parent</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {permissionTbData.map((permit, index) => {
                        return (
                            <tr key={index}>
                                <td>{permit.id}</td>
                                <td>{permit.permission_name}</td>
                                <td>{permit.parent}</td>
                                <td>{permit.status}</td>
                                <td>
                                    <button className="btn btn-primary  btn-sm mx-1">View Detail</button>
                                    <button className="btn btn-secondary  btn-sm mx-1">Update</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Permission;