import './permissionTable.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { permissionList, permissionStatus, createPermission, editFetchPermission, editPermission } from "../../reducers/permissionReducer";
import { toast } from 'react-toastify';
import TableModal from '../utils/TableModal';



const Permission = () => {
    const [flag, setFlag] = useState(false)
    const dispatch = useDispatch();


    const permissionDetails = useSelector((state) => state?.Permissions)
    const permissionListing = useSelector((state) => state?.Permissions?.permissionListing)


    const [permissionTbData, setPermissionTbData] = useState([{}]);

    const [permissionAdd, setPermissionAdd] = useState({
        parent: "",
        permissionName: "",
    });

    const [permissionEdit, setPermissionEdit] = useState({});

    const [showBasicModal, setShowBasicModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');


    useEffect(() => {
        const callback = (data) => {
            setPermissionTbData([...data]);
        }
        permissionList(callback)

    }, [permissionDetails]);


    useEffect(() => {
        if (!permissionListing) return;
        setPermissionEdit({ ...permissionListing.data })

    }, [permissionListing]);


    useEffect(() => {
        if (permissionDetails.statusCode === 201) {
            toast.success(permissionDetails.message)
        }
        if (permissionDetails.statusCode === 400) {
            toast.error(permissionDetails.message)
        }
    }, [permissionDetails]);


    useEffect(() => {
        setState({
            ...permissionEdit
        })
    }, [permissionEdit])

    const [state, setState] = useState()



    // permission status updates
    const handleUpdateStatus = (e, id) => {
        let value = e.target.checked ? 1 : 0;
        dispatch(permissionStatus({ id, value }))
    };

    // permission  onChange  and add
    const handleAddChange = (e) => {
        setPermissionAdd((pervState) => {
            return { ...pervState, [e.target.name]: e.target.value }
        })
    }

    const handleEditChange = (e) => {
        setState((pervState) => {
            return { ...pervState, [e.target.name]: e.target.value }
        })
        // console.log("name", e.target.name, "value", e.target.value);
    }

    const handleAddPermission = (e) => {
        e.preventDefault();
        dispatch(createPermission(permissionAdd));
        setShowBasicModal(false)
    }

    // permission  add popup
    const showModal = () => {
        setShowBasicModal(true)
    }

    const handleEditPermission = (e) => {
        e.preventDefault();
        dispatch(editPermission(state));
        setShowBasicModal(false)
    }

    const handleEdit = (id) => {
       setModalTitle('Edit Permission')
        showModal()
        dispatch(editFetchPermission(id))
        setFlag(true)
    }


    // Delete handler
    // const handleDelete = (id) => {
    //     // const newData = permissionTbData.filter((item) => item.id !== id);
    //     // setPermissionTbData(newData);
    //     //console.log(id)
    //     dispatch(permissionDelete(id))
    // };

    return (
        <div>
            <h5 className="card-title"><b> Permission List</b>
                <button
                    className="btn btn-primary modal-btn"
                    onClick={() => {
                        setFlag(false)
                        setModalTitle('Add Permission')
                        showModal()
                    }}>Add Permission</button>
            </h5>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Parent</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {permissionTbData && permissionTbData.map((permit, index) => {
                        return (
                            <tr key={index}>
                                <td>{permit.id}</td>
                                <td>{permit.permission_name}</td>
                                <td>{permit.parent}</td>
                                <td>
                                    <input type="checkbox"
                                        className='cm-toggle'
                                        checked={permit.status}
                                        name="status"
                                        id={permit.id}
                                        value={permit.status || ""}
                                        onChange={(e) => handleUpdateStatus(e, permit.id)}
                                    />
                                </td>
                                <td>
                                    <button className="btn btn-secondary  btn-sm mx-1"
                                        onClick={() => handleEdit(permit.id)}
                                    >Edit</button>
                                    {/* <button className="btn btn-secondary  btn-sm mx-1" onClick={() => handleDelete(permit.id)}>Delete</button> */}
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
                            <form onSubmit={handleEditPermission} >
                                <div className="mb-3">
                                    <label className="form-label">#ID</label>
                                    <input type="text" className="form-control" value={state.id} placeholder='Id' name="id" onChange={handleEditChange} required="required" autoComplete="off" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Parent edit</label>
                                    <input type="text" className="form-control" value={state.parent} placeholder='Parent Id' name="parent" onChange={handleEditChange} required="required" autoComplete="off" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Permission Name</label>
                                    <input type="text" className="form-control" id="" value={state.permission_name} placeholder='Permission Name' name="permission_name" onChange={handleEditChange} required="required" autoComplete="off" />
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={(e) => setShowBasicModal(false)}  >Cancel</button>
                                    <button type="submit" className="btn btn-primary"  >Save</button>
                                </div>

                            </form></>) : (<><form onSubmit={handleAddPermission} >
                                <div className="mb-3">
                                    <label className="form-label">Parent</label>
                                    <input type="text" className="form-control" id="" placeholder='Parent Id' name="parent" onChange={handleAddChange} required="required" autoComplete="off" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Permission Name</label>
                                    <input type="text" className="form-control" id="" placeholder='Permission Name' name="permissionName" onChange={handleAddChange} required="required" autoComplete="off" />
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={(e) => setShowBasicModal(false)}  >Cancel</button>
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

export default Permission;