import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { attendencelist,  } from "../../reducers/attendenceReducer";


const AttendenceTable = () => {

    const dispatch = useDispatch();
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
                        <th>#ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created at</th>
                        {/* <th>Updated at</th> */}
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {attendenceTbData && attendenceTbData.map((announce, index) => {
                        return (
                            <tr key={index}>
                                <td>{announce.id}</td>
                                <td>{announce.title}</td>
                                <td>{announce.description}</td>
                                <td>{announce?.created_at?.slice(0, 10)}</td>
                                {/* <td>{announce?.updated_at?.slice(0, 10)}</td> */}
                                <td>
                                    <input type="checkbox"
                                            className='cm-toggle'
                                            checked={announce.status}
                                            name="status"
                                            id={announce.id}
                                            value={announce.status}
                                            // onChange={(e)=> handleUpdateStatus(e, announce.id) }
                                    />        
                                </td>
                                <td>
                                    <button className="btn btn-secondary  btn-sm mx-1"
                                        
                                    >Edit</button>
                                    <button className="btn btn-secondary  btn-sm mx-1"
                                        
                                        >Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>




        </div>
    );
}

export default AttendenceTable;