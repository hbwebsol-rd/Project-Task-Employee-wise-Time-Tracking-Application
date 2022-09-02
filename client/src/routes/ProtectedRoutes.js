import React from 'react'
import { useSelector } from 'react-redux/es/exports';
import { Outlet } from 'react-router-dom';
import Login from '../pages/Login';

const useAuth = () => {
  const loggedIn = useSelector(state => state.loggedIn)
  const user = { loggedIn };
  return user && user.loggedIn;
}

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return (
    isAuth ? <Outlet /> : <Login />
  )
}

export default ProtectedRoutes