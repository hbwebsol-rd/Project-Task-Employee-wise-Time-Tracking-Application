import { Typography } from '@mui/material';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const HeaderTitle = ({ classes }) => {
    const location = useLocation();
    if (location.pathname === '/dashboard' || location.pathname === '/home' || location.pathname === '/profile') {
        return (
        <Link to='/home' style={{textDecoration: 'none'}} >
            <Typography className={classes.logo} >
                WORKLOG
            </Typography>
        </Link>
    )}
    if (location.pathname === '/employee') {
        return <Typography className={classes.title}>EMPLOYEES</Typography>
    }
    if (location.pathname === '/client') {
        return <Typography className={classes.title}>CLIENT</Typography>
    }
    if (location.pathname === '/projects') {
        return <Typography className={classes.title}>PROJECTS</Typography>
    }
    if (location.pathname === '/tasks') {
        return <Typography className={classes.title}>TASKS</Typography>
    }
    if (location.pathname === '/reports') {
        return <Typography className={classes.title}>Reports</Typography>
    }
}

export default HeaderTitle