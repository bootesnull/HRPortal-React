import React from 'react'
import { useDispatch } from 'react-redux'
import logo from '../../Images/logo.svg'
import { NavLink } from 'react-router-dom'
import { auth } from "../../firebase"
import { userLogout } from '../../reducers/userReducer'

import './sidebar.css'


const Sidebar = () => {

    const dispatch = useDispatch();

    const logOut = () => {

        dispatch(userLogout())
        auth.signOut()

    }

    return (

        <nav className="sidebar">
            <ul>
                <li className='logoLi'>
                    <NavLink to='/home' className='logoLink'><img className='logo' src={logo} alt='Company Logo' /></NavLink>
                </li>
                <li>
                    <NavLink to='/attendence' > Attendence</NavLink>
                </li>
                <li>
                    <NavLink to='/roles' > Roles</NavLink>
                </li>
                <li>
                    <NavLink to='/permission'>Permission</NavLink>
                </li>
                <li>
                    <NavLink to='/allow-permission'>Allow Permission</NavLink>
                </li>
                <li>
                    <NavLink to='/users-List'>Users List</NavLink>
                </li>
                <li>
                    <NavLink to='/leaves'>Leaves</NavLink>
                </li>
                <li>
                    <NavLink to='/announcement'>Announcement</NavLink>
                </li>
                <li>
                    <NavLink to='/events'>Events</NavLink>
                </li>
                <li>
                    <NavLink to='/reports'>Reports</NavLink>
                </li>
                <li>
                    <div className="nav-item-bottom" onClick={logOut} ><i className="fa fa-sign-out"> </i>Logout</div>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar