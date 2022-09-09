import { Box, Button, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { DeleteData } from '../utils/fetch-sevice';

const ConfirmDelete = ({ open, setOpen, row, link, classes }) => {
    const dispatch = useDispatch();
    const [id, setId] = useState()
    const [url, setUrl] = useState()

   useEffect(()=>{
        setId(row ._id)
        setUrl(link)
    }, [row])

    function handleClose() {
        setOpen(false);
    }
    const handleDelete = (id) => {
        setOpen(false);
        dispatch(DeleteData(`${url}/${id}`))
        swal({
            title: "Deleted Successfully",
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
                    <Typography className={classes.resetTitle}>Confirm Delete?</Typography>
                    <div>
                        <Button sx={{ color: '#FF6161', border: '#FF6767' }} className={classes.formButton} onClick={() => setOpen(false)}>Cancel</Button>
                        
                            <Button sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton} onClick={() => handleDelete(id, url)}>Delete</Button>
                     
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ConfirmDelete