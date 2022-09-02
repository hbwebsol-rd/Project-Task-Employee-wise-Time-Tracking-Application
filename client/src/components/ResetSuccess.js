import { Box,  Modal, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ResetSuccess = ({ open, setOpen, classes }) => {
    const navigate = useNavigate();
    function handleClose() {
        setOpen(false);
        navigate('/login')
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
                    <Typography className={classes.formTitle} sx={{color:'green'}}>Link Sent Successfully</Typography>
                </Box>
            </Modal>
        </>
    )
}

export default ResetSuccess