import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersList } from "../../reducers/userReducer";
import {API_URL, token } from '../../api'

const UsersTable = () => {
    const [userTbData, setUserTbData] = useState([{}]);
    const userDetails = useSelector((state) => state.Users.userList)
    //console.log(userDetails);

    const dispatch = useDispatch();
    
    const usersList = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/user/list`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            let data = await response.json();
            console.log(data);
            dispatch(fetchUsersList(data.data))

        } catch (e) {
            //console.log("Error", e.response.data);
        }
    }
    
    useEffect(() => {
        usersList()
    }, [])

    useEffect(() => {
        setUserTbData(userDetails)
    }, [userDetails])


    //fetchUsersList


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

export default UsersTable;