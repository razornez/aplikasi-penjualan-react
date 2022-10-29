import React from "react";

import {BrowserRouter as Router, Route, Switch, Navigate} from 'react-router-dom'
import Home from "./home";
import Pengaturan from "./pengaturan";
import produk from "./produk";
import Transaksi from "./transaksi";

function Private(){
    return (
    <Switch> 
       <Route path="/pengaturan" component={Pengaturan}></Route>
       <Route path="/produk" component={produk}></Route>
       <Route path="/transaksi" component={Transaksi}></Route>
       <Route component={Home}></Route>
     </Switch>
    )
}

export default Private;