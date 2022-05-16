import React from 'react'
import userImg from '../../Images/user.jpg'
import './navbar.css'


const Navbar = () => {
    return (
        <nav className="navbar portalNavbar">
            <div className="container-fluid">
                <form className="d-flex">
                    <div className="form-group has-search">
                        <span class="fa fa-search form-control-feedback"></span>
                        <input type="text" class="form-control" placeholder="Search" />
                    </div>
                </form>
                <div className='navRight'>
                    <i className="fa fa-bell notification"></i>
                    <div className='userProfile'>
                        <img src={userImg} className='userProfileAvtar' />
                        <div className='userProfileName'>John Doe</div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar