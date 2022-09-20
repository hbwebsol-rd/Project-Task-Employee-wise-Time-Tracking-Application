import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useStyles } from '../views/view-css';
import Img from '../image/login.png';
import { LoginAction } from '../store/actions/loginActions';
import PageLoader from '../components/PageLoader';


const Login = () => {
  const classes = useStyles();
  const [loginDetail, setLoginDetails] = useState({ email: "hussainbandook01@gmail.com", password: "12345678" });
  const [emailError, setEmailError] = useState()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading= useSelector(state => state.login.loading)
  let { admin } = useParams();
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!loginDetail.email) {
      setEmailError('Email Required')
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(loginDetail.email)
    ) {
      setEmailError('Invalid email address')
    }
    else {
      dispatch(LoginAction({ email: loginDetail.email, password: loginDetail.password, role: admin ? 1 : 2 }))
      navigate('/home')
    }
  }

  return (
    <div className={classes.loginMain} >
      <PageLoader loading={loading} />
      <div style={{ backgroundImage: `url(${Img})` }}>
        <Box className={classes.loginImageBox}>
          <Typography className={classes.loginTextItem}>GET {<br />} STARTED !</Typography>
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
              error = {emailError ? true : false}
              helperText= {emailError ? emailError : null}
              required
              fullWidth
              id="email"
              label="Email Address"
              value={loginDetail.email}
              onChange={(e) => {
                setLoginDetails({
                  ...loginDetail,
                  [e.target.name]: e.target.value
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
              onChange={(e) => {
                setLoginDetails({
                  ...loginDetail,
                  [e.target.name]: e.target.value
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