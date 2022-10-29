import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Registrasi from './pages/registrasi'
import Login from './pages/login'
import LupaPassword from './pages/lupa-password'
import NotFound from './pages/404'
import Private from './pages/private';

function App() {
  return (
   <Router>
     <Routes> 
       <Route path="/registrasi" element={<Registrasi/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
       <Route path="/lupa-password" element={<LupaPassword/>}></Route>
       <Route path='/pengaturan' element={<Private/>}></Route>
       <Route path='*' element={<NotFound/>}></Route>
     </Routes>
   </Router>
   
  );
}

export default App;
