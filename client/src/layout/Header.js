import { Avatar, Grid, List, ListItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useStyles } from '../views/view-css';
import HeaderTitle from '../components/HeaderTitle';
import { Link } from 'react-router-dom';
import Image from '../image/profile.png'
import ConfirmLogout from '../components/ConfirmLogout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

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
                            <NotificationsActiveIcon className={classes.headerIcon}/>
                        </Link>
                    </Grid>
                    <div className={classes.dropdown}>
                        <Grid item>
                            <Avatar src={Image} onClick={() => setDrop(!drop)} />
                        </Grid>
                        <Grid item >
                            {drop &&
                                <List >
                                    <ListItem >
                                        <Link to='/profile' className={classes.dropdownList}   >
                                            <Typography onClick={() => setDrop(!drop)} >Profile</Typography>
                                        </Link>
                                    </ListItem>
                                    <ListItem>
                                        <Link to='#' onClick={() => setOpen(true)} className={classes.dropdownList}   >
                                            <Typography onClick={() => setDrop(!drop)} >Logout</Typography>
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