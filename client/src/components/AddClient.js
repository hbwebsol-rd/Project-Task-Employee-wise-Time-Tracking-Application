import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { PostData } from '../utils/fetch-sevice';

const AddEmployee = ({ open, setOpen, classes }) => {
    const [clientDetails, setClientDetails] = useState({ name: "", email: "", password: "" })
    const dispatch = useDispatch();
    function handleClose() {
        setOpen(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(PostData('customer', clientDetails))
        setOpen(false);
        swal({
            title: "Client Added Successfully",
            icon: "success",
            showConfirmButton: false,
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
                        <Typography className={classes.formTitle}>Add Client</Typography>
                    </div>
                    <TextField
                        margin="normal"
                        required
                        label="Enter Client Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                        onChange={(e) => {
                            setClientDetails({
                                ...clientDetails,
                                [e.target.name]: e.target.value
                            })
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Enter Client Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        className={classes.inputField}
                        onChange={(e) => {
                            setClientDetails({
                                ...clientDetails,
                                [e.target.name]: e.target.value
                            })
                        }}
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
                            setClientDetails({
                                ...clientDetails,
                                [e.target.name]: e.target.value
                            })
                        }}
                        className={classes.inputField}
                    />
                    <div>
                        <Button sx={{ color: '#FF6161', border: '#FF6767' }} className={classes.formButton} onClick={() => setOpen(false)}>CANCEL</Button>
                        <Button sx={{ color: '#3525B5', border: '#FF6767' }} className={classes.formButton} onClick={handleSubmit}>SAVE</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default AddEmployee