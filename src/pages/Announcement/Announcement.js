import React from "react";
import AnnouncementTable from "../../Component/AnnouncementTable/AnnouncementTable";

const Announcement = () => {
    return (
        <div>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-body" >
                       <AnnouncementTable /> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Announcement;