import { Avatar, Grid, List, ListItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useStyles } from '../views/view-css';
import HeaderTitle from '../components/HeaderTitle';
import { Link } from 'react-router-dom';
import ConfirmLogout from '../components/ConfirmLogout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
    const classes = useStyles();
    const [drop, setDrop] = useState(false);
    const [open, setOpen] = useState(false);
    return (
        <div className={classes.headerRoot}>
            <ConfirmLogout open={open} setOpen={setOpen} classes={classes} />
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <HeaderTitle classes={classes} />
                </Grid>
                <div className={classes.headerIcons}>
                    <Grid item >
                        <Link to='#'>
                            <NotificationsActiveIcon className={classes.headerIcon} />
                        </Link>
                    </Grid>
                    <div className={classes.dropdown}>
                        <Grid item>
                            <Avatar onClick={() => setDrop(!drop)} sx={{ width: '35px', height: '32px', position: 'absolute', right: '10px', top: '5px' }} />
                        </Grid>
                        <Grid item >
                            {drop &&
                                <List className={classes.dropdownList}>
                                    <ListItem >
                                        <Link to='/profile' className={classes.dropdownListItem}   >
                                            <Typography onClick={() => setDrop(!drop)} sx={{ display: 'flex', alignItems: 'center' }} > {<PermIdentityIcon />}   Profile</Typography>
                                        </Link>
                                    </ListItem>
                                    <ListItem>
                                        <Link to='#' onClick={() => setOpen(true)} className={classes.dropdownListItem}   >
                                            <Typography onClick={() => setDrop(!drop)} sx={{ display: 'flex', alignItems: 'center' }} > {<LogoutIcon />}  Logout</Typography>
                                        </Link>
                                    </ListItem>
                                </List>
                            }
                        </Grid>
                    </div>
                </div>
            </Grid>
        </div>
    )
}

export default Header