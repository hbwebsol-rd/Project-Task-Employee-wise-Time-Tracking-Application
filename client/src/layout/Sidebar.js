import { Link } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux/es/exports';
import { List, ListItem, Typography } from '@mui/material'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SourceIcon from '@mui/icons-material/Source';
import TaskIcon from '@mui/icons-material/Task';
import { useStyles } from '../views/view-css';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Sidebar = () => {
    const role = useSelector(state => state.role)
    const classes = useStyles();
    return (
        <div className={classes.sidebarRoot} >
            <List >
                <ListItem >
                    <Link to='/dashboard' >
                        <DashboardRoundedIcon className={classes.sidebarIcons} />
                    </Link>
                </ListItem>
                <ListItem >
                    <Link to='/tasks' >
                        <TaskIcon className={classes.sidebarIcons} />
                    </Link>
                </ListItem>
                {role !== 'employee' ? <div>
                    <ListItem >
                        <Link to='/client'  >
                            <GroupsIcon className={classes.sidebarIcons} />
                        </Link>
                    </ListItem>
                    <ListItem >
                        <Link to='/projects' >
                            <SourceIcon className={classes.sidebarIcons} />
                        </Link>
                    </ListItem>

                    <ListItem >
                        <Link to='/employee  ' >
                            <BadgeIcon className={classes.sidebarIcons} />
                        </Link>
                    </ListItem>
                    <ListItem >
                        <Link to='/reports  ' >
                            <AssessmentIcon className={classes.sidebarIcons} />
                        </Link>
                    </ListItem>
                </div> : null}
                <div className={classes.version}>
                    <Typography sx={{fontSize:'12px', fontWeight:'400', color:'#ffffff', letterSpacing:'0.15em'}}>Version</Typography>
                    <Typography sx={{fontSize:'12px', fontWeight:'600', color:'#ffffff', letterSpacing:'0.15em'}} >1.0.0</Typography>
                </div>

            </List>
        </div>
    )
}

export default Sidebar