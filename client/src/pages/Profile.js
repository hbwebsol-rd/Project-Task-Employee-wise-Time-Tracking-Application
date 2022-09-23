import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useStyles } from '../views/view-css'
import EditIcon from '@mui/icons-material/Edit';
import EditProfile from '../components/EditProfile';
import ChangePassword from '../components/ChangePassword';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserProfile } from '../store/actions/profileActions';
import PageLoader from '../components/PageLoader';

const Profile = () => {
    const [open, setOpen] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.profile.userProfile)
    const loading = useSelector(state => state.profile.loading)
    const role = useSelector((state) => state.login.role);
    const [userDetails, setUserDetails] = useState(user)


    useEffect(() => {
        {if(role==1){
            dispatch(GetUserProfile());
        }}
    }, [])
    useEffect(() => {
        setUserDetails(user)
    }, [user])

    return (
        <div className={classes.pageRoot}>
            <PageLoader loading={loading} />
            <EditProfile open={open} setOpen={setOpen} user = {userDetails} classes={classes} />
            <Box container className={classes.profileContainer}>
                <Box className={classes.profileTitleBox}>
                    <Typography className={classes.profileTitle} >PROFILE</Typography>
                    <Button onClick={() => setOpen(true)} > <EditIcon sx={{ color: '#3525B5' }} /> </Button>
                </Box>
                <Box className={classes.profileBox}>
                    <Typography className={classes.profileLabel}>Name</Typography>
                    <Typography className={classes.profileValue}>{userDetails.name}</Typography>
                </Box>
                <Box className={classes.profileBox}>
                    <Typography className={classes.profileLabel}>Email ID</Typography>
                    <Typography className={classes.profileValue}>{userDetails.email}</Typography>
                </Box>
                <Box className={classes.profileBox}>
                    <Typography className={classes.profileLabel}>Phone</Typography>
                    <Typography className={classes.profileValue}>{userDetails.phoneNumber}</Typography>
                </Box>
                <Box className={classes.profileBox}>
                    <Typography className={classes.profileLabel}>Designation</Typography>
                    <Typography className={classes.profileValue}>Frontend Developer</Typography>
                </Box>
                <Box className={classes.profileBox}>
                    <Typography className={classes.profileLabel}>Gender</Typography>
                    <Typography className={classes.profileValue}>Male</Typography>
                </Box>
                <Button sx={{ ml: '30px', mb: '20px' }} onClick={() => setOpenChangePassword(true)}>Change password</Button>
                <ChangePassword open={openChangePassword} setOpen={setOpenChangePassword} classes={classes} />
            </Box>
        </div>
    )
}

export default Profile