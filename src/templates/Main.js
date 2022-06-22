import {Routes, Route} from 'react-router-dom'
//Pages
import Home from '../pages/Home/Home';
import Roles from '../pages/Roles/Roles';
import Permission from '../pages/Permission/Permission';
import UsersList from '../pages/UsersList/UsersList';

import Leaves from '../pages/Leaves/Leaves';
import Announcement from '../pages/Announcement/Announcement';
import Events from '../pages/Events/Events';

import Error from '../pages/Error/Error';
import EditUserDetail from '../Component/UsersTable/EditUserDetail';


const Main = () => {
  return (
    <div className='content'>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/roles' element={<Roles />} />
          <Route path='/permission' element={<Permission />} />
          <Route path='/users-List' element={<UsersList />} />
          <Route path='/editUserDetails/:id' element={<EditUserDetail />} />
          <Route path='/leaves' element={<Leaves />} />
          <Route path='/announcement' element={<Announcement />} />
          <Route path='/events' element={<Events />} />
          <Route path='*' element={<Error />} />
        </Routes>

    </div>
  );
}

export default Main;