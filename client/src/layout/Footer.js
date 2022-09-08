import { Typography } from '@mui/material'
import React from 'react'
import { useStyles } from '../views/view-css'

const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <div >
        <Typography className={classes.footer}> Copyright &copy; Worklog 2022</Typography>
      </div>
    </>
  )
}

export default Footer