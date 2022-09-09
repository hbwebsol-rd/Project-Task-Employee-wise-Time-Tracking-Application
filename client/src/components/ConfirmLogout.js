import { Box, Button, Modal, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/actions/loginActions';

const ConfirmLogout = ({ open, setOpen, classes }) => {
    const dispatch = useDispatch();
    function handleClose() {
        setOpen(false);
    }
    const handleLogout =()=>{
        dispatch(logout());
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.formRoot}>
                    <Typography className={classes.resetTitle}>Are you sure, you want to Logout?</Typography>
                    <div>
                        <Button sx={{ color: '#FF6161', border: '#FF6767' }} className={classes.formButton} onClick={() => setOpen(false)}>Cancel</Button>
                        <Link to='/login' style={{ textDecoration: 'none' }}>
                            <Button sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton} onClick={handleLogout}>Logout</Button>
                        </Link>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ConfirmLogout