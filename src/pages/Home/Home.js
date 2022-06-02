import React from 'react'

import './home.css'
import Content from '../../Component/Content/Content'


const Home = () => {
    return (
        <div>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-body" >
                        <h5 className="card-title"><b> Home Page</b></h5>

                        <Content />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home