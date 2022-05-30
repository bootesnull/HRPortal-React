import React, { useState } from 'react';
import "./roletable.css"
import TableModal from './TableModal';
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
            sorter: true,
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            sorter: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: true,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',

        },
    ]

    const [tableData, setTableData] = useState(data);
    const [basicModal, setBasicModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [addForm, setAddForm] = useState([{
        sNo: "",
        roles: "",
        status: '',
    }]);



    // show modal handler
    const showModal = () => {
        setBasicModal(true);
    }

    //search filter handler    
    const searchFilter = (e) => {
        const search = e.target.value.toLowerCase();
        const filterData = data.filter(newData => newData.roles.toLowerCase().includes(search))
        setTableData(filterData);
    };



    //add form
    const handleChange = (e) => {
        //console.log("name",e.target.name,"value",e.target.value);
        setAddForm((state) => {
            return { ...state, [e.target.name]: e.target.value }
        })
    };
    // console.log(addForm);

    const addData = (e) => {
        e.preventDefault();
        setTableData((state) => {
            return [...state, { ...addForm }]
        })
    }


    return (
        <div className="card">
            <div className="card-body" >

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
                        onClick={() => {
                            setModalTitle('Add Role')
                            showModal()
                        }}>Add</button>
                </div>
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
                                    <td>{row.sNo}</td>
                                    <td>{row.roles}</td>
                                    <td><BootstrapSwitchButton
                                        checked={true}
                                        onlabel='Active'
                                        offlabel='Inactive'
                                    // onChange={(checked:boolean) => {
                                    //     this.setState({ isUserAdmin: checked })
                                    // }}
                                    /></td>
                                    <td>
                                        <a className="actionLink" onClick={() => {
                                            setModalTitle('Edit Role')
                                            showModal()
                                        }}>Edit</a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div>
                    <h4>Add Information</h4>
                    <form className="row g-3" onSubmit={addData}>
                        <div className="col-3">
                            <label className="form-label">S.No</label>
                            <input type="text" className="form-control" id="" name="sNo" onChange={handleChange} />
                        </div>
                        <div className="col-3">
                            <label className="form-label">Roles</label>
                            <input type="text" className="form-control" id="" name="roles" onChange={handleChange} />
                        </div>
                        <div className="col-3">
                            <label className="form-label">Status</label>
                            <input type="text" className="form-control" id="" name="status" onChange={handleChange} />
                        </div>
                        <div className="col-3">
                            <label className="form-label">Action</label>
                            <div><button type="submit" className="btn btn-primary" >Add</button></div>
                        </div>
                    </form>
                </div>
            </div>
            <TableModal show={basicModal} setShow={setBasicModal} modalHeading={modalTitle} />

        </div>
    )
}
export default RoleTable;