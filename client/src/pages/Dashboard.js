import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BadgeIcon from '@mui/icons-material/Badge';
import GradingIcon from '@mui/icons-material/Grading';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import GroupsIcon from '@mui/icons-material/Groups';
import { useStyles } from '../views/view-css';
import Card from '../components/Card';
import useWindowSize from '../utils/useWindowSize'
import { useDispatch, useSelector } from 'react-redux';
import { GetFetch } from '../store/actions/employeeActions';


const Dashboard = () => {

  const dispatch = useDispatch();


  const { width } = useWindowSize();
  const classes = useStyles();
  const [employeeCount, setEmployeeCount] = useState(16);
  const [projectCount, setProjectCount] = useState(251);
  const [clientCount, setClientCount] = useState(325);
  const [taskCount, setTaskCount] = useState(503);

  const todayTask = [
    {
      title: 'Contrary to popular belief, Lorem Ipsum is not simply random text',
      client: 'Project Name - Client Name',
      status: 'IN PROGRESS',
      color: '#FF9E67'
    },
    {
      title: 'Contrary to popular belief, Lorem Ipsum is not simply random text',
      client: 'Project Name - Client Name',
      status: 'PENDING',
      color: '#FF6767'
    },
    {
      title: 'Contrary to popular belief, Lorem Ipsum is not simply random text',
      client: 'Project Name - Client Name',
      status: 'DONE',
      color: '#67EA52'
    },
    {
      title: 'Contrary to popular belief, Lorem Ipsum is not simply random text',
      client: 'Project Name - Client Name',
      status: 'NEW',
      color: '#67D1FF'
    },
  ]
  return (
    <div className={classes.dashboardRoot}>
      <Grid container spacing={width < 800 ? 2 : 10}  >
        <Grid item >
          <Card count={employeeCount} label='EMPLOYEES COUNT' icon={<BadgeIcon className={classes.dashboardIcons} />} classes={classes} />
        </Grid>
        <Grid item >
          <Card count={projectCount} label='PROJECT COUNT' icon={<DevicesOtherIcon className={classes.dashboardIcons} />} classes={classes} />
        </Grid>
        <Grid item >
          <Card count={taskCount} label='TASK COUNT' icon={<GradingIcon className={classes.dashboardIcons} />} classes={classes} />
        </Grid>
        <Grid item >
          <Card count={clientCount} label='CLIENT COUNT' icon={<GroupsIcon className={classes.dashboardIcons} />} classes={classes} />
        </Grid>
      </Grid>
      <Box className={classes.taskBox}>
        <Typography className={classes.taskHead} >Today's Task</Typography>
        <Grid container spacing={4}  >
          {todayTask.map((task, i) => {
            return (
              <>
                <Grid item xs={width > 880 ? 8 : 10}>
                  <Typography className={classes.taskTitle}>{task.title}</Typography>
                  <Typography className={classes.taskClient} >{task.client}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className={classes.status} backgroundColor={task.color} >{task.status}</Typography>
                </Grid>
              </>
            )
          })}

        </Grid>
      </Box>

    </div>
  )
}

export default Dashboard