import React from 'react'
import './roles.css'


// Components
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'

const Roles = () => {



    return (
        <div>
            <Sidebar />
            <div className='main-content'>
                <Navbar />
            </div>
        </div>
    )
}

export default Roles