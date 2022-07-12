import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eventTypelist,  eventTypeCreate, eventTypeView, eventTypeEdit, eventsCreate, eventsList, eventsDelete } from "../../reducers/eventsReducer";
import TableModal from "../utils/TableModal";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const EventsTable = () => {

    const dispatch = useDispatch();
   // const eventList = useSelector((state)=> state.Events)
    const [eventTbData, setEventTbData] = useState([{}]);
    const [showBasicModal, setShowBasicModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [flag, setFlag] = useState();
    const eventRendering = useSelector((state)=> state.Events)

    const [createEventType, setCreateEventType] = useState({
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
    },[eventRendering])

 

    const showModal = () => {
        setShowBasicModal(true);
    }

    const handleAddChange = (e) => {
        setCreateEventType((state)=> {
           return {...state, [e.target.name]: e.target.value }
        })
        console.log(e.target.name, e.target.value)
    }

    // Create event handle
    const handleAddEvent = (e) => {
        e.preventDefault();
        dispatch(eventTypeCreate(createEventType))
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

    const [eventlistData, setEventlistData] = useState([{}]);

    const [addEvent, setAddEvent] = useState({
        title:'', 
        event_type_id:'', 
        date:new Date(),
        description:'',
        is_holiday:'', 
        holiday_from_date: new Date(), 
        holiday_to_date: new Date(),
        banner:'',
    });
    console.log(addEvent.holiday_from_date)

    useEffect(()=> {
        const callback = (data) => {
            setEventlistData([...data])
        }
        eventsList(callback);
    },[eventRendering])



    const handleEventAddChange = (e) => {
        setAddEvent((prevState) => {
            return {...prevState, [e.target.name]:e.target.value }
        })
        //console.log(e.target.name,e.target.value)
    }

    const handleEventSave = (e) => {
        e.preventDefault();
        dispatch(eventsCreate(addEvent))
        console.log(addEvent)
    }

       // Delete handler
    const handleDelete = (id) => {
        // const newData = announcementTbData.filter((item) => item.id !== id);
        // setPermissionTbData(newData);
        //console.log(id)
        dispatch(eventsDelete(id))
    };

//    const [eventDate, setEventDate] = useState(new Date());
//    const [eventFromDate, setEventFromDate] = useState(new Date());
//    const [eventToDate, setEventToDate] = useState(new Date())

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
                            <h5 className="card-title"><b>Events List</b></h5>


                            <form className="row" onSubmit={handleEventSave} >
                                <div className="col-lg-3 mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" placeholder='Title' name="title" onChange={handleEventAddChange} required="required" autoComplete="off" />
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label className="form-label">Event Type</label>
                                    <select className="form-select" name="event_type_id" onChange={handleEventAddChange}>
                                    <option defaultValue>Select Event Type</option>
                                    {eventTbData && eventTbData.map((eventType, id) => {return   <option key={id} value={eventType.id}>{eventType.name}</option>})}
                                    </select>
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label className="form-label">Date</label>
                                    {/* <DatePicker name="date" className="form-control" selected={eventDate} onChange={(date) => setEventDate(date)} /> */}
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label className="form-label">Description</label>
                                    <input type="text" className="form-control" placeholder='Description' name="description" onChange={handleEventAddChange} required="required" autoComplete="off" />
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label className="form-label">Is Holiday</label>
                                    <input type="text" className="form-control" placeholder='is_holiday' name="is_holiday" onChange={handleEventAddChange} required="required" autoComplete="off" />
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label className="form-label">Holiday From Date</label>
                                    <DatePicker name="holiday_from_date" className="form-control"  selected={addEvent.holiday_from_date} onChange={(date) => handleEventAddChange(date)} />
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label className="form-label">Holiday To Date</label>
                                    {/* <DatePicker name="holiday_to_date" className="form-control"  selected={eventToDate} onChange={(date) => setEventToDate(date)} /> */}
                                </div> 
                                <div className="col-lg-3 mb-3">
                                    <label className="form-label">Banner</label>
                                    <input type="file" className="form-control" name="banner" onChange={handleEventAddChange} required="required" autoComplete="off" />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <button type="submit" className="btn btn-primary "  >Save</button>
                                    <button type="button" className="btn btn-secondary mx-2" >Cancel</button>
                                </div>
                            </form>


                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#ID</th>
                                        <th>Title</th>
                                        <th>Event Type Name</th>
                                        <th>Descriptions</th>
                                        <th>Is Holiday</th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>Banner</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventlistData && eventlistData.map((events, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{events.events_id}</td>
                                                <td>{events.events_title}</td>
                                                <td>{events.event_type_name}</td>
                                                <td>{events.events_descriptions}</td>
                                                <td>{events.is_holiday}</td>
                                                <td>{events?.holiday_from_date?.slice(0, 10)}</td>
                                                <td>{events?.holiday_to_date?.slice(0, 10)}</td>
                                                <td>{events.image_url}</td>
                                                <td>{events.status}</td>
                                                <td>
                                                    <button className="btn btn-secondary  btn-sm mx-1"
                                                                                                            
                                                    >Edit</button>

                                                    <button className="btn btn-secondary  btn-sm mx-1"
                                                        onClick={()=> handleDelete(events.events_id)}
                                                        >Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>


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
                                    {eventTbData && eventTbData.map((eventType, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{eventType.id}</td>
                                                <td>{eventType.name}</td>
                                                <td>{eventType?.created_at?.slice(0, 10)}</td>
                                                <td>{eventType?.updated_at?.slice(0, 10)}</td>
                                                <td>{eventType.status}
                                                    {/* <input type="checkbox"
                                                            className='cm-toggle'
                                                            checked={eventType.status}
                                                            name="status"
                                                            id={eventType.id}
                                                            value={eventType.status}
                                                            onChange={(e)=> handleUpdateStatus(e, eventType.id) }
                                                    />         */}
                                                </td>
                                                <td>
                                                    <button className="btn btn-secondary  btn-sm mx-1"
                                                    onClick={()=> handleEventTypeEdit(eventType.id)}
                                                        
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