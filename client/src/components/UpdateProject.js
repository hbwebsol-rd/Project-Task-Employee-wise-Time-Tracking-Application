import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


const UpdateProject = ({ open, setOpen, row, classes }) => {
    const [projectDetails, setProjectDetails] = useState({})
    const dispatch = useDispatch();
    function handleClose() {
        setOpen(false);
    }

    useEffect(() => {
        setProjectDetails({ name: row.name, client: row.customerName, technology: row.technology })
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
                        <Typography className={classes.formTitle}>Update Project</Typography>
                    </div>
                    <TextField
                        margin="normal"
                        required
                        label="Project Name"
                        name="project"
                        value={projectDetails.name}
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Client Name"
                        name="client"
                        value={projectDetails.client}
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Technology"
                        name="technology"
                        value={projectDetails.technology}
                        autoComplete="name"
                        autoFocus
                        className={classes.inputField}
                    />
                    <Stack direction='row' spacing={2}>
                        <TextField
                            id="date"
                            type='date'
                            label="Date From"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.inputSelect}
                        />
                        <TextField
                            id="date"
                            type='date'
                            label="Date To"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.inputSelect}
                        />
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

export default UpdateProject