import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import GradingIcon from "@mui/icons-material/Grading";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import GroupsIcon from "@mui/icons-material/Groups";
import { useStyles } from "../views/view-css";
import Card from "../components/Card";
import useWindowSize from "../utils/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { GetAllDashboardAction } from "../store/actions/dashboardActions";
import { GetAllTasksAction } from "../store/actions/taskActions";
import PageLoader from "../components/PageLoader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.dashboard.count);
  const tasks = useSelector((state) => state.dashboard.todayTask);
  const loading = useSelector((state) => state.dashboard.loading);

  const { width } = useWindowSize();
  const classes = useStyles();
  const [todayTask, setTodayTask] = useState(tasks);

  useEffect(() => {
    dispatch(GetAllDashboardAction());
    dispatch(GetAllTasksAction());
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
        <Box className={classes.taskBox}>
          <Typography className={classes.taskHead}>Today's Task</Typography>
          <Grid container spacing={4}>
            {todayTask === null ? (
              <Typography
                className={classes.taskTitle}
                sx={{ margin: "30px", color: "#FF6161" }}
              >
                No task Found.!!
              </Typography>
            ) : (
              todayTask.map((task, i) => {
                return (
                  <>
                    <Grid item xs={8}>
                      <Typography className={classes.taskTitle}>
                        {task.taskName}
                      </Typography>
                      <Typography className={classes.taskClient}>
                        {task.projectName}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
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
