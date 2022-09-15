import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';


const AddProject = ({ open, setOpen, classes }) => {
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
                <Box  className={classes.formRoot}>
                    <div style={{ width: '100%' }}>
                        <Typography className={classes.formTitle}>Add Project</Typography>
                    </div>
                    <TextField
                        margin="normal"
                        required
                        label="Enter Project Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Enter Customer Name"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        className={classes.inputField}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Technology"
                        name="technology"
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                        <Stack direction='row' spacing={2}>
                            <TextField
                                id="date"
                                type='date'
                                label="Date From"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className={classes.inputSelect}
                            />
                            <TextField
                                id="date"
                                type='date'
                                label="Date To"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className={classes.inputSelect}
                            />
                        </Stack>
                    <div>
                        <Button sx={{ color: '#FF6161', border: '#FF6767' }} className={classes.formButton} onClick={() => setOpen(false)}>CANCEL</Button>
                        <Button sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton}>SAVE</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default AddProject