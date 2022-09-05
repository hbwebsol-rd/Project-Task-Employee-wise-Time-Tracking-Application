import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers'


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
                <Box className={classes.formRoot}>
                    <Typography className={classes.formTitle}>ADD PROJECT</Typography>
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
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <Stack direction='row' spacing={2}>
                            <DesktopDatePicker
                                label="Start Date"
                                inputFormat="MM/dd/yyyy"
                                renderInput={(params) => <TextField {...params} />}
                                className={classes.inputSelect}
                            />
                            <DesktopDatePicker
                                label="End Date"
                                inputFormat="MM/dd/yyyy"
                                renderInput={(params) => <TextField {...params} />}
                                className={classes.inputSelect}
                            />
                        </Stack>
                    </LocalizationProvider>
                    <div>
                        <Button sx={{ color: 'red', border: 'red' }} className={classes.formButton} onClick={() => setOpen(false)}>CANCEL</Button>
                        <Button sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton}>SAVE</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default AddProject