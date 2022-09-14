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
import { GetAllDashboardAction } from '../store/actions/dashboardActions';
import { GetAllTasksAction } from '../store/actions/taskActions';
import PageLoader from '../components/PageLoader';


const Dashboard = () => {

  const dispatch = useDispatch();
  const count = useSelector(state => state.dashboard.count)
  // const task = useSelector(state => state.dashboard.todayTask)
  const loading = useSelector(state => state.dashboard.loading)
  const tasks = useSelector(state => state.task.tasks)


  const { width } = useWindowSize();
  const classes = useStyles();
  const [employeeCount, setEmployeeCount] = useState(count.employees);
  const [projectCount, setProjectCount] = useState(count.projects);
  const [clientCount, setClientCount] = useState(count.customers);
  const [taskCount, setTaskCount] = useState(count.tasks);
  const [todayTask, setTodayTask] = useState(tasks)

  useEffect(() => {
    dispatch(GetAllDashboardAction());
    dispatch(GetAllTasksAction())
  }, [])
  
  useEffect(() => {
    setEmployeeCount(count.employees)
    setProjectCount(count.projects)
    setClientCount(count.customers)
    setTaskCount(count.tasks)

    tasks.forEach(task => {
      task.color = '#67D1FF';
      
      if(task.status === 'Done'){
        task.color = '#67EA52';
      }
      if(task.status === 'Completed'){
        task.color = '#FF9E67';
      }
      if(task.status === 'work not started'){
        task.color = '#FF6767';
      }
    })

    setTodayTask(tasks);  


  }, [count, tasks])

  return (
    <>
      <div className={classes.dashboardRoot}>
        
        <PageLoader loading={loading} />

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
                    <Typography className={classes.taskTitle}>{task.taskName}</Typography>
                    <Typography className={classes.taskClient} >{task.projectName}</Typography>
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
    </>
  )
}

export default Dashboard