import React, { useState } from 'react';
import "./roletable.css"
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const RoleTable = () => {

    const data = [
        {
            key: '1',
            sNo: 1,
            roles: "HR",
            status: 'pending',
        }, {
            key: '2',
            sNo: 2,
            roles: "CEO",
            status: 'approved',
        }, {
            key: '3',
            sNo: 3,
            roles: "Admin",
            status: 'decline',
        }, {
            key: '4',
            sNo: 4,
            roles: "user",
            status: 'pending',
        }
    ];


    const [tableData, setTableData] = useState(data);
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

    const [sortOrder, setSortOrder]=useState("ASC");

    //sorting table
    const sorting = (col) => {
        if (sortOrder === "ASC") {
            const sorted = [...tableData].sort((a,b)=> a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setTableData(sorted);
            setSortOrder("DSC");
        }
        if (sortOrder === "DSC") {
            const sorted = [...tableData].sort((a,b)=>a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            setTableData(sorted);
            setSortOrder("ASC");
        }
    };

    //add form-------------------------------
    const handleAddChange = (e) => {
        //console.log("name",e.target.name,"value",e.target.value);
        setAddForm((state) => {
            return { ...state, [e.target.name]: e.target.value }
        })
    };

    const handleAddData = (e) => {
        e.preventDefault();
        setTableData((state) => {
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
        const newData = [...tableData]
        const index = newData.findIndex((data) => data.sNo === editFormData.sNo)
        newData[index] = editFormData
        setTableData(newData)
        setEditTableCol(null)
    }

    //cancel edit handler
    const handleCancelEdit = () => {
        setEditTableCol(null);
    };

    //Delete handler
    const handleDelete = (key) => {
        const newData = tableData.filter((item) => item.key !== key);
        setTableData(newData);
    };

    // //show Modal Handler
    // const showModal = () => {
    //     setShowBasicModal(true);
    // }

    // //search filter handler    
    const searchFilter = (e) => {
        const search = e.target.value.toLowerCase();
        const filterData = data.filter(newData => newData.roles.toLowerCase().includes(search))
        setTableData(filterData);
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
                            <th onClick={()=> {sorting("roles") }}>Roles</th>
                            <th >Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td>{++index}</td>
                                    {/* <td>{row.roles}</td> */}
                                    <td> {editTableCol === row.sNo ? (<input autoComplete="off" type="text" name="roles" value={editFormData.roles} onChange={handleEditChange} />) : (row.roles)}</td>
                                    <td><BootstrapSwitchButton
                                        checked={true}
                                        onlabel='Active'
                                        offlabel='Inactive'
                                    // onChange={(checked:boolean) => {
                                    //     this.setState({ isUserAdmin: checked })
                                    // }}
                                    /></td>
                                    <td>{editTableCol === row.sNo ?
                                            (   <span>
                                                <button type='submit' className="btn btn-outline-secondary btn-sm mx-1" onClick={()=>handleEditSaveData(row) }>Save</button>
                                                <button type="button" className="btn btn-outline-secondary btn-sm mx-1" onClick={handleCancelEdit}>Cancel</button>
                                                </span>
                                            ):
                                            (<button type="button" className="btn btn-outline-secondary btn-sm mx-1" onClick={() => handleEditCol(row)}>Edit</button>)
                                        }

                                        <button className="btn btn-outline-secondary btn-sm mx-1" onClick={() => handleDelete(row.key)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>


                <div>
                    <h4>Add Information</h4>
                    <form className="row g-3" onSubmit={handleAddData}>
                        {/* <div className="col-3">
                            <label className="form-label">S.No</label>
                            <input type="text" className="form-control" id="" name="sNo" onChange={handleChange} required="required" />
                        </div> */}
                        <div className="col-3">
                            <label className="form-label">Roles</label>
                            <input type="text" className="form-control" id="" name="roles" onChange={handleAddChange} required="required" autoComplete="off" />
                        </div>
                        {/* <div className="col-3">
                            <label className="form-label">Status</label>
                            <input type="text" className="form-control" id="" name="status" onChange={handleChange} required="required" />
                        </div> */}
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