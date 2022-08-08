import React from 'react'
import { useSelector } from "react-redux";
import './navbar.css'


const Navbar = () => {
    const adminUser = useSelector((state) => state.authLogin);
    //const appUser = useSelector((state)=>state?.Users?.firebaseUser)
    //console.log(adminUser)
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
                        <div className="userProfileAvtar">{ adminUser?.data?.profile ? <img src={adminUser?.data?.profile} className='' alt='' /> : adminUser.data.name.split('')[0].toUpperCase()}</div>
                        <div className="userProfileName">{adminUser.data.name || "Guest"}</div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar