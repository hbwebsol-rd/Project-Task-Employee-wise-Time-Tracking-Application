import { Box, Button, Modal, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ConfirmLogout = ({ open, setOpen, classes }) => {
    function handleClose() {
        setOpen(false);
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
                    <Typography className={classes.formTitle}>ARE YOU SURE, YOU WANT TO LOGOUT?</Typography>
                    <div>
                        <Button sx={{ color: 'red', border: 'red' }} className={classes.formButton} onClick={() => setOpen(false)}>CANCEL</Button>
                        <Link to='/login' className={classes.dropdownList}>
                            <Button sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton}>LOGOUT</Button>
                        </Link>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ConfirmLogout