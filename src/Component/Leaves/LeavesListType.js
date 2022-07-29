import React, { useState, useEffect } from "react";
import TableModal from "../utils/TableModal";
import { useSelector, useDispatch } from "react-redux";
//import {API_URL, token} from '../../api'
import { leaveTypeList, leaveTypeStatus, leaveTypeAdd, leaveTypeViewId, leaveTypeEdit, leaveListbyUser, leaveApprove  } from "../../reducers/leavesReducer";
import { toast } from "react-toastify";
import Moment from 'react-moment';

const LeavesListType = () => {

    const [leavesTypeData, setLeavesTypeData] = useState([{}]);
   // const [fetchLeaveList, setFetchLeaveList] = useState([{}]);
    const leaveRendering = useSelector((state) => state.Leaves)
    const dispatch = useDispatch();

    const [showBasicModal, setShowBasicModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [flag, setFlag] = useState();

    const [addLeaveType, setAddLeaveType] = useState({});

    const [editLeaveType, setEditLeaveType] = useState({ });
    


    useEffect(()=> {
        const callback = (data) => {
        setLeavesTypeData ([...data]);
        };
        leaveTypeList(callback);
    },[leaveRendering])


    useEffect(() => {
        if(leaveRendering.statusCode === 200) {
            toast.success(leaveRendering.message);
        }
        if(leaveRendering.statusCode === 500) {
            toast.error(leaveRendering.message);
        }
    }, []);

    //show Modal Handler
    const showModal = () => {
        setShowBasicModal(true);
    }

    const handleUpdateStatus = (e, id) => {
        let value = e.target.checked ? 1 :0;
        dispatch(leaveTypeStatus({value, id}))
    }

    // Add Leave type
    const handleAddChange =(e) => {
        setAddLeaveType((a) => {
            return { ...a, [e.target.name]:e.target.value }
        })
    }
 
    const handleAddLeaveType = (e) => {
        console.log(e);
        e.preventDefault();
        console.log(addLeaveType)
        dispatch(leaveTypeAdd(addLeaveType))
        setShowBasicModal(false);
    }

    // Edit Leave type

    useEffect(() => {
        if (!leaveRendering) return;
        setEditLeaveType({ ...leaveRendering.data })

    }, [leaveRendering]);


    const handleEditTypeChange =(e) => {
        setEditLeaveType((prevState) => {
            return { ...prevState, [e.target.name]:e.target.value }
        })
        console.log(e.target.name, e.target.value)
    }

    const handleEditLeaveType = (id) => {
        console.log(id);
        showModal()
        setModalTitle('Edit Leave Type')
        setFlag(true);
        dispatch(leaveTypeViewId(id))
    }

    const handleEditLeaveTypeSave = (e) => {
        console.log(editLeaveType)
        e.preventDefault();
        dispatch(leaveTypeEdit(editLeaveType))
        setShowBasicModal(false);
    }


    const [activeTab, setActiveTab] = useState("tab1");
    const [leavesUserList,setLeavesUserList] =useState([{}])
    const [leaveStatus, setLeaveStatus] = useState();
   
    //leave list by users  
    useEffect(()=> {
        const callback = (data) => {
        setLeavesUserList ([...data]);
        };
        leaveListbyUser(callback);
    },[leaveRendering])

    const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
    };
    const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
    };

    //leave status change
    const handleStatusChange = (e,id) => {
        setLeaveStatus(e.target.value)
        const newArr = leavesUserList.map(obj => {
            if (obj.leaves_id === id) {
              return {...obj, status: e.target.value};
            }
            return obj;
        });

        setLeavesUserList([...newArr])
    }

    //leave status approve api 
    const handleStatusUpdates = (id) => {
        dispatch(leaveApprove({id, leaveStatus}))
    }
      

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
                            <h5 className="card-title"><b> Leaves List</b></h5>

                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        {/* <th>#ID</th> */}
                                        <th>Leave&nbsp;ID</th>
                                        <th>User&nbsp;ID</th>
                                        <th>User Name</th>
                                        <th>Leave Type</th>
                                        <th>Paid</th>
                                        <th>Approver</th>
                                        <th>Apply Date</th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>Reasons</th>
                                        <th width="100">Document</th>
                                        <th>Allowed</th>
                                        {/* <th>Approved By</th> */}
                                        <th>Total Leave</th>
                                        <th>Leave Status</th>
                                     
                                    </tr>
                                </thead>
                                <tbody>
                                    {leavesUserList && leavesUserList?.map((userLeave, index) => {
                                        return (
                                            <tr key={index}>
                                                {/* <td>{userLeave.id}</td> */}
                                                <td>{userLeave.leaves_id}</td>
                                                <td>{userLeave.user_id}</td>
                                                <td>{userLeave.user_name}</td>
                                                <td>{userLeave.leave_type_name}</td>
                                                <td className="text-capitalize">{userLeave.is_paid}</td>
                                                <td>{userLeave.approver}</td>
                                                <td>{userLeave.formatedApplyDate}</td>
                                                <td>{userLeave.formatedFromDate}</td>
                                                <td>{userLeave.formatedToDate}</td>
                                                <td><div className="overflow-text">{userLeave.reasons}</div></td>
                                                <td><div style={{width: "130px"}}>{userLeave?.document?.split('/').pop() ? userLeave?.document?.split('/').pop() : "No Document"}</div></td>
                                                <td>{userLeave.allow_number_of_leaves} Leaves</td>
                                                {/* <td>{userLeave.approved_by}</td> */}
                                                <td><div style={{width: "100px"}}>{userLeave.total_leaves_days}</div></td>
                                                <td>
                                                    <div style={{width: "200px"}}>
                                                        <select className="form-select status-select" name="status" value={userLeave.status}  onChange={(e)=> handleStatusChange(e,userLeave.leaves_id)}>
                                                            <option value="1">Pending</option>
                                                            <option value="2">Approved</option>
                                                            <option value="3">Rejected</option>
                                                        </select>
                                                        <button 
                                                            className="btn btn-primary btn-sm mx-1"
                                                            onClick={() => handleStatusUpdates(userLeave.leaves_id, userLeave.status)} >Update</button>
                                                    </div>        
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
                                            setFlag(false)
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
                                                        value={leave.status  || ""}
                                                        onChange={(e) => handleUpdateStatus(e, leave.id)}
                                                    />
                                                </td>
                                                {/* {leave?.created_at?.slice(0, 10)} */}
                                                <td><Moment format="DD/MM/YYYY">{leave?.created_at}</Moment></td>
                                                 <td>
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm mx-1"
                                                        onClick={() => handleEditLeaveType(leave.id)}>Edit</button>

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
                                    <div>
                                    {flag ? 
                                    (<>
                                        <form onSubmit={handleEditLeaveTypeSave} >
                                            <div className="mb-3">
                                                <label className="form-label">Edit Leave Type Name</label>
                                                <input type="text" value={editLeaveType.leave_type_name} className="form-control" name="leave_type_name" placeholder="Add Leave Type"  autoComplete="off" onChange={handleEditTypeChange} />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Paid Leave</label>
                                                <select className="form-select" name="is_paid" value={editLeaveType.is_paid}  onChange={handleEditTypeChange} >
                                                    <option value="no">No</option>
                                                    <option value="yes">Yes</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Allow Number of Leaves</label>
                                                <input type="text" value={editLeaveType.allow_number_of_leaves} name="allow_number_of_leaves" className="form-control" placeholder="Add Leave Count"  autoComplete="off" onChange={handleEditTypeChange} />
                                            </div>

                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={(e) => setShowBasicModal(false)}  >Cancel</button>
                                                <button type="submit" className="btn btn-primary"   >Save</button>
                                            </div>

                                        </form>
                                    </>) : 

                                    (<>
                                        <form onSubmit={handleAddLeaveType} >
                                            <div className="mb-3">
                                                <label className="form-label">Leave Type Name</label>
                                                <input type="text" className="form-control" name="leave_type_name" placeholder="Add Leave Type"  autoComplete="off" onChange={handleAddChange} />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Paid Leave</label>
                                                <select className="form-select" name="is_paid" onChange={handleAddChange} >
                                                    <option value="no">No</option>
                                                    <option value="yes">Yes</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Allow Number of Leaves</label>
                                                <input type="text" name="allow_number_of_leaves" className="form-control" placeholder="Add Leave Count"  autoComplete="off" onChange={handleAddChange} />
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
                    )}
                </div>
            </div>


            


            



        </div>
    );
}

export default LeavesListType;