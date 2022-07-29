import React from "react";
import {Routes, Route} from 'react-router-dom'
import './App.css';
import Login from "./pages/Login/Login";
import Home from './pages/Home/Home';
import Roles from './pages/Roles/Roles';
import Permission from './pages/Permission/Permission';
import AllowPermission from './pages/AllowPermission/AllowPermission';
import UsersList from './pages/UsersList/UsersList';
import Leaves from './pages/Leaves/Leaves';
import Announcement from './pages/Announcement/Announcement';
import Events from './pages/Events/Events';
import Reports from './pages/Reports/Reports';
import Attendence from './pages/Attendence/Attendence';
import Error from './pages/Error/Error';
import EditUserDetail from './Component/UsersTable/EditUserDetail';
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";


const App = () => {
  return (
    <div className='content'>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/attendence' element={<ProtectedRoute><Attendence /></ProtectedRoute>} />
          <Route path='/roles' element={<ProtectedRoute><Roles /></ProtectedRoute>} />
          <Route path='/permission' element={<ProtectedRoute><Permission /></ProtectedRoute>} />
          <Route path='/allow-permission' element={<ProtectedRoute><AllowPermission /></ProtectedRoute>} />
          <Route path='/users-List' element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
          <Route path='/editUserDetails/:id' element={<ProtectedRoute><EditUserDetail /></ProtectedRoute>} />
          <Route path='/leaves' element={<ProtectedRoute><Leaves /></ProtectedRoute>} />
          <Route path='/announcement' element={<ProtectedRoute><Announcement /></ProtectedRoute>} />
          <Route path='/events' element={<ProtectedRoute><Events /></ProtectedRoute>} />
          <Route path='/reports' element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path='*' element={<ProtectedRoute><Error /></ProtectedRoute>} />
        </Routes>

    </div>
  );
}


export default App; 