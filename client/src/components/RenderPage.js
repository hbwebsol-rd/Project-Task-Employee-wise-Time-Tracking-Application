import React from 'react'
import { useLocation } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Projects from '../pages/Projects';
import Employee from '../pages/Employee';
import Tasks from '../pages/Tasks';
import Client from '../pages/Client';
import Profile from '../pages/Profile';
import Reports from '../pages/Reports';

const RenderPage = () => {
  const location = useLocation();
  if(location.pathname === '/dashboard' || location.pathname === '/home'){
    return <Dashboard />
  }
  if (location.pathname === '/employee'){
    return <Employee/>
  }
  if (location.pathname === '/client'){
    return <Client />
  }
  if (location.pathname === '/projects'){
    return <Projects/>
  }
  if (location.pathname === '/tasks'){
    return <Tasks/>
  }
  if (location.pathname === '/profile'){
    return <Profile/>
  }
  if (location.pathname === '/reports'){
    return <Reports/>
  }
}

export default RenderPage