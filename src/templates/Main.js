import {Routes, Route} from 'react-router-dom'
//Pages
import Home from '../pages/Home/Home';
import Roles from '../pages/Roles/Roles';
import Permission from '../pages/Permission/Permission';
import AllowPermission from '../pages/AllowPermission/AllowPermission';
import Error from '../pages/Error/Error';



const Main = () => {
  return (
    <div className='content'>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/roles' element={<Roles />} />
          <Route path='/permission' element={<Permission />} />
          <Route path='/allow-permission' element={<AllowPermission />} />
          <Route path='*' element={<Error />} />
        </Routes>

    </div>
  );
}

export default Main;