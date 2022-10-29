import React from 'react'

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

//komponen halaman
import Pengguna from './pengguna';
import Toko from './toko';

function Pengaturan(){
    return (
            <Switch> 
                <Route path="/pengaturan/pengguna" component={Pengguna}></Route>
                <Route path="/pengaturan/toko" component={Toko}></Route>
                <Redirect to="/pengaturan/pengguna"></Redirect>
            </Switch>
        
    );
}
export default Pengaturan