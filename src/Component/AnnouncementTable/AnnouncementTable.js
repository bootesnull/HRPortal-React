import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { announceList, announceCreate } from "../../reducers/announcementReducer";
import TableModal from "../utils/TableModal";

const AnnouncementTable = () => {

    const dispatch = useDispatch();
    const [announcementTbData, setAnnouncementTbData] = useState([{}]);
    const [createAnnouncement, setCreateAnnouncement] = useState({
        title:"",
        description:"",
    });

    const [showBasicModal, setShowBasicModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

     // announcement status updates
    //  const handleUpdateStatus = (e, id) => {
    //     let value = e.target.checked ? 1 : 0;
    //     // console.log(value)
    //     dispatch(announceStatus({ id, value }))
    // };

    useEffect(()=>{
        const callback = (data) => {
            setAnnouncementTbData([...data])
        }
        announceList(callback)
    },[])

    const showModal = () => {
        setShowBasicModal(true);
    }

    const handleAddChange = (e) => {
        setCreateAnnouncement((state)=> {
           return {...state, [e.target.name]: e.target.value }
        })
    }

    const handleAddAnnouncement = (e) => {
        e.preventDefault();
        dispatch(announceCreate(createAnnouncement))
        console.log(createAnnouncement);
        setShowBasicModal(false)
    }


    return(
        <div>
             <h5 className="card-title"><b>Announcement List</b>
                    <button
                        className="btn btn-primary modal-btn"
                        onClick={()=> {
                            showModal()
                            setModalTitle( 'Create Announcement')
                        }}
                        >Add Announcement</button>
            </h5>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created at</th>
                        {/* <th>Updated at</th> */}
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {announcementTbData && announcementTbData.map((announce, index) => {
                        return (
                            <tr key={index}>
                                <td>{announce.id}</td>
                                <td>{announce.title}</td>
                                <td>{announce.description}</td>
                                <td>{announce?.created_at?.slice(0, 10)}</td>
                                {/* <td>{announce?.updated_at?.slice(0, 10)}</td> */}
                                <td>
                                    <input type="checkbox"
                                            className='cm-toggle'
                                            checked={announce.status}
                                            name="status"
                                            id={announce.id}
                                            value={announce.status}
                                            // onChange={(e)=> handleUpdateStatus(e, announce.id) }
                                    />        
                                </td>
                                <td>
                                    <button className="btn btn-secondary  btn-sm mx-1"
                                        
                                    >Edit</button>
                                    <button className="btn btn-secondary  btn-sm mx-1"
                                        
                                        >Delete</button>
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
                        <form onSubmit={handleAddAnnouncement} >
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input type="text" className="form-control"  placeholder='Title' name="title" onChange={handleAddChange} required="required" autoComplete="off" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea type="text" className="form-control"  placeholder='Description' name="description" onChange={handleAddChange} required="required" />
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={(e) => setShowBasicModal(false)}  >Cancel</button>
                                <button type="submit" className="btn btn-primary"  >Save</button>
                            </div>
                        </form>
                        )}
            />

        </div>
    );
}

export default AnnouncementTable;