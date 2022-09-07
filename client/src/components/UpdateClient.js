import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateData } from '../utils/fetch-sevice';

const UpdateClient = ({ open, setOpen, row, classes }) => {
    const [clientDetails, setClientDetails] = useState({ })
    const dispatch = useDispatch();
    function handleClose() {
        setOpen(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(UpdateData(`customer/update/${row._id}`,clientDetails))
        setOpen(false);
        
    };


    useEffect(()=> {
        setClientDetails({ name: row.name, email: row.email ,  password: "" })
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
                    <Typography className={classes.formTitle}>UPDATE CLIENT</Typography>
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
                        <Button sx={{ color: 'red', border: 'red' }} className={classes.formButton} onClick={() => setOpen(false)}>CANCEL</Button>
                        <Button  sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton} onClick={handleSubmit}>SAVE</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default UpdateClient