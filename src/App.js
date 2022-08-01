import React from "react";
import {Routes, Route} from 'react-router-dom'
import './App.css';
import Login from "./pages/Login/Login";
// import Home from './pages/Home/Home';
// import Roles from './pages/Roles/Roles';
// import Permission from './pages/Permission/Permission';
// import AllowPermission from './pages/AllowPermission/AllowPermission';
// import UsersList from './pages/UsersList/UsersList';
// import Leaves from './pages/Leaves/Leaves';
// import Announcement from './pages/Announcement/Announcement';
// import Events from './pages/Events/Events';
// import Reports from './pages/Reports/Reports';
// import Attendence from './pages/Attendence/Attendence';

// import EditUserDetail from './Component/UsersTable/EditUserDetail';
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";


const App = () => {
  return (
    <div className='content'>

        <Routes>
          <Route path='/' name='Login' element={<Login />} />
          <Route exact  path='*' name='Home' element={<ProtectedRoute />} />
        </Routes>

    </div>
  );
}


export default App; 