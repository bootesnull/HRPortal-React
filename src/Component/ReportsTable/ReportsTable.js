import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { reportslist,  } from "../../reducers/reportsReducer";




const ReportsTable = () => {

    const dispatch = useDispatch();
    const [reportTbData, setReportTbData] = useState([{}]);

    useEffect(()=>{
        const callback = (data) => {
            setReportTbData([...data])
        }
        reportslist(callback)
    },[])

  

    return(
        <div>






             <h5 className="card-title"><b>Task List</b>
                    <button
                        className="btn btn-primary modal-btn"

                        >Add Task</button>
            </h5>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Title</th>
                        <th>User ID</th>
                        <th>Created by</th>
                        <th>Status</th>
                        <th>Created at</th>
                        <th>Updated at</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reportTbData && reportTbData.map((reports, index) => {
                        return (
                            <tr key={index}>
                                <td>{reports.id}</td>
                                <td>{reports.title}</td>
                                <td>{reports.user_id}</td>
                                <td>{reports.created_by}</td>
                                <td>
                                    {/* <input type="checkbox"
                                            className='cm-toggle'
                                            checked={reports.status}
                                            name="status"
                                            id={reports.id}
                                            value={reports.status}
                                            // onChange={(e)=> handleUpdateStatus(e, reports.id) }
                                    />         */}
                                </td>
                                <td>{reports?.created_at?.slice(0, 10)}</td>
                                <td>{reports?.updated_at?.slice(0, 10)}</td>
                                
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

export default ReportsTable;