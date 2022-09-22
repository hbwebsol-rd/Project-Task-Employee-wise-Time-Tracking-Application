import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import GradingIcon from "@mui/icons-material/Grading";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import GroupsIcon from "@mui/icons-material/Groups";
import { useStyles } from "../views/view-css";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { GetAllDashboardAction } from "../store/actions/dashboardActions";
import PageLoader from "../components/PageLoader";
import useWindowSize from "../utils/useWindowSize";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { width }= useWindowSize
  const count = useSelector((state) => state.dashboard.count);
  const tasks = useSelector((state) => state.dashboard.todayTask);
  const loading = useSelector((state) => state.dashboard.loading);
  const role = useSelector((state) => state.login.role);

  const classes = useStyles();
  const [todayTask, setTodayTask] = useState(tasks);
  useEffect(() => {
    if (role === 1) {
      dispatch(GetAllDashboardAction());
    } else {
      //dispatch()
    }
  }, []);

  useEffect(() => {
    {
      tasks &&
        tasks.forEach((task) => {
          task.color = "#67D1FF";

          if (task.status === "completed") {
            task.color = "#67EA52";
          }
          if (task.status === "active") {
            task.color = "#FF9E67";
          }
          if (task.status === "pending") {
            task.color = "#FF6767";
          }
        });
    }
    setTodayTask(tasks);
  }, [tasks]);

  return (
    <>
      <div className={classes.dashboardRoot}>
        <PageLoader loading={loading} />

        {role === 1 ? (
          <Grid className={classes.gridBox} container>
            <Grid item>
              <Card
                count={count.employees}
                label="EMPLOYEES COUNT"
                icon={<BadgeIcon className={classes.dashboardIcons} />}
                classes={classes}
              />
            </Grid>
            <Grid item>
              <Card
                count={count.projects}
                label="PROJECT COUNT"
                icon={<DevicesOtherIcon className={classes.dashboardIcons} />}
                classes={classes}
              />
            </Grid>
            <Grid item>
              <Card
                count={count.tasks}
                label="TASK COUNT"
                icon={<GradingIcon className={classes.dashboardIcons} />}
                classes={classes}
              />
            </Grid>
            <Grid item>
              <Card
                count={count.customers}
                label="CLIENT COUNT"
                icon={<GroupsIcon className={classes.dashboardIcons} />}
                classes={classes}
              />
            </Grid>
          </Grid>
        ) : null}
        <Box className={classes.taskBox}>
          <Typography className={classes.taskHead}>Today's Task</Typography>
          <Grid container spacing={4}>
            {todayTask.length === 0 ? (
              <Typography
                sx={{ margin: "20px",ml:'50px',fontSize: "16px",fontWeight: "800", color: "#FF6161" }}
              >
                No task Found.!!
              </Typography>
            ) : (
              todayTask.map((task, i) => {
                return (
                  <>
                    <Grid item xs={ width>900 ? 9: 8}>
                      <Typography className={classes.taskTitle}>
                        {task.taskName}
                      </Typography>
                      <Typography className={classes.taskClient}>
                        {task.projectName}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        className={classes.status}
                        backgroundColor={task.color}
                      >
                        {task.status}
                      </Typography>
                    </Grid>
                  </>
                );
              })
            )}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
