import React from 'react'
import { useSelector } from "react-redux";
import userImg from '../../Images/user.jpg'
import './navbar.css'


const Navbar = () => {

    const appUser = useSelector((state)=>state?.Users?.firebaseUser)
    console.log(appUser)
    return (
        <nav className="navbar portalNavbar">
            <div className="container-fluid">
                <form className="d-flex">
                    <div className="form-group has-search">
                        <span className="fa fa-search form-control-feedback"></span>
                        <input type="text" className="form-control" placeholder="Search" />
                    </div>
                </form>
                <div className='navRight'>
                    <i className="fa fa-bell notification"></i>
                    <div className='userProfile'>
                        <img src={appUser.photoURL} className='userProfileAvtar' alt='User Avatar' />
                        <div className='userProfileName'>{appUser.displayName}</div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar