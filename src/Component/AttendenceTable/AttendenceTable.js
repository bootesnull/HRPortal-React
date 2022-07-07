import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { attendencelist,  } from "../../reducers/attendenceReducer";


const AttendenceTable = () => {

    // const dispatch = useDispatch();
    const [attendenceTbData, setAttendenceTbData] = useState([{}]);

    useEffect(()=>{
        const callback = (data) => {
            setAttendenceTbData([...data])
        }
        attendencelist(callback)
    },[])

  

    return(
        <div>
             <h5 className="card-title"><b>Attendence List</b></h5>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Total Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {attendenceTbData && attendenceTbData.map((attendence, index) => {
                        return (
                            <tr key={index}>
                                <td>{attendence?.date?.slice(0, 10)}</td>
                                <td>{attendence?.checkin?.slice(0, 10)}</td>
                                <td>{attendence?.checkout?.slice(0, 10)}</td>
                                <td>{attendence.hours}</td>
                                <td>{attendence?.attendence}</td>
                                <td><button className="btn btn-secondary  btn-sm mx-1">Edit</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>




        </div>
    );
}

export default AttendenceTable;