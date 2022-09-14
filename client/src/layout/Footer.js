import { Typography } from '@mui/material'
import React from 'react'
import { useStyles } from '../views/view-css'

const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <div >
        <Typography sx={{ fontSize:'12px !important', fontWeight:'400 !important', color:"#999999"   }}> Copyright &copy; Worklog 2022</Typography>
      </div>
    </>
  )
}

export default Footer