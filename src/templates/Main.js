import {Routes, Route} from 'react-router-dom'
//Pages
import Home from '../pages/Home/Home';
import Roles from '../pages/Roles/Roles';
import Permission from '../pages/Permission/Permission';
import AllowPermission from '../pages/AllowPermission/AllowPermission';
import UsersList from '../pages/UsersList/UsersList';

import Leaves from '../pages/Leaves/Leaves';
import Announcement from '../pages/Announcement/Announcement';
import Events from '../pages/Events/Events';
import Reports from '../pages/Reports/Reports';
import Attendence from '../pages/Attendence/Attendence';

import Error from '../pages/Error/Error';
import EditUserDetail from '../Component/UsersTable/EditUserDetail';
import Login from '../pages/Login/Login';
import ProtectedRoute from '../Component/ProtectedRoute/ProtectedRoute';


const Main = () => {
  return (
    <div className='content'>

        <Routes>
          {/* <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/attendence' element={<Attendence />} />
          <Route path='/roles' element={<Roles />} />
          <Route path='/permission' element={<Permission />} />
          <Route path='/allow-permission' element={<AllowPermission />} />
          <Route path='/users-List' element={<UsersList />} />
          <Route path='/editUserDetails/:id' element={<EditUserDetail />} />
          <Route path='/leaves' element={<Leaves />} />
          <Route path='/announcement' element={<Announcement />} />
          <Route path='/events' element={<Events />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='*' element={<Error />} /> */}
        </Routes>

    </div>
  );
}

export default Main;