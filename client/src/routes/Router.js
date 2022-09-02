import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ResetPassword from '../pages/ResetPassword'
import ProtectedRoutes from './ProtectedRoutes'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/resetpassword' element={<ResetPassword />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path='/home' element={<Home />} />
                    <Route path='/dashboard' element={<Home />} />
                    <Route path='/profile' element={<Home />} />
                    <Route path='/editprofile' element={<Home />} />
                    <Route path='/employee' element={<Home />} />
                    <Route path='/client' element={<Home/>}/>
                    <Route path='/projects' element={<Home />} />
                    <Route path='/tasks' element={<Home />} />
                    <Route path='/reports' element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router