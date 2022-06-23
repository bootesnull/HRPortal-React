import React from "react";
import { useParams } from 'react-router-dom';
const EditUserDetail = () => {
    const { id } = useParams();
    console.log(id);
    return (

        <div className='container-fluid'>
            
            <div className="card">
                <div className="card-body" >
                    <h5 className="card-title"><b>Edit User Details</b></h5>
                    <div className="row">
                        <div className="col-lg-4 mb-3">
                            <label className="form-label">User ID</label>
                            <input type="text" className="form-control" name="user_id" />
                        </div>
                        <div className="col-lg-4 mb-3">
                            <label className="form-label">Personal Email</label>
                            <input type="email" className="form-control" name="personal_email" />
                        </div>
                        <div className="col-lg-4 mb-3">
                            <label className="form-label">Phone</label>
                            <input type="number" className="form-control" name="phone" />
                        </div>
                        <div className="col-lg-4 mb-3">
                            <label className="form-label">Gender</label>
                            <select  className="form-select" name="gender" >
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <div className="col-lg-4 mb-3">
                            <label className="form-label">Date of Birth</label>
                            <input type="date" className="form-control" name="date_of_birth" />
                        </div>
                        <div className="col-lg-4 mb-3">
                            <label className="form-label">Position</label>
                            <select  className="form-select" name="gender" >
                                <option>HR</option>
                                <option>Designer</option>
                            </select>
                        </div>
                        <div className="col-lg-4 mb-3">
                            <label className="form-label">Qualification</label>
                            <input type="text" className="form-control" name="qualification" />
                        </div>

                        <div className="col-lg-4 mb-3">
                            <label className="form-label">Maritial Status</label>
                            <select  className="form-select" name="gender" >
                                <option>Single</option>
                                <option>Married</option>
                            </select>
                        </div>
                        <div className="col-lg-4 mb-3">
                            <label className="form-label">Date of Joining</label>
                            <input type="date" className="form-control" name="date_of_joining" />
                        </div>
                        <div className="col-lg-4 mb-3">
                            <label className="form-label">Blood Group</label>
                            <select  className="form-select" name="blood_group" >
                                <option>A+</option>
                                <option>A-</option>
                                <option>B+</option>
                                <option>B-</option>
                                <option>O+</option>
                                <option>O-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                            </select>
                        </div>
                        <div className="col-lg-4 mb-3">
                            <label className="form-label">Current Address</label>
                            <textarea type="text" className="form-control" name="current_address" />
                        </div>
                        <div className="col-lg-4 mb-3">
                            <label className="form-label">Profile Image</label>
                            <input type="file" className="form-control" name="profile_image" />
                        </div>
                        <div className="col-lg-4 mb-3">
                            <label className="form-label">Documents</label>
                            <input type="file" className="form-control" name="documents" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default EditUserDetail; 