import { Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const HeaderTitle = ({ classes }) => {
  const location = useLocation();
  if (
    location.pathname === "/dashboard" ||
    location.pathname === "/home"
  ) {
    return <Typography className={classes.title}>DASHBOARD</Typography>;
  }
  if (location.pathname === "/employee") {
    return <Typography className={classes.title}>EMPLOYEES</Typography>;
  }
  if (location.pathname === "/client") {
    return <Typography className={classes.title}>CLIENT</Typography>;
  }
  if (location.pathname === "/projects") {
    return <Typography className={classes.title}>PROJECTS</Typography>;
  }
  if (location.pathname === "/tasks") {
    return <Typography className={classes.title}>TASKS</Typography>;
  }
  if (location.pathname === "/reports") {
    return <Typography className={classes.title}>REPORTS</Typography>;
  }
};

export default HeaderTitle;
