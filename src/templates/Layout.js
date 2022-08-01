import React from "react";

import Sidebar from "../Component/Sidebar/Sidebar";
import Navbar from "../Component/Navbar/Navbar";
import Content from "../Component/Content/Content";

const Layout = () => {
    return (
        <div>
           <Sidebar/>
            <div className='main-content'>
                <Navbar/>
                <Content />
            </div>
        </div>
    )
}
export default Layout;