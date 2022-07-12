import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eventTypelist,  eventTypeCreate, eventTypeView, eventTypeEdit } from "../../reducers/eventsReducer";
import TableModal from "../utils/TableModal";
import { toast } from "react-toastify";


const EventsTable = () => {

    const dispatch = useDispatch();
    const eventList = useSelector((state)=> state.Events)
    const [eventTbData, setEventTbData] = useState([{}]);
    const [showBasicModal, setShowBasicModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [flag, setFlag] = useState();
    const eventRendering = useSelector((state)=> state.Events)

    const [createEvent, setCreateEvent] = useState({
        name:"",
    });

    const [editEventType, setEditEventType] = useState({});

    useEffect(() => {
        setEditEventType({...eventRendering.data})
    },[eventRendering]);

    //console.log(editEventType);
    useEffect(() => {
        if(eventRendering.statusCode === 201) {
            toast.success(eventRendering.message);
        }
        if(eventRendering.statusCode === 404) {
            toast.error(eventRendering.message);
        }
    }, []);


    useEffect(()=>{
        const callback = (data) => {
            setEventTbData([...data])
        }
        eventTypelist(callback)
    },[eventList])

    // Delete handler
    // const handleDelete = (id) => {
    //     // const newData = announcementTbData.filter((item) => item.id !== id);
    //     // setPermissionTbData(newData);
    //     //console.log(id)
    //     dispatch(eventDelete(id))
    // };

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
        dispatch(eventTypeCreate(createEvent))
        setShowBasicModal(false)
    }    
    
    const handleEventTypeEdit = (id) => {
        //console.log(id)
        showModal();
        setModalTitle('Edit Event Type');
        setFlag(true)
        dispatch(eventTypeView(id))
    }

    const handleEventTypeEditSave = (e) => {
        e.preventDefault();
        dispatch(eventTypeEdit(editEventType));
        setShowBasicModal(false);
    }

    const handleEditTypeChange = (e) => {
        setEditEventType((prevState)=> {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {
        setActiveTab("tab1");
    };
    const handleTab2 = () => {
        setActiveTab("tab2");
    };

    return(
        <div>

            <div className="Tabs">
                <ul className="nav nav-tabs">
                    <li  className={`nav-link ${activeTab === 'tab1' ? '  active' : ''}`} onClick={handleTab1 }> Events List </li>
                    <li  className={`nav-link ${activeTab === 'tab2' ? '  active' : ''}`} onClick={handleTab2 }> Events Types List </li>
                </ul>
                <div className="tab-content">
                    {(activeTab === "tab1" ? 
                        <div className="tab-pane fade show active">
                            <h5 className="card-title"><b>Events List</b>
                                    <button
                                        className="btn btn-primary modal-btn"
                                        onClick={()=> {
                                            showModal()
                                            setModalTitle( 'Create Event')
                                            setFlag(false)
                                        }}
                                        >Add Event </button>
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
                                                <td>{events.status}</td>
                                                <td>
                                                    <button className="btn btn-secondary  btn-sm mx-1"
                                                                                                            
                                                    >Edit</button>

                                                    {/* <button className="btn btn-secondary  btn-sm mx-1"
                                                        onClick={()=> handleDelete(events.id)}
                                                        >Delete</button> */}
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
                                                <form onSubmit={handleEventTypeEditSave} >
                                                    <div className="mb-3">
                                                        <label className="form-label">Edit Event Title</label>
                                                        <input type="text" className="form-control"  value={editEventType.name} placeholder='Event Name' name="name" onChange={handleEditTypeChange} required="required" autoComplete="off" />
                                                    </div>

                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" onClick={(e) => setShowBasicModal(false)}  >Cancel</button>
                                                        <button type="submit" className="btn btn-primary"  >Save</button>
                                                    </div>
                                                </form>
                                            </>) : (
                                                <>
                                                    <form onSubmit={handleAddEvent} >
                                                        <div className="mb-3">
                                                            <label className="form-label">Event Title</label>
                                                            <input type="text" className="form-control"  placeholder='Event Name' name="name" onChange={handleAddChange} required="required" autoComplete="off" />
                                                        </div>

                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" onClick={(e) => setShowBasicModal(false)}  >Cancel</button>
                                                            <button type="submit" className="btn btn-primary"  >Save</button>
                                                        </div>
                                                    </form>
                                                </>
                                            ) }
                                                
                                            </div>    
                                        )}
                            />
                        </div>
                        : 
                        <div className="tab-pane fade show active">
                            <h5 className="card-title"><b>Events Types List</b>
                                    <button
                                        className="btn btn-primary modal-btn"
                                        onClick={()=> {
                                            showModal()
                                            setModalTitle( 'Create Event Type')
                                            setFlag(false)
                                        }}
                                        >Add Event Type</button>
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
                                                <td>{events.status}
                                                    {/* <input type="checkbox"
                                                            className='cm-toggle'
                                                            checked={events.status}
                                                            name="status"
                                                            id={events.id}
                                                            value={events.status}
                                                            onChange={(e)=> handleUpdateStatus(e, events.id) }
                                                    />         */}
                                                </td>
                                                <td>
                                                    <button className="btn btn-secondary  btn-sm mx-1"
                                                    onClick={()=> handleEventTypeEdit(events.id)}
                                                        
                                                    >Edit</button>

                                                    {/* <button className="btn btn-secondary  btn-sm mx-1"
                                                        onClick={()=> handleDelete(events.id)}
                                                        >Delete</button> */}
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
                                                <form onSubmit={handleEventTypeEditSave} >
                                                    <div className="mb-3">
                                                        <label className="form-label">Edit Title</label>
                                                        <input type="text" className="form-control"  value={editEventType.name} placeholder='Event Name' name="name" onChange={handleEditTypeChange} required="required" autoComplete="off" />
                                                    </div>

                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" onClick={(e) => setShowBasicModal(false)}  >Cancel</button>
                                                        <button type="submit" className="btn btn-primary"  >Save</button>
                                                    </div>
                                                </form>
                                            </>) : (
                                                <>
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
                                                </>
                                            ) }
                                                
                                            </div>    
                                        )}
                            />

                        </div>
                    )}
                </div>
            </div>

             


        </div>
    );
}

export default EventsTable;