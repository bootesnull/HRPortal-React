import React from "react";
import {Routes, Route} from 'react-router-dom'
import './App.css';
import Login from "./pages/Login/Login";
import GoogleLogin from "./pages/Login/GoogleLogin";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";


const App = () => {
  return (
    <div className='content'>

        <Routes>
          <Route path='/' name='Login' element={<Login />} />
          <Route path='/user-login' name='GoogleLogin' element={<GoogleLogin />} />
          <Route exact  path='*' name='Home' element={<ProtectedRoute />} />
        </Routes>

    </div>
  );
}


export default App; 