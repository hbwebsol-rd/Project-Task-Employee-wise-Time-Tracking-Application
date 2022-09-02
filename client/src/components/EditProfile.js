import { Box, Button, Modal, TextField, Typography } from '@mui/material';


const EditProfile = ({ open, setOpen, classes }) => {
    function handleClose() {
        setOpen(false);
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.formRoot}>
                    <Box className={classes.profileTitleBox}>
                        <Typography className={classes.profileTitle} >EDIT PROFILE</Typography>
                    </Box>
                    <Box className={classes.profileBox}>
                        <Typography className={classes.editProfileLabel}>Name</Typography>
                        <TextField value='Saurabh Yadav' variant="standard" />
                    </Box>
                    <Box className={classes.profileBox}>
                        <Typography className={classes.editProfileLabel}>Email ID</Typography>
                        <TextField value='saurabh@gmail.com' variant="standard" />
                    </Box>
                    <Box className={classes.profileBox}>
                        <Typography className={classes.editProfileLabel}>Phone</Typography>
                        <TextField value='8269084815' variant="standard" />
                    </Box>
                    <Box className={classes.profileBox}>
                        <Typography className={classes.editProfileLabel}>Designation</Typography>
                        <TextField value='Frontend Developer' variant="standard" />
                    </Box>
                    <div>
                        <Button sx={{ color: 'red', border: 'red' }} className={classes.formButton} onClick={() => setOpen(false)}>CANCEL</Button>
                        <Button sx={{ color: '#3525B5', border: '#3525B5' }} className={classes.formButton}>SAVE</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default EditProfile