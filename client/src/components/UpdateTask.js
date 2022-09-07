import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


const UpdateTask = ({ open, setOpen, row, classes }) => {
    const [taskDetails, setTaskDetails] = useState({ })
    const dispatch = useDispatch();
    function handleClose() {
        setOpen(false);
    }

    useEffect(()=> {
        setTaskDetails({designation: row.designation, name: row.name, email: row.email ,  password: "" })
    }, [row])

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.formRoot}>
                    <Typography className={classes.formTitle}>UPDATE TASK</Typography>
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
                        label="Enter Task Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Enter Employee Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <Stack direction='row' spacing={2}>
                        <FormControl className={classes.inputSelect}>
                            <InputLabel id="priority-label">Priority</InputLabel>
                            <Select
                                labelId="priority-label"
                                id="select"
                                label="Priority"
                            >
                                <MenuItem value='low'>Low</MenuItem>
                                <MenuItem value='medium'>Medium</MenuItem>
                                <MenuItem value='high'>High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.inputSelect}>
                            <InputLabel size='large' id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                id="select"
                                label="Priority"
                            >
                                <MenuItem value='active'>Active</MenuItem>
                                <MenuItem value='completed'>Completed</MenuItem>
                                <MenuItem value='pending'>Pending</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <div>
                        <Button sx={{ color: 'red', border: 'red' }} className={classes.formButton} onClick={() => setOpen(false)}>CANCEL</Button>
                        <Button sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton}>SAVE</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default UpdateTask