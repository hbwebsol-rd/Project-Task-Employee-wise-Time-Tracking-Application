import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useStyles } from '../views/view-css';
import Img from '../image/login.png';
import { loggedIn } from '../store/actions/loginActions';


const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loggedIn());
    navigate('/home')
  };
  return (
    <div className={classes.loginMain} >
      <div style={{backgroundImage: `url(${Img})`}}>
        <Box className={classes.loginImageBox}>
          <Typography className={classes.loginTitle}>GET {<br/>} STARTED !{<br/>} WORKLOG</Typography>
        </Box>
      </div>
      <div className={classes.loginForm} >
        <Box className={classes.loginRoot}>
          <Typography className={classes.title}>
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#3525b5' }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/login' variant="body2">
                  Back to login page
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default Login