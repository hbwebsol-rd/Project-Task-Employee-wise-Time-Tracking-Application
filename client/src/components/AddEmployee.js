import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { GetFetch } from '../store/actions/employeeActions';
import { PostData } from '../utils/fetch-sevice';

const AddEmployee = ({ open, setOpen, classes }) => {
    const [employeeDetails, setEmployeeDetails] = useState({ designation: "", name: "", email: "", password: "" })
    const dispatch = useDispatch();
    function handleClose() {
        setOpen(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(PostData('employee', employeeDetails))
        dispatch(GetFetch('employee'))
        setOpen(false);
        swal({
            title: "Employee Added Successfully",
            icon: "success",
            timer: 2000,
        });
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
                        <Typography className={classes.formTitle}>Add Employee</Typography>
                    </div>
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
                        <Button sx={{ color: '#FF6161', border: '#FF6767' }} className={classes.formButton} onClick={() => setOpen(false)}>CANCEL</Button>
                        <Button sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton} onClick={handleSubmit}>SAVE</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default AddEmployee