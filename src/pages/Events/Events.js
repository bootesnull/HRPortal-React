import React from "react";
import EventsTable from "../../Component/EventsTable/EventsTable";

const Events = () => {
    return (
        <div>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-body" >
                        <EventsTable />

                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;