import React from "react";

import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Pengaturan from "./pengaturan";
import Pengguna from './pengaturan/pengguna';

function Private(){
    return (
        <Pengaturan/>
    )
}

export default Private;