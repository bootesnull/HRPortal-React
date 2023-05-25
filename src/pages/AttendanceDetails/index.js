import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { API_URL } from "../../api";

const AttendanceDetails = () => {

    // useParams is used to get the URL Parameters from the routing URL.
    const { id } = useParams()

    //States
    const [selectedDate, setSelectedDate] = useState("2023-05-23")
    const [attendanceLogs, setAttendanceLogs] = useState([])

    // Function to call Attendance Detail API
    const attendanceDetailsAPI = async () => {
        const response = await axios.post(`${API_URL}/api/attendence/attendence-per-user?id=${id}`, {
            "date": selectedDate
        })
        setAttendanceLogs(response?.data?.data[0])
    }

    useEffect(() => {
        attendanceDetailsAPI()
    }, [selectedDate])

    return (
        <div>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-body" >
                        <h5 className="card-title"><b>Attendance Details</b></h5>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="date" value={selectedDate} onChange={(e) => {
                                setSelectedDate(e.target.value)
                            }}></input>
                            <p style={{ marginLeft: "10px", marginBottom: "0" }}>Total Working Hours
                                <span style={{ fontSize: "18px", marginLeft: "10px" }}><b>{attendanceLogs?.total_time ? `${attendanceLogs?.total_time?.split(":")[0]}hours ${attendanceLogs?.total_time?.split(":")[1]}minutes` : `00hours 00minutes`}</b></span></p>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Check In</th>
                                        <th>Check Out</th>
                                        <th>Session Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceLogs?.session_data && attendanceLogs?.session_data.map((ele) => {
                                        return (
                                            <tr>
                                                <td>{moment(ele?.checkInTime).format("LTS")}</td>
                                                <td>{moment(ele?.checkOutTime).format("LTS") === "Invalid date" ? "00:00:00" : moment(ele.checkOutTime).format("LTS")}</td>
                                                <td>{`${ele?.session_time?.split(":")[0]}hours${ele?.session_time?.split(":")[1]}minutes`}</td>
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
export default AttendanceDetails;