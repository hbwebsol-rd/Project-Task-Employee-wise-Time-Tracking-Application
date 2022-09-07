import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useStyles } from '../views/view-css';
import Img from '../image/login.png';
import { PostUser } from '../utils/fetch-sevice';
import { loggedIn } from '../store/actions/loginActions';


const Login = () => {
  const classes = useStyles();
  const [loginDetail, setLoginDetails] = useState({ email: "hussainbandook01@gmail.com", password: "12345678" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(PostUser('auth/user/login', loginDetail))
    dispatch(loggedIn());
    navigate('/home')
  };
  return (
    <div className={classes.loginMain} >
      <div style={{backgroundImage: `url(${Img})`}}>
        <Box className={classes.loginImageBox}>
          <Typography className={classes.loginTextItem}>GET {<br/>} STARTED !</Typography>
          <Typography className={classes.loginTitle}>WORKLOG</Typography>
        </Box>
      </div>
      <div className={classes.loginForm} >
        <Box className={classes.loginRoot}>
          <Typography className={classes.title}>
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              name='email'
              required
              fullWidth
              id="email"
              label="Email Address"
              value={loginDetail.email}
              onChange={(e)=> {
                setLoginDetails({
                  ...loginDetail,
                  [e.target.name] : e.target.value
                })
              }}
            />
            <TextField
              margin="normal"
              name='password'
              required
              fullWidth
              label="Password"
              type="password"
              value={loginDetail.password}
              onChange={(e)=> {
                setLoginDetails({
                  ...loginDetail,
                  [e.target.name] : e.target.value
                })
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#3525b5' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/resetpassword' variant="body2">
                  Forgot password?
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