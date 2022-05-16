import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



//Pages
import Home from './pages/Home/Home'
import Error from './pages/Error/Error';
import Roles from './Component/Roles/Roles';

function App() {
  return (
    <div className='content'>
      {/* <GoogleLoginBtn /> */}
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/role' element={<Roles />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
