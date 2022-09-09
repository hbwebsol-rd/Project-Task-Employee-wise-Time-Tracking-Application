import { Typography } from '@mui/material'
import React from 'react'
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div style={{ width:'100%', display:'flex', justifyContent:'center', margin:'40px 0'}}>
        <ReactLoading type='spin' color="#3525B5" />
    </div>
  )
}

export default Loading