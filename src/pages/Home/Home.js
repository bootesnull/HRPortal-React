import React from 'react'

import './home.css'
// import Content from '../../Component/Content/Content'
import Sidebar from '../../Component/Sidebar/Sidebar';
import Navbar from '../../Component/Navbar/Navbar';

// import Main from '../../templates/Main';


const Home = () => {
    return (
        <div>
           
           <Sidebar/>
            <div className='main-content'>
                <Navbar/>
                {/* <Main /> */}
            </div>
        </div>
    );
}

export default Home