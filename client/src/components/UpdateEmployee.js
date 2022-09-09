import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { GetFetch } from '../store/actions/employeeActions';
import { UpdateData } from '../utils/fetch-sevice';

const UpdateEmployee = ({ open, setOpen, row, classes }) => {
    const [employeeDetails, setEmployeeDetails] = useState({})
    const dispatch = useDispatch();
    function handleClose() {
        setOpen(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(UpdateData(`employee/update/${row._id}`, employeeDetails))
        dispatch(GetFetch('employee'));
        setOpen(false);
        swal({
            title: "Updated Successfully",
            icon: "success",
            timer: 2000,
        });
    };


    useEffect(() => {
        setEmployeeDetails({ designation: row.designation, name: row.name, email: row.email, password: "" })
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
                        <Typography className={classes.formTitle}>Update Employee</Typography>
                    </div>
                    <TextField
                        margin="normal"
                        required
                        label="Employee Name"
                        name="name"
                        autoComplete="name"
                        value={employeeDetails.name}
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
                        label="Employee Email"
                        name="email"
                        value={employeeDetails.email}
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
                        label="Employee Designation"
                        name="designation"
                        value={employeeDetails.designation}
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

export default UpdateEmployee