import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import BadgeIcon from '@mui/icons-material/Badge';
import GradingIcon from '@mui/icons-material/Grading';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import GroupsIcon from '@mui/icons-material/Groups';
import { useStyles } from '../views/view-css';
import Card from '../components/Card';
import useWindowSize from '../utils/useWindowSize'



const Dashboard = () => {
  const { width } = useWindowSize();
  const classes = useStyles();
  const [employeeCount, setEmployeeCount] = useState(25);
  const [projectCount, setProjectCount] = useState(251);
  const [clientCount, setClientCount] = useState(325);
  const [taskCount, setTaskCount] = useState(503);

  const todayTask = [
    {
      title: 'Contrary to popular belief, Lorem Ipsum is not simply random text',
      client: 'Project Name - Client Name',
      status: 'In Progress',
      color: '#FF9E67'
    },
    {
      title: 'Contrary to popular belief, Lorem Ipsum is not simply random text',
      client: 'Project Name - Client Name',
      status: 'Pending',
      color: '#FF6767'
    },
    {
      title: 'Contrary to popular belief, Lorem Ipsum is not simply random text',
      client: 'Project Name - Client Name',
      status: 'Done',
      color: '#67EA52'
    },
    {
      title: 'Contrary to popular belief, Lorem Ipsum is not simply random text',
      client: 'Project Name - Client Name',
      status: 'New',
      color: '#FFA500'
    },
  ]
  return (
    <div className={classes.dashboardRoot}>
      <Grid container spacing={width<800? 2:10}  >
        <Grid item >
          <Card count={employeeCount} label='EMPLOYEES' icon={<BadgeIcon className={classes.dashboardIcons}/>} classes= {classes} />
        </Grid>
        <Grid item >
          <Card count={projectCount} label='PROJECTS' icon={<DevicesOtherIcon className={classes.dashboardIcons}/>} classes = {classes} />
        </Grid>
        <Grid item >
          <Card count={taskCount} label='TASKS' icon={<GradingIcon className={classes.dashboardIcons} />} classes = {classes} />
        </Grid>
        <Grid item >
          <Card count={clientCount} label='CLIENTS' icon={<GroupsIcon className={classes.dashboardIcons} />} classes = {classes} />
        </Grid>
      </Grid>
      <Box className={classes.taskBox}>
        <Typography className={classes.taskHead} >Today's Task</Typography>
        <Grid container spacing={4}  >
          {todayTask.map((task, i) => {
            return (
              <>
                <Grid item xs={ width>880 ? 8:10}>
                  <Typography className={classes.taskTitle}>{task.title}</Typography>
                  <Typography className={classes.taskClient} >{task.client}</Typography>
                </Grid>
                <Grid item xs={3}>
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