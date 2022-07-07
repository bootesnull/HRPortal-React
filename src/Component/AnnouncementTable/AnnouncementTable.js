import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { announceList, announcementCreate, announcementDelete, announcementView, announcementEdit } from "../../reducers/announcementReducer";
import TableModal from "../utils/TableModal";

const AnnouncementTable = () => {

    const dispatch = useDispatch();
    const [announcementTbData, setAnnouncementTbData] = useState([{}]);
    const [createAnnouncement, setCreateAnnouncement] = useState({
        title: "",
        description: "",
    });
    const [announce, setAnnouncement] = useState({})

    const [showBasicModal, setShowBasicModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [flag, setFlag] = useState(false);



    const announcement = useSelector((state) => state?.Announcements)
    const announcementList = useSelector((state) => state?.Announcements?.announcementList)
   

    const [editannouncement, setEditannouncement] = useState({});
    const [editstate, setEditState] = useState();

    useEffect(() => {
        setEditState({
            ...editannouncement
        })
    }, [editannouncement])
 
    useEffect(() => {
        if (!announcementList) return;
        setEditannouncement({ ...announcementList?.data })

    }, [announcementList]);

    

    // Edit btn handle
    const handleEdit = (id) => {
        showModal()
        setModalTitle('Edit Announcement')
        dispatch(announcementView(id));
        setFlag(true)
    }

   // Edit change handle
   const handleEditChange = (e) => {
    setEditState((pervState) => {
        return { ...pervState, [e.target.name]: e.target.value }
    })
    //console.log( e.target.name,e.target.value)
    }

    // Edit save handle
    const handleEditAnnouncement = (e) => {
        e.preventDefault();
        dispatch(announcementEdit(editstate))
        setShowBasicModal(false)
    }
    console.log(editstate)

   

 




    useEffect(() => {
        setAnnouncement({ ...announcement })
    }, [announcement])


    useEffect(() => {
        const callback = (data) => {
            setAnnouncementTbData([...data])
        }
        announceList(callback)
    }, [announce])

    useEffect(() => {
        if (announce.statusCode === 200) {
            toast.success(announce.message);
        }
        if (announce.statusCode === 201) {
            toast.success(announce.message);
        }
    }, [announce])

    const showModal = () => {
        setShowBasicModal(true);
    }

    const handleAddChange = (e) => {
        setCreateAnnouncement((state) => {
            return { ...state, [e.target.name]: e.target.value }
        })
    }

    const handleAddAnnouncement = (e) => {
        e.preventDefault();
        dispatch(announcementCreate(createAnnouncement))
        console.log(createAnnouncement);
        setShowBasicModal(false)
    }


    // Delete handler
    const handleDelete = (id) => {
        // const newData = announcementTbData.filter((item) => item.id !== id);
        // setPermissionTbData(newData);
        //console.log(id)
        dispatch(announcementDelete(id))
    };

    



    return (
        <div>
            <h5 className="card-title"><b>Announcement List</b>
                <button
                    className="btn btn-primary modal-btn"
                    onClick={() => {
                        showModal()
                        setModalTitle('Create Announcement')
                        setFlag(false)
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
                        {/* <th>Status</th> */}
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
                                    <button className="btn btn-secondary  btn-sm mx-1"
                                        onClick={() => handleEdit(announce.id)}
                                    >Edit</button>
                                    <button className="btn btn-secondary  btn-sm mx-1"
                                        onClick={() => handleDelete(announce.id)}
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
                    <div>
                        {flag ? (<>
                            <form onSubmit={handleEditAnnouncement} >
                                <div className="mb-3">
                                    <label className="form-label">Edit Title</label>
                                    <input type="text" className="form-control" value={editstate.title} placeholder='Title' name="title" onChange={handleEditChange} required="required" autoComplete="off" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Edit Description</label>
                                    <textarea type="text" className="form-control" value={editstate.description} placeholder='Description' name="description" onChange={handleEditChange} required="required" />
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={(e) => setShowBasicModal(false)}  >Cancel</button>
                                    <button type="submit" className="btn btn-primary"  >Save</button>
                                </div>
                            </form></>) : (<><form onSubmit={handleAddAnnouncement} >
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" placeholder='Title' name="title" onChange={handleAddChange} required="required" autoComplete="off" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea type="text" className="form-control" placeholder='Description' name="description" onChange={handleAddChange} required="required" />
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
}

export default AnnouncementTable;