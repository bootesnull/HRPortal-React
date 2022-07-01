import './permissionTable.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { allowPermissionListing, allowPermissionStatus } from '../../reducers/allowPermissionReducer';



const AllowPermissionTable = () => {
   
    const [allowPermissionTbData, setAllowPermissionTbData] = useState([{}]);
    const dispatch = useDispatch();
  

    useEffect(()=> {
        const callback = (data) => {
            setAllowPermissionTbData([...data]);
        }
        allowPermissionListing(callback);
    },[])




     // permission status updates
     const handleUpdateStatus = (e, id) => {
        let value = e.target.checked ? 1 : 0;
        // console.log(value)
        dispatch(allowPermissionStatus({ id, value }))
    };
   
    return (
        <div>
             <h5 className="card-title"><b>Allow Permission List</b>
                    <button
                        className="btn btn-primary modal-btn"
                        >Allow Permission</button>

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
                                            id={allowPermit.id}
                                            value={allowPermit.status}
                                            onChange={(e)=> handleUpdateStatus(e, allowPermit.allow_id) }
                                    />        
                                </td>
                                <td>
                                    <button className="btn btn-secondary  btn-sm mx-1"
                                        
                                    >Edit</button>
                                    
                                    
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>


            {/* <TableModal
                show={showBasicModal}
                cancelModal={setShowBasicModal}
                modalHeading={modalTitle}

                structure={(
                    <form onSubmit={handleAddPermission} >
                        <div className="mb-3">
                            <label className="form-label">Parent</label>
                            <input type="text" className="form-control" id="" placeholder='Parent Id' name="parent" onChange={handleAddChange} required="required" autoComplete="off" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Permission Name</label>
                            <input type="text" className="form-control" id="" placeholder='Permission Name' name="permissionName" onChange={handleAddChange} required="required" autoComplete="off" />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={(e)=>setShowBasicModal(false)}  >Cancel</button>
                            <button type="submit" className="btn btn-primary"  >Save</button>       
                        </div>

                    </form>

                )}
            /> */}

          



        </div>
    );
};

export default AllowPermissionTable;