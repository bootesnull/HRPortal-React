import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskList, deleteTask, createTask, viewTask, editTask  } from "../../reducers/reportsReducer";
import { usersList } from "../../reducers/userReducer";
import TableModal from "../utils/TableModal";
import { toast } from "react-toastify";

const ReportsTable = () => {

    const dispatch = useDispatch();
    const [reportTbData, setReportTbData] = useState([{}]);
    const reportlistRender = useSelector((state)=> state.Reports);
    const [showBasicModal, setShowBasicModal]= useState(false);
    const [modalTitle, setModalTitle]= useState();
    const [addTask, setAddTask] = useState({
        title: "",
        userId: "",
    });

    const [flag, setFlag] = useState()
    const [editTaskform, setEditTaskForm] = useState({});
  
    useEffect(()=>{
        const callback = (data) => {
            setReportTbData([...data])
        }
        taskList(callback)
    },[reportlistRender])

    useEffect(()=>{
        setEditTaskForm({...reportlistRender.data})
    },[reportlistRender])

//console.log(editTaskform);
    const [fetchUsers, setFetchUsers] = useState([]);
    useEffect(()=> {
        const callback = (data) => {
            setFetchUsers([...data]);
        }
        usersList(callback);
    },[])


    useEffect(()=>{
        if (reportlistRender.statusCode===201) {
            toast.success(reportlistRender.message);
        }
        if (reportlistRender.statusCode===500) {
            toast.error(reportlistRender.message);
        }
    },[reportlistRender])


    // Task delete handle
    const handleDelete = (id) => {
        //console.log(id)
        dispatch(deleteTask(id))
    }

    const showModal = () => {
        setShowBasicModal(true);
    }
  
    const handleAddTask = (e) => {
        e.preventDefault();
        dispatch(createTask(addTask));
        e.target.reset();
        //setShowBasicModal(false)
    }

    const handleChangeTask = (e) => {
       setAddTask((prevState)=> {
            return {...prevState, [e.target.name]: e.target.value}
       }) 
    }

    const handleEditTaskModal = (id) => {
       // console.log(id)
        showModal()
        setModalTitle('Edit Task')
        setFlag(true);
        dispatch(viewTask(id))
    }

    const handleEditChangeTask = (e) => {
        setEditTaskForm((prevState)=> {
             return {...prevState, [e.target.name]: e.target.value}
        }) 
     }

    const handleEditTask = (e) => {
        e.preventDefault();
        dispatch(editTask(editTaskform))
        setShowBasicModal(false)
    }

    const[selectUserName,setSelectUserName] = useState('')

  

    useEffect(() => {
        let fetchUserName = fetchUsers.filter((item, index) => editTaskform.user_id===item.id )
        setSelectUserName(fetchUserName[0]?.name)
    },[editTaskform?.user_id]);



    
    return(
        <div>
             <h5 className="card-title"><b>Task List</b>
                    <button
                        className="btn btn-primary modal-btn"
                        onClick={()=>{
                            showModal()
                            setModalTitle('Add New Task')
                            setFlag( false)
                        }}
                        >Add Task</button>
            </h5>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Title</th>
                        <th>User Name</th>
                        <th>User ID</th>
                        <th>Created by</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reportTbData && reportTbData.map((reports, index) => {
                        return (
                            <tr key={index}>
                                <td>{reports.id}</td>
                                <td>{reports.title}</td>
                                <td>{reports.user_name}</td>
                                <td>{reports.user_id}</td>
                                <td>{reports.created_by}</td>
                                <td>
                                    <button className="btn btn-secondary  btn-sm mx-1"
                                        onClick={()=>{
                                            handleEditTaskModal(reports.id)
                                        }}
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
                        {flag ? 
                        (<>
                            <form onSubmit={handleEditTask} >
                                <div className="mb-3">
                                    <label className="form-label">Update Task Title</label>
                                    <input type="text" className="form-control" name="title" value={editTaskform.title} placeholder="Add Task Name"  autoComplete="off" onChange={handleEditChangeTask} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Update User Name</label>
                                    <select className="form-select" name="user_id" onChange={handleEditChangeTask} >
                                        <option value={selectUserName}>{selectUserName ? selectUserName : "Select User"}</option>
                                        {fetchUsers && fetchUsers.map((userData, id) => {return   <option key={id} value={userData.id}>{userData.name}</option>})}
                                    </select>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={(e) => setShowBasicModal(false)}  >Cancel</button>
                                    <button type="submit" className="btn btn-primary"   >Save</button>
                                </div>
                            </form>
                        </>) 
                        : 

                        (<>
                            <form onSubmit={handleAddTask} >
                                <div className="mb-3">
                                    <label className="form-label">Task Title</label>
                                    <input type="text" className="form-control" name="title" placeholder="Add Task Name"  autoComplete="off" onChange={handleChangeTask} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">User Name</label>
                                    <select className="form-select" name="userId" onChange={handleChangeTask} >
                                        <option defaultValue>Select User</option>
                                        {fetchUsers && fetchUsers.map((userData, id) => {return   <option key={id} value={userData.id}>{userData.name}</option>})}
                                    </select>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={(e) => setShowBasicModal(false)}  >Cancel</button>
                                    <button type="submit" className="btn btn-primary"   >Save</button>
                                </div>
                            </form>
                        </>) 
                        }
                        

                    </div>
                )}
            />



        </div>
    );
}

export default ReportsTable;