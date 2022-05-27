import React from 'react'
import './roles.css'
import RoleTable from '../RoleTable/Roletable'


// Components
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'

const Roles = () => {



    return (
        <div>
            <Sidebar />
            <div className='main-content'>
                <Navbar />
                <div className='container-fluid'>
                    <RoleTable />
                </div>
                 
            </div>
        </div>
    )
}

export default Roles