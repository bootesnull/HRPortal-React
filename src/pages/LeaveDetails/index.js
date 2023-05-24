import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { DatePicker, Input } from "antd";
import "antd/dist/antd.css";
import { API_URL } from "../../api";

const LeaveDetails = () => {

    // useParams is used to get the URL Parameters from the routing URL.
    const { id } = useParams()
    const monthArray = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    //States
    const [employeeLeaveData, setEmployeeLeaveData] = useState([]);
    const [currentAndLastMonth, setCurrentAndLastMonth] = useState([]);
    const [month, setMonth] = useState("2023-05")
    const [monthName, setMonthName] = useState("")

    // Function to call pending leaves count API
    const pendingLeaveCount = async () => {
        const response = await axios.get(`${API_URL}/api/leaves/user-pending-leaves?id=${id}`)
        setEmployeeLeaveData(response?.data?.data)
    }

    //Function to call CurrentAndLastMonthLeaves API
    const currentAndLastMonthLeaveDetails = async () => {
        const response = await axios.get(`${API_URL}/api/leaves/leave-taken-last-currnet-month?id=${id}&month=${month}`)
        setCurrentAndLastMonth(response.data.data[0])
    }

    //Function used to handle the change of month
    const monthOnChange = (date, dateString) => {
        setMonth(dateString)
    }

    useEffect(() => {
        pendingLeaveCount()
    }, [])

    useEffect(() => {
        if (month.length) {
            currentAndLastMonthLeaveDetails()
            setMonthName(monthArray[new Date(month).getMonth()])
        }
    }, [month])

    return (
        <div>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-body" >
                        <h5 className="card-title"><b>Leave Count Details</b></h5>
                        <div style={{ marginTop: "20px" }}>
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
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginRight: "5px", fontSize: "16px" }}>Select Month</span>
                            <DatePicker defaultValue={dayjs("2023-05", "YYYY-MM")} format={"YYYY-MM"} onChange={monthOnChange} picker="month" />
                            <span style={{ marginLeft: "20px", fontSize: "16px" }}>Month</span>
                            <Input disabled style={{ marginLeft: "5px", width: 200 }} value={monthName}/>
                        </div>
                        <div style={{ marginTop: "15px" }}>
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
            <div style={{ marginTop: "15px" }} className='container-fluid'>
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