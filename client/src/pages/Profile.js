import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useStyles } from '../views/view-css'
import EditIcon from '@mui/icons-material/Edit';
import EditProfile from '../components/EditProfile';
import ChangePassword from '../components/ChangePassword';


const Profile = () => {
    const [open, setOpen] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const classes = useStyles();
    return (
        <div className={classes.pageRoot}>
            <Box container className={classes.profileContainer}>
                <Box className={classes.profileTitleBox}>
                    <Typography className={classes.profileTitle} >PROFILE</Typography>
                    <Button onClick={() => setOpen(true)} > <EditIcon  sx={{color:'#3525B5'}}/> </Button>
                </Box>
                <EditProfile open={open} setOpen={setOpen} classes = {classes} />
                <Box className={classes.profileBox}>
                    <Typography className={classes.profileLabel}>Name</Typography>
                    <Typography className={classes.profileValue}>Saurabh Yadav</Typography>
                </Box>
                <Box className={classes.profileBox}>
                    <Typography className={classes.profileLabel}>Email ID</Typography>
                    <Typography className={classes.profileValue}>saurabh@gmail.com</Typography>
                </Box>
                <Box className={classes.profileBox}>
                    <Typography className={classes.profileLabel}>Phone</Typography>
                    <Typography className={classes.profileValue}>+91-8269084815</Typography>
                </Box>
                <Box className={classes.profileBox}>
                    <Typography className={classes.profileLabel}>Designation</Typography>
                    <Typography className={classes.profileValue}>Frontend Developer</Typography>
                </Box>
                <Box className={classes.profileBox}>
                    <Typography className={classes.profileLabel}>Gender</Typography>
                    <Typography className={classes.profileValue}>Male</Typography>
                </Box>
                <Button sx={{ml:'30px', mb:'20px'}} onClick={() => setOpenChangePassword(true)}>Change password</Button>
                <ChangePassword open={openChangePassword} setOpen={setOpenChangePassword} classes = {classes} />
            </Box>
        </div>
    )
}

export default Profile