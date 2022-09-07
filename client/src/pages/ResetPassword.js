import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useStyles } from '../views/view-css';
import Image from '../image/reset.png';
import ResetSuccess from '../components/ResetSuccess';


const ResetPassword = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true)
  };
  return (
    <div className={classes.loginMain} >
      <div style={{backgroundImage: `url(${Image})`, backgroundSize:'cover', backgroundPosition:'center'}}>
        <Box className={classes.loginImageBox}>
        <Typography sx={{fontSize:'25px', fontWeight:'600', position:'absolute', left:'20px', top:'30px', color:'#ffffff'}}>WORKLOG</Typography>
        </Box>
      </div>
      <div className={classes.loginForm} >
        <Box className={classes.loginRoot}>
          <Typography className={classes.title}>
            RESET PASSWORD
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoFocus
            />
            <ResetSuccess open={open} setOpen={setOpen} classes={classes} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#3525b5' }}
            >
              Send Link to reset
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/login' variant="body2">
                  Return to Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default ResetPassword