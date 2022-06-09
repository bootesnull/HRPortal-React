import React, { useState, useEffect } from 'react';
import "./roletable.css"
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoleList } from '../../reducers/rolesReducer'
import { API_URL, token } from '../../api'

const RoleTable = () => {

    const [roleTbData, setRoleTbData] = useState([{}]);
    const roleDetails = useSelector((state) => state.Roles.roleList)
   // console.log(roleDetails);


    const dispatch = useDispatch();
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
           // console.log(data);
            dispatch(fetchRoleList(data.data))

        } catch (e) {
           // console.log("Error", e.response.data);
        }
    }
    useEffect(() => {
        roleList()
    }, [])

    useEffect(() => {
        setRoleTbData(roleDetails)
    }, [roleDetails])


    // const [showBasicModal, setShowBasicModal] = useState(false);
    // const [modalTitle, setModalTitle] = useState('');
    const [editTableCol, setEditTableCol] = useState(null);
    const [addForm, setAddForm] = useState([{
        sNo: "",
        roles: "",
        status: '',
    }]);

    const [editFormData, setEditFormData] = useState([{
        sNo: "",
        roles: "",
        status: '',
    }]);

    const [sortOrder, setSortOrder] = useState("ASC");




    //sorting table
    const sorting = (col) => {
        if (sortOrder === "ASC") {
            const sorted = [...roleTbData].sort((a, b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setRoleTbData(sorted);
            setSortOrder("DSC");
        }
        if (sortOrder === "DSC") {
            const sorted = [...roleTbData].sort((a, b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            setRoleTbData(sorted);
            setSortOrder("ASC");
        }
    };

    //add form-------------------------------
    const handleAddChange = (e) => {
        //console.log("name",e.target.name,"value",e.target.value);
        setAddForm((a) => {
            return { ...a, [e.target.name]: e.target.value }
        })

    };

    const handleAddData = (e) => {
        e.preventDefault();
        setRoleTbData((state) => {
            return [...state, { ...addForm }]
        })
        e.target.reset();
    }

    //edit col---------------------------------
    const handleEditCol = (row) => {
        setEditTableCol(row.sNo);
        setEditFormData((state) => {
            return { ...state, ...row }
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
        const newData = [...roleTbData]
        const index = newData.findIndex((data) => data.sNo === editFormData.sNo)
        newData[index] = editFormData
        setRoleTbData(newData)
        setEditTableCol(null)
    }

    //cancel edit handler
    const handleCancelEdit = () => {
        setEditTableCol(null);
    };

    //Delete handler
    const handleDelete = (key) => {
        const newData = roleTbData.filter((item) => item.key !== key);
        setRoleTbData(newData);
    };

    // //show Modal Handler
    // const showModal = () => {
    //     setShowBasicModal(true);
    // }

    // //search filter handler    
    const searchFilter = (e) => {
        const search = e.target.value.toLowerCase();
        const filterData = roleTbData.filter(newData => newData.roles.toLowerCase().includes(search))
        setRoleTbData(filterData);
    };

    return (
        <div className="card">
            <div className="card-body" >
                <h5 className="card-title"><b>Role Table</b></h5>

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
                            <th >S.No.</th>
                            <th onClick={() => { sorting("name") }}>Role Name</th>
                            <th >Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roleTbData.map((rolesData, index) => {
                            return (
                                <tr key={index}>
                                    <td>{rolesData.id}</td>
                                    <td> {editTableCol === rolesData.id ? (<input autoComplete="off" type="text" name="name" value={editFormData.name} onChange={handleEditChange} />) : (rolesData.name)}</td>
                                    <td>{rolesData.status}
                                        {/* <BootstrapSwitchButton
                                            checked={true}
                                            onlabel='Active'
                                            offlabel='Inactive'
                                            onChange={(checked: boolean) => {
                                                this.setState({ isUserAdmin: checked })
                                            }}
                                        /> */}
                                    </td>
                                    <td>{editTableCol === rolesData.id ?
                                        (<span>
                                            <button type='submit' className="btn btn-outline-secondary btn-sm mx-1" onClick={() => handleEditSaveData(rolesData)}>Save</button>
                                            <button type="button" className="btn btn-outline-secondary btn-sm mx-1" onClick={handleCancelEdit}>Cancel</button>
                                        </span>
                                        ) :
                                        (<button type="button" className="btn btn-outline-secondary btn-sm mx-1" onClick={() => handleEditCol(rolesData)}>Edit</button>)
                                    }

                                        <button className="btn btn-outline-secondary btn-sm mx-1" onClick={() => handleDelete(rolesData.key)}>Delete</button>
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
                            <label className="form-label">Roles</label>
                            <input type="text" className="form-control" id="" name="roles" onChange={handleAddChange} required="required" autoComplete="off" />
                        </div>

                        <div className="col-3">
                            <label className="form-label">Action</label>
                            <div><button type="submit" className="btn btn-primary" >Add</button></div>
                        </div>
                    </form>
                </div>
            </div>
            {/* 
            
                    <button
                        className="btn btn-primary"
                        style={{ float: 'right', marginBottom: '15px' }}
                        onClick={()=> {
                            setModalTitle('Add Information')
                            showModal()
                        }}>Add</button>
            <TableModal show={showBasicModal} cancelModal={setShowBasicModal} modalHeading={modalTitle} /> */}

        </div>
    )
}
export default RoleTable;