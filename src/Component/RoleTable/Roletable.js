import React, { useState, useEffect } from 'react';
import "./roletable.css"
import { useDispatch, useSelector } from 'react-redux';
import { createRoleList, roleEdit, roleStatus } from '../../reducers/rolesReducer'
import { API_URL, token } from '../../api'
import TableModal from './TableModal'


const RoleTable = () => {
    const [fetchList, setFetchList] = useState([{}])
    const [roleTbData, setRoleTbData] = useState([{}]);
    const roleDetails = useSelector((state) => state.Roles)


    //console.log(roleDetails);
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




    const handleUpdateStatus = (e, id) => {
        let value = e.target.checked ? 1 : 0
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

    const dispatch = useDispatch();

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
                        <div className={`alert `} role="alert">
                            {roleDetails.message}
                        </div>

                    </form>
                </div>
            </div>



            <TableModal 
            show={showBasicModal} 
            cancelModal={setShowBasicModal} 
            modalHeading={modalTitle}
            structure={(
                    <form>
                        <div className="mb-3">
                            <label className="form-label">User Name</label>
                            <select class="form-select">
                                <option selected>Select User Name</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Role Name</label>
                            <select class="form-select">
                                <option selected>Select Role Name</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </form>
                )} 
            />
                


        </div>
    )
}
export default RoleTable;