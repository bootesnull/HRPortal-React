import React from 'react'

//CSS
import './home.css'

// COMPONENTS
import Sidebar from '../../Component/Sidebar/Sidebar'
import Navbar from '../../Component/Navbar/Navbar'
import Content from '../../Component/Content/Content'


const Home = () => {
    return (
        <div>
            <Sidebar />
            <div className='main-content'>
                <Navbar />
                <Content />
            </div>
        </div>
    )
}

export default Home