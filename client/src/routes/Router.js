import React, {useEffect} from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'
import Home from '../Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ResetPassword from '../pages/ResetPassword'
import ProtectedRoutes from './ProtectedRoutes'
import Header from '../layout/Header'
import Sidebar from '../layout/Sidebar'
import { useStyles } from '../views/view-css';
import Dashboard from '../pages/Dashboard';
import Projects from '../pages/Projects';
import Employee from '../pages/Employee';
import Tasks from '../pages/Tasks';
import Client from '../pages/Client';
import Profile from '../pages/Profile';
import Reports from '../pages/Reports';
import { useSelector } from 'react-redux'

const Router = () => {
    const login = useSelector(state => state.login.loggedIn)
    useEffect(() => {
        
    }, []);
    const classes = useStyles();

    return (
        <>
            {login ? 
                <div className={classes.root}>
                    <aside style={{width:'80px'}} >
                    <Sidebar />
                    </aside>
                    <div className={classes.main} >
                        <Header/>
                        <Routes>
                                <Route path='/dashboard' element={<Dashboard />} />
                                <Route path='/profile' element={<Profile />} />
                                <Route path='/editprofile' element={<Home />} />
                                <Route path='/employee' element={<Employee />} />
                                <Route path='/client' element={<Client/>}/>
                                <Route path='/projects' element={<Projects />} />
                                <Route path='/tasks' element={<Tasks />} />
                                <Route path='/reports' element={<Reports />} />
                                <Route path="*" element={<Navigate to ="/dashboard" />}/>
                        </Routes>
                    </div>
                </div>
            : 
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/resetpassword' element={<ResetPassword />} />
                    <Route path="*" element={<Navigate to ="/login" />}/>
                </Routes>
            }
        </>
    )
}

export default Router