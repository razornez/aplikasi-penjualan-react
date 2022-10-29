import React from 'react'

import {Switch, Route} from 'react-router-dom'

import EditProduk from './edit'
import GridProduk from './grid'

function produk(){
    return (
        <Switch>
            <Route path="/produk/edit/:produkId" component={EditProduk}></Route>
            <Route component={GridProduk}></Route>
        </Switch>
    )
}

export default produk