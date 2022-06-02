import React from "react";

import './App.css';
import Navbar from "./Component/Navbar/Navbar";
import Sidebar from "./Component/Sidebar/Sidebar";
// import GoogleLoginBtn from './Component/GoogleLoginBtn/GoogleLoginBtn'

// template
import Main from "./templates/Main";

const App = () => {
    return(
        <div>
          {/* <GoogleLoginBtn /> */}
            <Sidebar/>
            <div className='main-content'>
                <Navbar/>
                <Main />
            </div>
        </div>
    );
};

export default App; 
