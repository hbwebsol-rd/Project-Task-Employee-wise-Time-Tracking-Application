import { Box, Typography } from '@mui/material';
import React from 'react'

const Card = ({count, label, icon, classes}) => {
  return (
    <>
        <Box className={classes.box}>
            {icon}
            <Box sx={{ margin: '15px' }}>
              <Typography className={classes.count} >{count}</Typography>
              <Typography className={classes.typo}>{label}</Typography>
            </Box>
          </Box>
    </>
  )
}

export default Card