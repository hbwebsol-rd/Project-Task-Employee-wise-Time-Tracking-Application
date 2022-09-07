import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PostData } from '../utils/fetch-sevice';

const AddEmployee = ({ open, setOpen, classes }) => {
    const [employeeDetails, setEmployeeDetails] = useState({designation: "", name: "", email: "",  password: "" })
    const dispatch = useDispatch();
    function handleClose() {
        setOpen(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(PostData('employee', employeeDetails))
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
                    <Typography className={classes.formTitle}>ADD EMPLOYEE</Typography>
                    <TextField
                        margin="normal"
                        required
                        label="Enter Employee Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                        onChange={(e) => {
                            setEmployeeDetails({
                                ...employeeDetails,
                                [e.target.name]: e.target.value
                            })
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Enter Employee Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        className={classes.inputField}
                        onChange={(e) => {
                            setEmployeeDetails({
                                ...employeeDetails,
                                [e.target.name]: e.target.value
                            })
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Enter Employee Designation"
                        name="designation"
                        autoComplete="name"
                        autoFocus
                        onChange={(e) => {
                            setEmployeeDetails({
                                ...employeeDetails,
                                [e.target.name]: e.target.value
                            })
                        }}
                        className={classes.inputField}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Enter Password"
                        name="password"
                        type='password'
                        autoComplete="name"
                        autoFocus
                        onChange={(e) => {
                            setEmployeeDetails({
                                ...employeeDetails,
                                [e.target.name]: e.target.value
                            })
                        }}
                        className={classes.inputField}
                    />
                    <div>
                        <Button sx={{ color: 'red', border: 'red' }} className={classes.formButton} onClick={() => setOpen(false)}>CANCEL</Button>
                        <Button  sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton} onClick={handleSubmit}>SAVE</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default AddEmployee