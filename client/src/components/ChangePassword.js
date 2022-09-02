import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const ChangePassword = ({ open, setOpen, classes }) => {
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
                    <Typography className={classes.formTitle}>CHANGE PASSWORD</Typography>
                    <TextField
                        margin="normal"
                        required
                        label="Enter Old Password"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Enter New Password"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        className={classes.inputField}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Confirm Password"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <div>
                        <Button sx={{ color: 'red', border: 'red' }} className={classes.formButton} onClick={() => setOpen(false)}>CANCEL</Button>
                        <Button sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton}>SAVE</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ChangePassword