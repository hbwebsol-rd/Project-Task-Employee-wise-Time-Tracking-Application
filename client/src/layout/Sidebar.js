import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux/es/exports";
import { Box, List, ListItem, Typography } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SourceIcon from "@mui/icons-material/Source";
import TaskIcon from "@mui/icons-material/Task";
import { useStyles } from "../views/view-css";
import BadgeIcon from "@mui/icons-material/Badge";
import GroupsIcon from "@mui/icons-material/Groups";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Logo from "../image/worklog.png";

const Sidebar = () => {
  const role = useSelector((state) => state.login.role);
  const classes = useStyles();

  return (
    <div className={classes.sidebarRoot}>
      <Link to="/home">
        <Box
          component="img"
          sx={{
            height: 50,
            objectFit: "contain",
            margin: "15px",
            mt: "25px",
            mb: "4rem",
          }}
          alt="The house from the offer."
          src={`${Logo}`}
        />
      </Link>
      <List>
        <ListItem>
          <Link to="/dashboard" className={classes.sidebarList}>
            <DashboardRoundedIcon />
            <Typography className={classes.sidebarLabel}>DASHBOARD</Typography>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/tasks" className={classes.sidebarList}>
            <TaskIcon />
            <Typography className={classes.sidebarLabel}>TASKS</Typography>
          </Link>
        </ListItem>
        {role === 1 ? (
          <div>
            <ListItem>
              <Link to="/projects" className={classes.sidebarList}>
                <SourceIcon />
                <Typography className={classes.sidebarLabel}>
                  PROJECTS
                </Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/clients" className={classes.sidebarList}>
                <GroupsIcon />
                <Typography className={classes.sidebarLabel}>
                  CLIENTS
                </Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/employees" className={classes.sidebarList}>
                <BadgeIcon />
                <Typography className={classes.sidebarLabel}>
                  EMPLOYEES
                </Typography>
              </Link>
            </ListItem>
          </div>
        ) : null}
        <ListItem>
          <Link to="/reports" className={classes.sidebarList}>
            <AssessmentIcon />
            <Typography className={classes.sidebarLabel}>REPORTS</Typography>
          </Link>
        </ListItem>
        <footer className={classes.version}>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "400",
              color: "#ffffff",
              letterSpacing: "0.15em",
            }}
          >
            Version
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#ffffff",
              letterSpacing: "0.15em",
            }}
          >
            1.0.0
          </Typography>
        </footer>
      </List>
    </div>
  );
};
export default Sidebar;
