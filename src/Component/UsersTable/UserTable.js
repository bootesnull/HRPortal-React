import React, { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import { } from "../../reducers/userReducer";
import { API_URL, token } from '../../api'
import { Link } from "react-router-dom";
const UsersTable = () => {
    const [userTbData, setUserTbData] = useState([{}]);
    const userDetails = useSelector((state) => state.Users)
    const [fetchUserList, setFetchUserList] = useState([{}])
   
    useEffect(() => {
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
                console.log(data.data);
                setFetchUserList(data.data)

            } catch (e) {
                // console.log("Error", e.response.data);
            }
        }
        usersList()
    }, [userDetails])



    useEffect(() => {
        setUserTbData(fetchUserList)
    }, [fetchUserList])

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