import './permissionTable.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { allowPermissionListing, allowPermissionStatus, assignRolePermission, allowPermissionView,allowPermissionEdit  } from '../../reducers/allowPermissionReducer'; //
import { permissionList } from '../../reducers/permissionReducer';
import { rolesList } from '../../reducers/rolesReducer';
import TableModal from '../utils/TableModal';
import { toast } from "react-toastify";


const AllowPermissionTable = () => {
   
    const [allowPermissionTbData, setAllowPermissionTbData] = useState([{}]);
    const allowPermissionList = useSelector((state) => state.AllowPermission)
    
    const dispatch = useDispatch();
    const [allowRolePermission, setAllowRolePermission] = useState([{
        roleId:'',
        permissionId:'',
    }])
    const [showBasicModal, setShowBasicModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [flag, setFlag] = useState(false);

    const [editAllowRolePermission, setEditAllowRolePermission] = useState ([{}]);

    const[roleName,setSelectRoleName]=useState('')
    const[permissionName,setSelectPermissionName] = useState('')

    useEffect(()=> {
        const callback = (data) => {
            setAllowPermissionTbData([...data]);
        }
        allowPermissionListing(callback);
    },[allowPermissionList])


    useEffect(() => {
        if (allowPermissionList.statusCode === 200) {
            toast.success(allowPermissionList.message);
        }
        if (allowPermissionList.statusCode === 201) {
            toast.success(allowPermissionList.message);
        }
    }, [allowPermissionList])



// Permission list fetch for allow role permission assign
    const [fetchPermissionList, setFetchPermissionList] = useState([{}])

    useEffect(()=> {
        const callback = (data) => {
            setFetchPermissionList([...data]);
        }
        permissionList(callback);
    },[])

// Permission list fetch for allow role permission assign
    const [fetchRolesList, setFetchRolesList]= useState([{}]);

    useEffect(()=> {
        const callback = (data) => {
            setFetchRolesList([...data]);
        }
        rolesList(callback);
    },[])


    

    useEffect(() => {
        if (!allowPermissionList) return;
        setEditAllowRolePermission({ ...allowPermissionList.data })

    }, [allowPermissionList]);


    const handleEdit = (id) => {
        setModalTitle('Edit Allow Role Permission')
        showModal()
        dispatch(allowPermissionView(id))
        setFlag(true)
    }

    const handleEditChange = (e) => {
        setEditAllowRolePermission((prevState)=> {
            return { ...prevState, [e.target.name]:e.target.value}
        })
    }

    
    const handleEditAllowRolePermission = (e) => {
        e.preventDefault();
        dispatch(allowPermissionEdit(editAllowRolePermission));
        setShowBasicModal(false)
    }

    const handleAllowRolePermission =(e) => {
        e.preventDefault();
        dispatch(assignRolePermission(allowRolePermission));
        setShowBasicModal(false)
    }


    const handleAllowRolePermissionChange =(e) => {
        setAllowRolePermission((prevState)=> {
            return {...prevState, [e.target.name]: e.target.value }
        })
       // console.log (e.target.name, e.target.value)
    }

     // permission status updates
     const handleUpdateStatus = (e, id) => {
        let value = e.target.checked ? 1 : 0;
        // console.log(value)
        dispatch(allowPermissionStatus({ id, value }))
    };

    const showModal = () => {
        setShowBasicModal(true)
    }


    useEffect(()=>{
        let fetchRoleName = fetchRolesList.filter((item,index)=>editAllowRolePermission.role_id===item.id)
        setSelectRoleName(fetchRoleName[0]?.name)

    },[editAllowRolePermission?.role_id])

    useEffect(()=>{
        let fetchPermissionName = fetchPermissionList.filter((item,index)=>editAllowRolePermission.permission_id===item.id)
        setSelectPermissionName(fetchPermissionName[0]?.permission_name)

    },[editAllowRolePermission?.permission_id])
   

   
    return (
        <div>
             <h5 className="card-title"><b>Allow Permission List</b>
                    <button
                        className="btn btn-primary modal-btn"
                        onClick={()=> {
                            setFlag(false)
                            showModal();
                            setModalTitle ('Allow Roles Permission  ')
                        }}
                        >Allow  Role Permission</button>

            </h5>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#Allow ID</th>
                        <th>Role Name</th>
                        <th>Permission Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allowPermissionTbData && allowPermissionTbData.map((allowPermit, index) => {
                        return (
                            <tr key={index}>
                                <td>{allowPermit.allow_id}</td>
                                <td>{allowPermit.role_name}</td>
                                <td>{allowPermit.permission_name}</td>
                                <td>
                                    <input type="checkbox"
                                            className='cm-toggle'
                                            checked={allowPermit.status}
                                            name="status"
                                            id={allowPermit.allow_id}
                                            value={allowPermit.status || ""}
                                            onChange={(e)=> handleUpdateStatus(e, allowPermit.allow_id) }
                                    />        
                                </td>
                                <td>
                                    <button className="btn btn-secondary  btn-sm mx-1" onClick={() => handleEdit(allowPermit.allow_id)} >Edit</button>
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
                        {flag ? (<>
                        <form onSubmit={handleEditAllowRolePermission} >
                            <div className="mb-3">
                                <label className="form-label">Edit Role Name</label>
                                
                                <select className="form-select"  name="role_id" onChange={handleEditChange}>
                                <option value={roleName}>{roleName?roleName:"select option"}</option>
                                {fetchRolesList && fetchRolesList.map((rolesData, id) => {return   <option key={id} value={rolesData.id}>{rolesData.name}</option>})}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Edit Permission Name</label>
                                <select className="form-select" name="permission_id" onChange={handleEditChange}>
                                <option value={permissionName}>{permissionName?permissionName:"select permission"}</option>
                                {fetchPermissionList && fetchPermissionList.map((permissionData, id) => {return   <option key={id} value={permissionData.id}>{permissionData.permission_name}</option>})}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={(e)=>setShowBasicModal(false)}  >Cancel</button>
                                <button type="submit" className="btn btn-primary"  >Save</button>       
                            </div>
                        </form></>) : (<>

                        <form onSubmit={handleAllowRolePermission} >
                            <div className="mb-3">
                                <label className="form-label">Role Name</label>
                                <select className="form-select" name="roleId" onChange={handleAllowRolePermissionChange}>
                                <option defaultValue>Select Role Name</option>
                                {fetchRolesList && fetchRolesList.map((rolesData, id) => {return   <option key={id} value={rolesData.id}>{rolesData.name}</option>})}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Permission Name</label>
                                <select className="form-select" name="permissionId" onChange={handleAllowRolePermissionChange}>
                                <option defaultValue>Select Permission Name</option>
                                {fetchPermissionList && fetchPermissionList.map((permissionData, id) => {return   <option key={id} value={permissionData.id}>{permissionData.permission_name}</option>})}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={(e)=>setShowBasicModal(false)}  >Cancel</button>
                                <button type="submit" className="btn btn-primary"  >Save</button>       
                            </div>
                        </form>
                        </>)}

                    </div>
                )}
            />

          



        </div>
    );
};

export default AllowPermissionTable;