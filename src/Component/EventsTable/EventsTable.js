import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eventslist, eventDelete, eventCreate } from "../../reducers/eventsReducer";
import TableModal from "../utils/TableModal";


const EventsTable = () => {

    const dispatch = useDispatch();
    const eventList = useSelector((state)=> state.Events)
    const [eventTbData, setEventTbData] = useState([{}]);
    const [showBasicModal, setShowBasicModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    const [createEvent, setCreateEvent] = useState({
        name:"",
    });


    useEffect(()=>{
        const callback = (data) => {
            setEventTbData([...data])
        }
        eventslist(callback)
    },[eventList])

    // Delete handler
    const handleDelete = (id) => {
        // const newData = announcementTbData.filter((item) => item.id !== id);
        // setPermissionTbData(newData);
        //console.log(id)
        dispatch(eventDelete(id))
    };

    const showModal = () => {
        setShowBasicModal(true);
    }

    const handleAddChange = (e) => {
        setCreateEvent((state)=> {
           return {...state, [e.target.name]: e.target.value }
        })
        console.log(e.target.name, e.target.value)
    }

    // Create event handle
    const handleAddEvent = (e) => {
        e.preventDefault();
        dispatch(eventCreate(createEvent))
        setShowBasicModal(false)
    }    
    

    return(
        <div>
             <h5 className="card-title"><b>Events List</b>
                    <button
                        className="btn btn-primary modal-btn"
                        onClick={()=> {
                            showModal()
                            setModalTitle( 'Create Event')
                        }}
                        >Add Event</button>
            </h5>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Created at</th>
                        <th>Updated at</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {eventTbData && eventTbData.map((events, index) => {
                        return (
                            <tr key={index}>
                                <td>{events.id}</td>
                                <td>{events.name}</td>
                                <td>{events?.created_at?.slice(0, 10)}</td>
                                <td>{events?.updated_at?.slice(0, 10)}</td>
                                <td>
                                    <input type="checkbox"
                                            className='cm-toggle'
                                            checked={events.status}
                                            name="status"
                                            id={events.id}
                                            value={events.status}
                                            // onChange={(e)=> handleUpdateStatus(e, events.id) }
                                    />        
                                </td>
                                <td>
                                    <button className="btn btn-secondary  btn-sm mx-1"
                                        
                                    >Edit</button>
                                    <button className="btn btn-secondary  btn-sm mx-1"
                                        onClick={()=> handleDelete(events.id)}
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
                        <form onSubmit={handleAddEvent} >
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input type="text" className="form-control"  placeholder='Event Name' name="name" onChange={handleAddChange} required="required" autoComplete="off" />
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

export default EventsTable;