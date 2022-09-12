import { Box, Button, Modal, Typography } from '@mui/material';

const ConfirmDelete = ({ open, setOpen, classes, onConfirm }) => {


    function handleClose() {
        setOpen(false);
    }
    const handleDelete = () => {
        setOpen(false);
        onConfirm();
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
                    <Typography className={classes.resetTitle}>Confirm Delete?</Typography>
                    <div>
                        <Button sx={{ color: '#FF6161', border: '#FF6767' }} className={classes.formButton} onClick={() => setOpen(false)}>Cancel</Button>

                        <Button sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton} onClick={() => handleDelete()}>Delete</Button>

                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ConfirmDelete