import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reportslist, deleteTask } from "../../reducers/reportsReducer";
import { usersList } from "../../reducers/userReducer";
import TableModal from "../utils/TableModal";
import { toast } from "react-toastify";

const ReportsTable = () => {

    const dispatch = useDispatch();
    const [reportTbData, setReportTbData] = useState([{}]);
    const reportlistRender = useSelector((state)=> state.Reports.reportsList);
    const [showBasicModal, setShowBasicModal]= useState(false);
    const [modalTitle, setModalTitle]= useState();
    const [addTask, setAddTask] = useState({});
  

    useEffect(()=>{
        const callback = (data) => {
            setReportTbData([...data])
        }
        reportslist(callback)
    },[reportlistRender])


    const [fetchUsersList, setFetchUserList] = useState({});
 
    useEffect(()=> {
        const callback = (data) => {
            setFetchUserList([...data]);
        }
        usersList(callback);
    },[])


    // useEffect(()=>{
    //     if (reportlistRender.statusCode===201) {
    //         toast.success(reportlistRender.message);
    //     }
    //     if (reportlistRender.statusCode===500) {
    //         toast.error(reportlistRender.message);
    //     }
    // },[reportlistRender])


    // Task delete handle
    const handleDelete = (id) => {
        console.log(id)
        dispatch(deleteTask(id))
    }

    const showModal = () => {
        setShowBasicModal(true);
    }
  
    const handleAddTask = (e) => {
        e.preventDefault();
    }
    const handleChangeTask = (e) => {
       setAddTask((prevState)=> {
            return {...prevState, [e.target.name]: e.target.value}
       }) 
    }

    return(
        <div>






             <h5 className="card-title"><b>Task List</b>
                    <button
                        className="btn btn-primary modal-btn"
                        onClick={()=>{
                            showModal()
                            setModalTitle('Add New Task')
                        }}
                        >Add Task</button>
            </h5>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Title</th>
                        <th>User ID</th>
                        <th>Created by</th>
                        {/* <th>Status</th> */}
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
                                        onClick={() => handleDelete(reports.id)}
                                        >Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            

            <TableModal 
                show={showBasicModal}
                modalHeading={modalTitle}
                cancelModal={setShowBasicModal}
                structure={(
                    <div>
                        <form onSubmit={handleAddTask} >
                            <div className="mb-3">
                                <label className="form-label">Task Title</label>
                                <input type="text" className="form-control" name="title" placeholder="Add Task Name"  autoComplete="off" onChange={handleChangeTask} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">User Name</label>
                                <select className="form-select" name="userId" onChange={handleChangeTask} >
                                    <option defaultValue>Select User</option>
                                    {fetchUsersList && fetchUsersList.map((userData, id)=> { return <option key={id} value={userData.id}>{userData.name}</option>})}
                                </select>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={(e) => setShowBasicModal(false)}  >Cancel</button>
                                <button type="submit" className="btn btn-primary"   >Save</button>
                            </div>

                        </form>

                    </div>
                )}
            />



        </div>
    );
}

export default ReportsTable;