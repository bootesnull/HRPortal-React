import React from 'react'
import logo from '../../Images/logo.svg'
import { Link } from 'react-router-dom'

import './sidebar.css'


const Sidebar = () => {
    return (

        <nav className="sidebar">
            <ul>
                <li className='logoLi'>
                    <Link to='/' className='logoLink'><img className='logo' src={logo} /></Link>
                </li>
                <li>
                    <Link to='/roles'> Roles</Link>
                </li>
                <li>
                    <Link to='/permission'>Permission</Link>
                </li>
                <li>
                    <Link to='/allow-permission'>Allow Permission</Link>
                </li>
                <li>
                    <Link to='/logout' className="nav-item-bottom" id="logoutbtn" ><i className="fa fa-sign-out"> </i>Logout</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar