import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';

const EditProfile = ({ open, setOpen, classes }) => {
    function handleClose() {
        setOpen(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setOpen(false);
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
                        <Typography className={classes.formTitle}>Edit Profile</Typography>
                    </div>
                    <TextField
                        margin="normal"
                        required
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}

                    />
                    <TextField
                        margin="normal"
                        required
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        className={classes.inputField}

                    />
                    <TextField
                        margin="normal"
                        required
                        label="Designation"
                        name="designation"
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Phone Number"
                        name="phone"
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <FormControl className={classes.inputField}>
                        <InputLabel size='large' id="status-label">Gender</InputLabel>
                        <Select
                            labelId="status-label"
                            id="select"
                            label="Priority"
                        >
                            <MenuItem value='male'>Male</MenuItem>
                            <MenuItem value='female'>Female</MenuItem>
                            <MenuItem value='other'>Other</MenuItem>
                        </Select>
                    </FormControl>
                    <div>
                        <Button sx={{ color: '#FF6161', border: '#FF6767' }} className={classes.formButton} onClick={() => setOpen(false)}>CANCEL</Button>
                        <Button sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton} onClick={handleSubmit}>SAVE</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default EditProfile