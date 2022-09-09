import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { UpdateData } from '../utils/fetch-sevice';

const UpdateClient = ({ open, setOpen, row, classes }) => {
    const [clientDetails, setClientDetails] = useState({})
    const dispatch = useDispatch();
    function handleClose() {
        setOpen(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(UpdateData(`customer/update/${row._id}`, clientDetails))
        setOpen(false);
        swal({
            title: "Updated Successfully",
            icon: "success",
            timer: 2000,
        });
    };


    useEffect(() => {
        setClientDetails({ name: row.name, email: row.email, password: "" })
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
                        <Typography className={classes.formTitle}>Update Client</Typography>
                    </div>
                    <TextField
                        margin="normal"
                        required
                        label="Client Name"
                        name="name"
                        autoComplete="name"
                        value={clientDetails.name}
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
                        label="Client Email"
                        name="email"
                        value={clientDetails.email}
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
                    <div>
                        <Button sx={{ color: '#FF6161', border: '#FF6767' }} className={classes.formButton} onClick={() => setOpen(false)}>CANCEL</Button>
                        <Button sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton} onClick={handleSubmit}>SAVE</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default UpdateClient