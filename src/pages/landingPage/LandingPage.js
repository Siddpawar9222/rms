import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from '../../features/user/Login';
import Register from '../../features/user/Register';
import ForgotPassword from '../../features/user/ForgotPassword';

const LandingPage = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
        </>
    )
}

export default LandingPage;
