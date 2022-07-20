import React, { useState, useEffect } from "react";
import TableModal from "../utils/TableModal";
import { useSelector, useDispatch } from "react-redux";
//import {API_URL, token} from '../../api'
import { leaveTypeList, leaveStatus, leaveTypeAdd, leaveTypeEdit, leaveListbyUser, leaveDelete, leaveViewId } from "../../reducers/leavesReducer";
import { toast } from "react-toastify";
import Moment from 'react-moment';

const LeavesListType = () => {

    const [leavesTypeData, setLeavesTypeData] = useState([{}]);
   // const [fetchLeaveList, setFetchLeaveList] = useState([{}]);
    const leaveDetails = useSelector((state) => state.Leaves)

    const [showBasicModal, setShowBasicModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    const [addLeaveType, setAddLeaveType] = useState({
        leaveTypeName: "",
        isPaid:"",
        allowNumberOfLeaves:"",
    });

    const [editLeaveType, setEditLeaveType] = useState({
        id:"",
        leaveTypeName: "",
        isPaid:"",
        allowNumberOfLeaves:"",
    });
    const [leavesUserList,setLeavesUserList] =useState([{}])


    const dispatch = useDispatch();

    useEffect(()=> {
        const callback = (data) => {
        setLeavesTypeData ([...data]);
        };
        leaveTypeList(callback);
    },[])

  //leave list by users  
    useEffect(()=> {
        const callback = (data) => {
        setLeavesUserList ([...data]);
        };
        leaveListbyUser(callback);
    },[])



    useEffect(()=> {
        if (leaveDetails.statusCode===200){
            toast.success(leaveDetails.message);
        }
        if (leaveDetails.statusCode===404){
            toast.error(leaveDetails.message);
        }

    },[]);



    //show Modal Handler
    const showModal = () => {
        setShowBasicModal(true);
    }

    const handleUpdateStatus = (e, id) => {
        let value = e.target.checked ? 1 :0;
        dispatch(leaveStatus({value, id}))
    }


    // Add Leave type
    const handleAddChange =(e) => {
        setAddLeaveType((a) => {
            return { ...a, [e.target.name]:e.target.value }
        })
        //console.log(e.target.name, e.target.value)
    }
 
    const handleAddLeaveType = (e) => {
        console.log(e);
        e.preventDefault();
        console.log(addLeaveType)
        dispatch(leaveTypeAdd(addLeaveType))
        setShowBasicModal(false);
    }

    // Edit Leave type

    const handleEditChange =(e) => {
        setEditLeaveType((prevState) => {
            return { ...prevState, [e.target.name]:e.target.value }
        })
        //console.log(e.target.name, e.target.value)
    }
    const handleEditLeaveType = (e) => {
        console.log(e);
        e.preventDefault();
        console.log(editLeaveType);
        dispatch(leaveTypeEdit(editLeaveType))
    }

    const handleDeleteLeave = (id) => {
        console.log(id)
        dispatch(leaveDelete(id))
    }
    const [activeTab, setActiveTab] = useState("tab1");
    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab("tab1");
      };
      const handleTab2 = () => {
        // update the state to tab2
        setActiveTab("tab2");
      };


      

    return (
        <div>




            <div className="Tabs">
                <ul className="nav nav-tabs">
                    <li  className={`nav-link ${activeTab === 'tab1' ? '  active' : ''}`} onClick={handleTab1 }> Leaves List </li>
                    <li  className={`nav-link ${activeTab === 'tab2' ? '  active' : ''}`} onClick={handleTab2 }> Leaves List Type </li>
                </ul>
                <div className="tab-content">
                    {(activeTab === "tab1" ? 
                        <div className="tab-pane fade show active">
                            <h5 className="card-title"><b> Leaves List</b>
                                    <button
                                        className="btn btn-primary modal-btn"
                                        onClick={() => {
                                            setModalTitle('Add Leave Type')
                                            showModal()
                                        }}>Approve Leave</button>

                            </h5>

                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Leave ID</th>
                                        {/* <th>Leave Type ID</th> */}
                                        <th>Leave Type Name</th>
                                        <th>Paid</th>
                                        <th>Approver</th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>Allowed</th>
                                        <th>Approved By</th>
                                        <th>Total Leave Days</th>
                                        <th>Leave Status</th>
                                        <th style={{width: "100px"}}>Reasons</th>
                                        <th style={{width: "100px"}}>Document</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leavesUserList && leavesUserList?.map((userLeave, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{userLeave.leaves_id}</td>
                                                {/* <td>{userLeave.leave_type_id}</td> */}
                                                <td>{userLeave.leave_type_name}</td>
                                                <td className="text-capitalize">{userLeave.is_paid}</td>
                                                <td>{userLeave.approver}</td>
                                                <td><Moment format="DD/MM/YYYY">{userLeave.from_date}</Moment></td>
                                                <td><Moment format="DD/MM/YYYY">{userLeave.to_date}</Moment> </td>
                                                <td>{userLeave.allow_number_of_leaves} Leaves</td>
                                                <td>{userLeave.approved_by}</td>
                                                <td>{userLeave.total_leaves_days}</td>
                                                <td>{userLeave.leave_status}</td>
                                                <td>{userLeave.reasons}</td>
                                                <td>{userLeave.document}</td>
                                                <td>
                                                    <button className="btn btn-secondary  btn-sm mx-1">Edit</button>
                                                    <button className="btn btn-secondary  btn-sm mx-1" onClick={()=> handleDeleteLeave(userLeave.leaves_id) }>Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>



                        </div>
                        : 
                        <div className="tab-pane fade show active">
                            <h5 className="card-title"><b> Leaves List Types</b>
                                    <button
                                        className="btn btn-primary modal-btn"
                                        onClick={() => {
                                            setModalTitle('Add Leave Type')
                                            showModal()
                                        }}>Add Leave Type</button>

                            </h5>

                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#Leave ID</th>
                                        <th>Leave Type Name</th>
                                        <th>Paid</th>
                                        <th>Allow Number of Leaves</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                        <th>Updated At</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {leavesTypeData && leavesTypeData?.map((leave, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{leave.id}</td>
                                                <td>{leave.leave_type_name}</td>
                                                <td className="text-capitalize">{leave.is_paid}</td>
                                                <td>{leave.allow_number_of_leaves}</td>
                                                <td>
                                                    <input type="checkbox"
                                                        className='cm-toggle'
                                                        checked={leave.status}
                                                        name="status"
                                                        id={leave.id}
                                                        value={leave.status}
                                                        onChange={(e) => handleUpdateStatus(e, leave.id)}
                                                    />
                                                </td>
                                                <td>{leave?.created_at?.slice(0, 10)}</td>
                                                <td>{leave?.updated_at?.slice(0, 10)}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm mx-1"
                                                        onClick={() => {
                                                            setModalTitle('Edit Leave Type')
                                                            showModal()
                                                        }}>Edit</button>

                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>



                            <TableModal
                                show={showBasicModal}
                                cancelModal={setShowBasicModal}
                                modalHeading={modalTitle}

                                structure={(
                                    <>
                                    {/* <form onSubmit={handleEditLeaveType} >
                                        <div className="mb-3">
                                            <label className="form-label">Leave Type Name</label>
                                            <input type="text" className="form-control" name="leaveTypeName" placeholder="Add Leave Type"  autoComplete="off" onChange={handleAddChange} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Paid Leave</label>
                                            <select className="form-select" name="isPaid" onChange={handleAddChange} >
                                                <option defaultValue>Select Type</option>
                                                <option defaultValue>Yes</option>
                                                <option defaultValue>No</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Allow Number of Leaves</label>
                                            <input type="text" name="allowNumberOfLeaves" className="form-control" placeholder="Add Leave Count"  autoComplete="off" onChange={handleAddChange} />
                                        </div>

                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={(e) => setShowBasicModal(false)}  >Cancel</button>
                                            <button type="submit" className="btn btn-primary"   >Save</button>
                                        </div>

                                    </form> */}

                                    <form onSubmit={handleAddLeaveType} >
                                        <div className="mb-3">
                                            <label className="form-label">Leave Type Name</label>
                                            <input type="text" className="form-control" name="leaveTypeName" placeholder="Add Leave Type"  autoComplete="off" onChange={handleAddChange} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Paid Leave</label>
                                            <select className="form-select" name="isPaid" onChange={handleAddChange} >
                                                <option defaultValue>Select Type</option>
                                                <option defaultValue>Yes</option>
                                                <option defaultValue>No</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Allow Number of Leaves</label>
                                            <input type="text" name="allowNumberOfLeaves" className="form-control" placeholder="Add Leave Count"  autoComplete="off" onChange={handleAddChange} />
                                        </div>

                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={(e) => setShowBasicModal(false)}  >Cancel</button>
                                            <button type="submit" className="btn btn-primary"   >Save</button>
                                        </div>

                                    </form>
                                    </>
                                )}
                            />

                        </div>
                    )}
                </div>
            </div>


            


            



        </div>
    );
}

export default LeavesListType;