import React, { useState, useEffect } from 'react';
import "./roletable.css"
import { useDispatch, useSelector } from 'react-redux';
import { createRoleList, roleEdit, roleStatus, roleUserAssign } from '../../reducers/rolesReducer'
import { API_URL, token } from '../../api'
import { toast  } from 'react-toastify';
import TableModal from "../utils/TableModal";


const RoleTable = () => {
    const [fetchList, setFetchList] = useState([{}])
    const [roleTbData, setRoleTbData] = useState([{}]);
    const roleDetails = useSelector((state) => state.Roles)




    //console.log(roleDetails.statusCode);
    const [showBasicModal, setShowBasicModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [editTableCol, setEditTableCol] = useState(null);
    const [addForm, setAddForm] = useState({
        id: "",
        name: "",
        status: '',
    });

    const [editFormData, setEditFormData] = useState([{
        id: "",
        name: "",
        status: '',
    }]);


    useEffect(()=>{
        if (roleDetails.statusCode===201) {
            toast.success(roleDetails.message);
        }
        if (roleDetails.statusCode===500) {
            toast.error(roleDetails.message);
        }
    },[roleDetails])
    


    // useEffect(()=>{
    //     if (roleDetails.statusCode==201) {
    //         setMessage((state)=>{
    //             return {...state,successMessage:roleDetails.message}
    //         });
    //     }
    //     if (roleDetails.statusCode==500) {
    //         setMessage((state)=>{
    //             return {...state,errorMessage:roleDetails.message}
    //         });
    //     }
    // },[roleDetails])
    

    const dispatch = useDispatch();


    const handleUpdateStatus = (e, id) => {
        let value = e.target.checked ? 1 : 0
        console.log(value)
        dispatch(roleStatus({ value, id }))
    }

    //   const handleUpdateStatus = (e,id,rolesData) => {
    //     console.log(id,rolesData);
    //     let newData = [...roleTbData]
    //     let value = e.target.checked ? 1:0
    //     newData[id]['status'] = value
    //     setRoleTbData(newData)
    //     dispatch(roleStatus({value,id}))

    //     console.log(e.target.value,e.target.checked);

    // }

    

    useEffect(() => {
        const roleList = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/rbac/role/list`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                    }
                );
                let data = await response.json();

                setFetchList(data.data)

            } catch (e) {
                // console.log("Error", e.response.data);
            }
        }
        roleList()
    }, [roleDetails])


    useEffect(() => {
        setRoleTbData(fetchList)
    }, [fetchList])



    const [fetchUserList, setFetchUserList] = useState([{}])

    /**************** */
    useEffect(() => {
        const usersList = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/user/list`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                    }
                );
                let data = await response.json();

                setFetchUserList(data.data)

            } catch (e) {
                // console.log("Error", e.response.data);
            }
        }
        usersList()
    }, [])


    // assign role by user_id and role_id
    const [roleAssign, setRoleAssign] = useState({ userId: '', roleId: '' });

    const handleRoleAssignChange = (e) => {
        setRoleAssign((a) => {
            return { ...a, [e.target.name]: e.target.value }
        })
    }





    const handleRoleAssignSave = (e) => {
        e.preventDefault();
        //console.log()
        dispatch(roleUserAssign(roleAssign))
        setShowBasicModal(false)

    }



    //add form-------------------------------
    const handleAddChange = (e) => {
        // console.log("name",e.target.name,"value",e.target.value);
        setAddForm((a) => {
            return { ...a, [e.target.name]: e.target.value }
        })

    };




    const handleAddData = (e) => {
        console.log(e);
        e.preventDefault();
        console.log(addForm.name);
        dispatch(createRoleList(addForm.name))
    }

    //edit col---------------------------------
    const handleEditCol = (rolesData) => {
        setEditTableCol(rolesData.id);
        setEditFormData((state) => {
            return { ...state, ...rolesData }
        });
    };

    //edit col onChange
    const handleEditChange = (e) => {
        setEditFormData((state) => {
            return { ...state, [e.target.name]: e.target.value }
        })
    };

    //edit save handler
    const handleEditSaveData = () => {

        // newData[index] = editFormData
        // setRoleTbData(newData)
        dispatch(roleEdit(editFormData))
        setEditTableCol(null);

    }

    //cancel edit handler
    const handleCancelEdit = () => {
        setEditTableCol(null);
    };




    //show Modal Handler
    const showModal = () => {
        setShowBasicModal(true);
    }

    // //search filter handler    
    const searchFilter = (e) => {
        const search = e.target.value.toLowerCase();
        const filterData = roleTbData.filter(newData => newData.name.toLowerCase().includes(search))
        setRoleTbData(filterData);
    };


    return (
        <div className="card">
            <div className="card-body" >
                <h5 className="card-title"><b>Role Table</b></h5>
                <div>
                    <button
                        className="btn btn-primary"
                        style={{ float: 'right', marginBottom: '15px' }}
                        onClick={() => {
                            setModalTitle('Assign Roles')
                            showModal()
                        }}>Assign Role</button>
                </div>

                <div className="d-flex justify-content-between my-3">
                    <div className="d-flex">
                        <div className="form-group has-search">
                            <span className="fa fa-search form-control-feedback"></span>
                            <input type="text" className="form-control"
                                onChange={(e) => searchFilter(e)}
                            />
                        </div>
                    </div>
                </div>

                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Role Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roleTbData && roleTbData.map((rolesData, id) => {
                            return (
                                <tr key={id}>
                                    <td>{rolesData.id}</td>
                                    <td> {editTableCol === rolesData.id ? (<input autoComplete="off" type="text" name="name" value={editFormData.name} onChange={handleEditChange} />) : (rolesData.name)}</td>
                                    <td><input type="checkbox"
                                        className='cm-toggle'
                                        checked={rolesData.status}
                                        name="status"
                                        id={rolesData.id}
                                        value={rolesData.status}
                                        onChange={(e) => handleUpdateStatus(e, rolesData.id)}
                                    />
                                    </td>
                                    <td>{editTableCol === rolesData.id ?
                                        (<span>
                                            <button type='submit' className="btn btn-outline-secondary btn-sm mx-1" onClick={() => handleEditSaveData(rolesData)}>Save</button>
                                            <button type="button" className="btn btn-outline-secondary btn-sm mx-1" onClick={handleCancelEdit}>Cancel</button>
                                        </span>
                                        ) :
                                        (<button type="button" className="btn btn-outline-secondary btn-sm mx-1" onClick={() => handleEditCol(rolesData)}>Edit</button>)
                                    }
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>


                <div>
                    <h4>Add Information</h4>
                    <form className="row g-3" onSubmit={handleAddData}>
                        <div className="col-3">
                            <input type="text" className="form-control" id="" placeholder='Role Name' name="name" onChange={handleAddChange} required="required" autoComplete="off" />
                        </div>

                        <div className="col-3">
                            <div><button type="submit" className="btn btn-primary" >Add</button></div>
                        </div>


                        {/* { message} */}
                        {/* { message.successMessage ?
                            (<div>{message.successMessage && <div className="alert alert-success">{message.successMessage}</div>}</div>)
                            :
                            ( <div >{message.errorMessage && <div className="alert alert-danger">{message.errorMessage}</div>}</div>)
                        } */}
                       

                    </form>
                </div>
            </div>



            <TableModal
                show={showBasicModal}
                cancelModal={setShowBasicModal}
                modalHeading={modalTitle}

                structure={(
                    <form onSubmit={handleRoleAssignSave} >
                        <div className="mb-3">
                            <label className="form-label">User Name</label>
                            <select className="form-select" name="userId" onChange={handleRoleAssignChange}>
                                <option defaultValue>Select User Name</option>
                                {fetchUserList && fetchUserList.map((userData, id) => {return   <option key={id} value={userData.id}>{userData.name}</option>})}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Role Name</label>
                            <select className="form-select" name="roleId" onChange={handleRoleAssignChange}>
                            <option defaultValue>Select Role Name</option>
                            {roleTbData && roleTbData.map((rolesData, id) => {return   <option key={id} value={rolesData.id}>{rolesData.name}</option>})}
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={(e)=>setShowBasicModal(false)}  >Cancel</button>
                            <button type="submit" className="btn btn-primary"  >Save</button>       
                        </div>

                    </form>
                )}
            />



        </div>
    )
}
export default RoleTable;