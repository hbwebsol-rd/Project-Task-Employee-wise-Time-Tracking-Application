import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const AddEmployee = ({ open, setOpen, classes }) => {
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
                    <Typography className={classes.formTitle}>ADD EMPLOYEE</Typography>
                    <TextField
                        margin="normal"
                        required
                        label="Enter Employee Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Enter Employee Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        className={classes.inputField}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Enter Employee Designation"
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

export default AddEmployee