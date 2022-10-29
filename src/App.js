import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Registrasi from './pages/registrasi'
import Login from './pages/login'
import LupaPassword from './pages/lupa-password'
import NotFound from './pages/404'
import Private from './pages/private';
import PrivateRoute from './components/PrivateRoute';
import FirebaseProvider from './components/FirebaseProvider';

function App() {
  return (
  <FirebaseProvider>
    <Router>
      <Switch> 
        <Route path="/registrasi" component={Registrasi}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/lupa-password" component={LupaPassword}></Route>
        <PrivateRoute path='/pengaturan' component={Private}></PrivateRoute>
        <PrivateRoute path='/produk' component={Private}></PrivateRoute>
        <PrivateRoute path='/transaksi' component={Private}></PrivateRoute>
        <PrivateRoute path='/' exact component={Private}></PrivateRoute>
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  </FirebaseProvider>
  );
}

export default App;
