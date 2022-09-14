import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdatePassword } from '../store/actions/profileActions';

const ChangePassword = ({ open, setOpen, classes }) => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState({ oldPassword: "", password: "", confirmPassword: "" })
    const profile = useSelector(state => state.profile)
console.log(profile)
    useEffect(() => {
        if(profile.updated){
            setOpen(false);
        }
    }, [profile.updated])

    function handleClose() {
        setOpen(false);
    }
    const handleSubmit = ( ) => {
        dispatch(UpdatePassword(password));
    };

    
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.formRoot}>
                    <div style={{ width: '100%' }}>
                        <Typography className={classes.formTitle}>Change Password</Typography>
                    </div>
                    <TextField
                        margin="normal"
                        required
                        label="Enter Old Password"
                        name="oldPassword"
                        autoFocus
                        className={classes.inputField}
                        onChange={(e) => {
                            setPassword({
                                ...password,
                                [e.target.name]: e.target.value
                            })
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Enter New Password"
                        name="password"
                        autoFocus
                        className={classes.inputField}
                        onChange={(e) => {
                            setPassword({
                                ...password,
                                [e.target.name]: e.target.value
                            })
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Confirm Password"
                        name="confirmPassword"
                        autoFocus
                        className={classes.inputField}
                        onChange={(e) => {
                            setPassword({
                                ...password,
                                [e.target.name]: e.target.value
                            })
                        }}
                    />
                    <div>
                        <Button sx={{ color: '#FF6161', border: '#FF6767' }} className={classes.formButton} onClick={() => setOpen(false)}>CANCEL</Button>
                        <Button sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton} onClick={()=> handleSubmit()}>SAVE</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ChangePassword