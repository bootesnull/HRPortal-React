import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../api";

const LeaveDetails = () => {

    const { id } = useParams()
    const [employeeLeaveData, setEmployeeLeaveData] = useState([]);
    const [currentAndLastMonth, setCurrentAndLastMonth] = useState([]);

    const pendingLeaveCount = async () => {
        const response = await axios.get(`${API_URL}/api/leaves/user-pending-leaves?id=${id}`)
        setEmployeeLeaveData(response?.data?.data)
    }

    const currentAndLastMonthLeaveDetails = async () => {
        const response = await axios.get(`${API_URL}/api/leaves/leave-taken-last-currnet-month?id=${id}`)
        setCurrentAndLastMonth(response.data.data[0])
    }

    useEffect(() => {
        pendingLeaveCount()
        currentAndLastMonthLeaveDetails()
    }, [])

    return (
        <div>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-body" >
                        <h5 className="card-title"><b>Leave Count Details</b></h5>
                        <div>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Leave Type</th>
                                        <th>Leaves Taken</th>
                                        <th>Pending Leaves</th>
                                        <th>Total Leaves</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employeeLeaveData && employeeLeaveData.map((ele) => {
                                        return (
                                            <tr>
                                                <td>{ele.leave_type}</td>
                                                <td>{ele.leave_taken}</td>
                                                <td>{ele.pending_leave}</td>
                                                <td>{ele.total_leave}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "20px" }} className='container-fluid'>
                <div className="card">
                    <div className="card-body" >
                        <h5 className="card-title"><b>Current Month Leave Details</b></h5>
                        <div>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Leave Type</th>
                                        <th>Leaves Taken</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentAndLastMonth.current_month_leave
                                        && currentAndLastMonth.current_month_leave.map((ele) => {
                                            return (
                                                <tr>
                                                    <td>{ele.leave_type}</td>
                                                    <td>{ele.taken_leave}</td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "20px" }} className='container-fluid'>
                <div className="card">
                    <div className="card-body" >
                        <h5 className="card-title"><b>Last Month Leave Details</b></h5>
                        <div>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Leave Type</th>
                                        <th>Leaves Taken</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentAndLastMonth.last_month_leave
                                        && currentAndLastMonth.last_month_leave.map((ele) => {
                                            return (
                                                <tr>
                                                    <td>{ele.leave_type}</td>
                                                    <td>{ele.taken_leave}</td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LeaveDetails