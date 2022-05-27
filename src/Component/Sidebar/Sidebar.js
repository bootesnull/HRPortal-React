import React from 'react'
import logo from '../../Images/logo.svg'
import { Link } from 'react-router-dom'

import './sidebar.css'


const Sidebar = () => {
    return (

        <nav className="sidebar">
            <ul>
                <li className='logoLi'>
                    <Link to='/'>
                        <img className='logo' src={logo} />
                    </Link>
                </li>
                <li>
                    <Link
                        to='/role'>
                        Roles
                    </Link>
                </li>
                <li><a href="#" className=""> Permission</a></li>
                <li><a href="#" className=""> Allow Permission</a></li>
                <li> <a href="#" className="nav-item-bottom" id="logoutbtn" >
                    <i className="fa fa-sign-out"> </i> 
                    Logout
                </a>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar