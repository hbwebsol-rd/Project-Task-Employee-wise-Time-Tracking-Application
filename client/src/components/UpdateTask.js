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
        setTaskDetails({task: row.taskName, project: row.projectName, employee: row.employeeName, priority: row.priority  })
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
                <div style={{ width: '100%' }}>
                        <Typography className={classes.formTitle}>Update Task</Typography>
                    </div>
                    <TextField
                        margin="normal"
                        required
                        label="Project Name"
                        name="project"
                        value={taskDetails.project}
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Task Name"
                        name="task"
                        value={taskDetails.task}
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Employee Name"
                        name="employee"
                        value={taskDetails.employee}
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
                                value={taskDetails.priority}
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
                        <Button sx={{ color: '#FF6161', border: '#FF6767' }} className={classes.formButton} onClick={() => setOpen(false)}>CANCEL</Button>
                        <Button sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton}>SAVE</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default UpdateTask