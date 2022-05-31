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

    const columns = [
        {
            title: 'S.No',
            dataIndex: 's.no',
            key: 's.no',
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',

        },
    ]

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


    // //show Modal Handler
    // const showModal = () => {
    //     setShowBasicModal(true);
    // }
 
    // //search filter handler    
    // const searchFilter = (e) => {
    //     const search = e.target.value.toLowerCase();
    //     const filterData = data.filter(newData => newData.roles.toLowerCase().includes(search))
    //     setTableData(filterData);
    // };

   
    //edit col
    
    
    const handleEditCol = (row) => {
        setEditTableCol(row.sNo);

        const formValues = {
            sNo: row.sNo,
            roles: row.roles,
            status: row.status, 
        }
        setEditFormData(formValues);
    };

    //edit col onChange
      const handleEditChange = (e) => {
        //console.log("name",e.target.name,"value",e.target.value);
        setEditFormData((state) => {
            return { ...state, [e.target.name]: e.target.value }
        })
    };

    // // save edit handler
    const handleEditSaveData = (e) => {
        e.preventDefault();
        setTableData((state) => {
            return [...state, { ...editFormData  }]
        })

    }


    // // cancel edit handler
    const handleCancelEdit = () => {
        setEditTableCol(null);
    };

     // // Delete handler
     const handleDelete = (key) => {
        const newData = tableData.filter((item) => item.key !== key);
        setTableData(newData);
    };

   
    //add form
    const handleAddChange = (e) => {
        //console.log("name",e.target.name,"value",e.target.value);
        setAddForm((state) => {
            return { ...state, [e.target.name]: e.target.value }
        })
    };

    // console.log(addForm);

    const handleAddData = (e) => {
        e.preventDefault();
        setTableData((state) => {
            return [...state, { ...addForm }]
        })
    }


    return (
        <div className="card">
            <div className="card-body" >


                <h5 className="card-title"><b>Role Table</b></h5>
                <form onSubmit={handleEditSaveData}>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            {columns.map((column, index) => {
                                return (
                                    <th key={index}>{column.title}</th>
                                )
                            }
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td>{++index}</td>
                                    {/* <td>{row.roles}</td> */}
                                    <td> { editTableCol === row.sNo ? (<input autoComplete="off" type="text" name="roles" value={editFormData.roles} onChange={handleEditChange} />)  :( row.roles) }</td>
                                    <td><BootstrapSwitchButton
                                        checked={true}
                                        onlabel='Active'
                                        offlabel='Inactive'
                                    // onChange={(checked:boolean) => {
                                    //     this.setState({ isUserAdmin: checked })
                                    // }}
                                    /></td>
                                    <td>
                                        <button type="button" className="btn btn-outline-secondary btn-sm mx-1" onClick={()=>handleEditCol(row)}>Edit</button>
                                        <button type='submit' className="btn btn-outline-secondary btn-sm mx-1">Save</button>
                                        <button type="button" className="btn btn-outline-secondary btn-sm mx-1" onClick={handleCancelEdit}>Cancel</button>
                                        <button className="btn btn-outline-secondary btn-sm mx-1" onClick={() => handleDelete(row.key)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                </form>

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
            {/* <TableModal show={showBasicModal} cancelModal={setShowBasicModal} modalHeading={modalTitle} /> 
            
                 <div className="d-flex justify-content-between">

                 <div className="d-flex">
                        <div className="form-group has-search">
                            <span className="fa fa-search form-control-feedback"></span>
                            <input type="text" className="form-control"
                                onChange={(e) => searchFilter(e)}
                            />
                        </div>
                    </div> 

                    <button
                        className="btn btn-primary"
                        style={{ float: 'right', marginBottom: '15px' }}
                        onClick={()=> {
                            setModalTitle('Add Information')
                            showModal()
                        }}>Add</button>
                </div> */}

        </div>
    )
}
export default RoleTable;