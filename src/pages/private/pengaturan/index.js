import React from 'react'

import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

//komponen halaman
import Pengguna from './pengguna';
import Toko from './toko';

function Pengaturan(){
    return (
            <Routes> 
                <Route path="/pengaturan/pengguna" element={<Pengguna/>}></Route>
                <Route path="/pengaturan/toko" element={<Toko/>}></Route>
                <Navigate to="/pengaturan/pengguna"></Navigate>
            </Routes>
        
    );
}
export default Pengaturan