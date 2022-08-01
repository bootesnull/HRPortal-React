import React from 'react'
import DashboardCol from '../../Component/DashboardCol/DashboardCol';

import './home.css'

const Home = () => {
    return (

        <div>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-body" >
                        <DashboardCol />

                        
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Home